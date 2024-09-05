const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET post
router.get('/', (req, res) => {
    const sqlText = `
        SELECT "post".id, "post".text, "post".user_id,"user_gallery".title, "user_gallery".img_url, "post".user_gallery_id FROM "user"
            JOIN "post"
            ON "post".user_id = "user".id
            JOIN "user_gallery"
            ON "user_gallery".id = "post".user_gallery_id
            WHERE "user".id = $1;
        `
    pool.query(sqlText, [req.user.id])
    .then((result) => {
        console.log('get post');
        res.send(result.rows)
    }) .catch((err) => {
        console.log('server get post error', err);
        res.sendStatus(500)
    })
});

router.get('/:id', (req, res) => {
    const postId = req.params.id;
    // const imgId = req.body.img_id;
    const sqlText = `
        SELECT "post".id, "post".text, "post".user_id,"user_gallery".title, "user_gallery".img_url, "post".user_gallery_id FROM "post"
            JOIN "user_gallery"
            ON "user_gallery".id = "post".user_gallery_id
            WHERE "post".id = $1;
        `
    pool.query(sqlText, [postId])
    .then((result) => {
        console.log('get post with photo');
        res.send(result.rows)
    }) .catch((err) => {
        console.log('server get post with photo error', err);
        res.sendStatus(500)
    })
});

router.get('/profile/:id', (req, res) => {
    const sqlText = `
        SELECT "post".id, "post".text, "post".user_id,"user_gallery".title, "user_gallery".img_url, "post".user_gallery_id FROM "user"
            JOIN "post"
            ON "post".user_id = "user".id
            JOIN "user_gallery"
            ON "user_gallery".id = "post".user_gallery_id
            WHERE "user".id = $1;
        `
    pool.query(sqlText, [req.user.id])
    .then((result) => {
        console.log('get post');
        res.send(result.rows)
    }) .catch((err) => {
        console.log('server get post error', err);
        res.sendStatus(500)
    })
});

router.get('/fullscreen/:id', (req, res) => {
    const storyId = req.params.id;
    const sqlText = `
        SELECT "post".id, "post".text, "post".user_id,"user_gallery".title, "user_gallery".img_url, "post".user_gallery_id FROM "post"
            JOIN "user_gallery"
            ON "user_gallery".id = "post".user_gallery_id
            WHERE "post".id = $1;
        `
    pool.query(sqlText, [storyId])
    .then((result) => {
        console.log('get fullscreen');
        res.send(result.rows)
    }) .catch((err) => {
        console.log('server get fullscreen error', err);
        res.sendStatus(500)
    })
});



router.post('/', async (req, res) => {
    // console.log('post create req.body:', req.body);
    const id = req.user.id

    try {
        const sqlText = `
            INSERT INTO "post"
                ("user_id")
                VALUES
                ($1)
                RETURNING "id";
        `

        const results = await pool.query(sqlText, [id])
        console.log('A post has been created!');
        
        const postId = results.rows[0].id

        res.send({id: postId})

    } catch (err)  {
        console.log('server create post error', err);
        res.sendStatus(500)
    }
})



router.put('/photo/:id', (req, res) => {
    const postId = req.params.id
    const imgId = req.body.img_id
    const sqlText = `
        UPDATE "post"
            SET "user_gallery_id" = $1
            WHERE "id" = $2;
    `

    const sqlValues = [imgId, postId]
    pool.query(sqlText, sqlValues)
    .then((result) => {
        console.log('photo updated in db');
        res.sendStatus(200)
    }) .catch((err) => {
        console.log('server error updating with photo in db', err);
        res.sendStatus(500)
    })
})



router.delete('/story/:id', (req, res) => {
    const storyId = req.params.id

    const sqlText = `
        DELETE FROM "post"
            WHERE "id" = $1;
    `
    pool.query(sqlText, [storyId])
    .then((result) => {
        console.log('story deleted in db');
        res.sendStatus(200)
    }) .catch((err) => {
        console.log('server error deleting photo', err);
        res.sendStatus(500)
    })
})

router.delete('/:id', (req, res) => {
    const storyId = req.params.id

    const sqlText = `
        DELETE FROM "post"
            WHERE "id" = $1;
    `
    pool.query(sqlText, [storyId])
    .then((result) => {
        console.log('story deleted in db');
        res.sendStatus(200)
    }) .catch((err) => {
        console.log('server error deleting photo', err);
        res.sendStatus(500)
    })
})


module.exports = router;