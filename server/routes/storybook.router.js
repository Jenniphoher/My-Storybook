const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// ============= POST =============  %%%%%%%%%%%%%%%%%%%
// ----- createStorybook  %%%%%%%%%%%%%%%%%%%
router.post('/', async (req, res) => {
    const userId = req.user.id

    try {
        const sqlText = `
            WITH "ins" AS (
                INSERT INTO "storybook"
                    ("user_id")
                    VALUES
                    ($1)
                    RETURNING "id")
                INSERT INTO "sb_pages"
                    ("storybook_id", "page_number")
                    SELECT "id", 1 FROM "ins"
                    RETURNING "storybook_id", "id", "page_number";
        `

        const results = await pool.query(sqlText, [userId])
        console.log('A storybook has been created!');
        
        const pageId = results.rows[0].id;
        const storybookId = results.rows[0].storybook_id;
        const pageNum = results.rows[0].page_number;

        res.send({storybookId: storybookId, pageNum: pageNum, pageId: pageId})

    } catch (err)  {
        console.log('Server create storybook error', err);
        res.sendStatus(500)
    }
})



// ============= GET =============
// ----- fetchAllStories
router.get('/', (req, res) => {
    const sqlText = `
        SELECT "storybook".user_id, "storybook".id,
                "user".username, "user".profile_photo,
                "sb_pages".img_x, "sb_pages".img_y, "sb_pages".img_width, "sb_pages".img_height,
                "sb_pages".id AS sb_pages_id, "sb_pages".text, "sb_pages".user_gallery_id,
                "sb_pages".page_number,
                "user_gallery".title, "user_gallery".img_url
            FROM "storybook"
            JOIN "user"
                ON "storybook".user_id = "user".id
            JOIN "sb_pages"
                ON "sb_pages".storybook_id = "storybook".id
            JOIN "user_gallery"
                ON "user_gallery".id = "sb_pages".user_gallery_id
                ORDER BY "storybook".id DESC;
        `
    pool.query(sqlText)
    .then((result) => {
        console.log('Get all storybooks');
        // const finalData = sortStories(result.rows)
        // res.send(finalData)
        res.send(result.rows)
    }) .catch((err) => {
        console.log('Server get storybooks error', err);
        res.sendStatus(500)
    })
});

// ----- fetchCreatedStorybook  %%%%%%%%%%%%%%%%%%%
router.get('/:id', (req, res) => {
    const storybookId = req.params.id;
    const sqlText = `
        SELECT "sb_pages".img_x, "sb_pages".img_y, "sb_pages".img_width, "sb_pages".img_height,
                "sb_pages".id, "sb_pages".text, "sb_pages".storybook_id, "sb_pages".user_gallery_id,
                "storybook".user_id, 
                "user_gallery".title, "user_gallery".img_url
            FROM "storybook"
            JOIN "sb_pages"
                ON "sb_pages".storybook_id = "storybook".id
            JOIN "user_gallery"
                ON "user_gallery".id = "sb_pages".user_gallery_id
                WHERE "storybook".id = $1;
        `
    pool.query(sqlText, [storybookId])
    .then((result) => {
        console.log('get storybook with photo');
        res.send(result.rows)
    }) .catch((err) => {
        console.log('server get storybook with photo error', err);
        res.sendStatus(500)
    })
});

// ----- fetchProfileStories
router.get('/profile/:id', (req, res) => {
    const sqlText = `
        SELECT "sb_pages".id, "sb_pages".storybook_id,"sb_pages".page_number, "user_gallery".img_url 
            FROM "user"
            JOIN "storybook"
                ON "storybook".user_id = "user".id
            JOIN "sb_pages"
                ON "sb_pages".storybook_id = "storybook".id
            JOIN "user_gallery"
                ON "user_gallery".id = "sb_pages".user_gallery_id
                WHERE "user".id = $1;
        `
    pool.query(sqlText, [req.user.id])
    .then((result) => {
        console.log('Get user storybooks');
        res.send(result.rows)
    }) .catch((err) => {
        console.log('Error getting user storybooks', err);
        res.sendStatus(500)
    })
});

// ----- fetchStoryFullscreen
router.get('/fullscreen/:id', (req, res) => {
    const storybookId = req.params.id;
    const sqlText = `
        SELECT "sb_pages".img_x, "sb_pages".img_y, "sb_pages".img_width, "sb_pages".img_height,
            "sb_pages".page_number, "sb_pages".text, 
            "sb_pages".storybook_id, "sb_pages".user_gallery_id,
            "user_gallery".title, "user_gallery".img_url
            FROM "storybook"
                JOIN "sb_pages"
                    ON "sb_pages".storybook_id = "storybook".id
                JOIN "user_gallery"
                    ON "user_gallery".id = "sb_pages".user_gallery_id
                    WHERE "storybook".id = $1
                    ORDER BY "sb_pages".page_number;
        `
    pool.query(sqlText, [storybookId])
    .then((result) => {
        console.log('Get storybook fullscreen');
        res.send(result.rows)
    }) .catch((err) => {
        console.log('Server get fullscreen error', err);
        res.sendStatus(500)
    })
});



// ============= DELETE =============  %%%%%%%%%%%%%%%%%%%
// ----- deleteStory && deleteCreatedStorybook  %%%%%%%%%%%%%%%%%%%
router.delete('/:id', async (req, res) => {
    const storybookId = req.params.id;
    let connection;

    try {
        const connection = await pool.connect()
        await connection.query('BEGIN;')

        const pagesText = `
            DELETE FROM "sb_pages"
                WHERE "storybook_id" = $1;
        `
        const sqlValue = [storybookId]
        await connection.query(pagesText, sqlValue)

        const storybookText = `
            DELETE FROM "storybook"
                WHERE "id" = $1;
        `
        await connection.query(storybookText, sqlValue)

        await connection.query('COMMIT;')
        await connection.release();
        console.log('Storybook deleted!');
        res.sendStatus(200);
    } catch (error) {
        console.log('Delete storybook failed:', error)
        await connection.query('ROLLBACK;')
        await connection.release()

        res.sendStatus(500);
    }
})



// ============= PUT =============  %%%%%%%%%%%%%%%%%%%
// ----- addChosenPhoto  %%%%%%%%%%%%%%%%%%%
router.put('/photo/:id', (req, res) => {
    const pageNum = req.params.id
    const imgId = req.body.imgId
    const storybookId = req.body.storybookId;
    const sqlText = `
        UPDATE "sb_pages"
            SET "user_gallery_id" = $1
            WHERE "page_number" = $2 AND "storybook_id" = $3;
    `

    const sqlValues = [imgId, pageNum, storybookId]
    pool.query(sqlText, sqlValues)
    .then((result) => {
        console.log('Photo updated in db');
        res.sendStatus(200)
    }) .catch((err) => {
        console.log('Error updating with photo in db', err);
        res.sendStatus(500)
    })
})

// ----- updatePage  %%%%%%%%%%%%%%%%%%%
router.put('/img_text/:id', (req, res) => {
    const storybookId = req.params.id;
    const img = req.body.imgChange
    const sqlText = `
        UPDATE "sb_pages"
        SET "img_x" = $1, 
            "img_y" = $2, 
            "img_width" = $3, 
            "img_height" = $4, 
            "text" = $5
        WHERE "page_number" = $6 AND "storybook_id" = $7;
    `
    const sqlValues = [
        img.x,
        img.y,
        img.width,
        img.height,
        req.body.text,
        req.body.pageNum,
        storybookId
    ]

    pool.query(sqlText, sqlValues)
    .then((result) => {
        console.log('Img and text updated in db!');
        res.sendStatus(200);
    }) .catch((err) => {
        console.log('Server err in img and text update', err);
        res.sendStatus(500);
    })
})

// function sortStories(array) {
//     let obj = {}
    
//     for(let story of array) {
//         let storyId = story.id
//         let storyIds = []
//         if(storyIds.includes(storyId)) {
//             obj.storyId.push(story)
//         } else {
//             storyIds.push(storyId)
//             obj.storyId = [story];
//         }
//     }

//     return obj;
// }


module.exports = router;