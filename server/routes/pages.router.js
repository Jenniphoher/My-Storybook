const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// ============= POST =============
router.post('/:id', async (req, res) => {
    const pageNum = req.params.id;
    const storybookId = req.body.storybookId;

    try {
        const sqlText = `
            INSERT INTO "sb_pages"
                ("page_number", "storybook_id")
                VALUES
                ($1, $2)
                RETURNING "page_number", "storybook_id";
        `

        const results = await pool.query(sqlText, [pageNum, storybookId])
        console.log('A page has been created!');
        
        const storybook_id = results.rows[0].storybook_id
        const newPage = results.rows[0].page_number

        res.send({newPage: newPage, storybook_id: storybook_id})

    } catch (err)  {
        console.log('Server create page error', err);
        res.sendStatus(500)
    }
})



// ============= PUT =============
router.put('/on_new_page/:id', async (req, res) => {
    const storybookId = req.params.id;
    const img = req.body.imgChange
    try {
        const sqlText = `
            UPDATE "sb_pages"
            SET "img_x" = $1, 
                "img_y" = $2, 
                "img_width" = $3, 
                "img_height" = $4, 
                "text" = $5
            WHERE "page_number" = $6 AND "storybook_id" = $7
            RETURNING "page_number", "storybook_id";
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
        const results = await pool.query(sqlText, sqlValues)
        console.log('Current page has been updated!');
        
        const storybook_id = results.rows[0].storybook_id
        const newPage = results.rows[0].page_number + 1

        res.send({newPage: newPage, storybook_id: storybook_id})

    } catch (err)  {
        console.log('Server update current page error', err);
        res.sendStatus(500)
    }
})



// ============= GET =============
router.get('/page', (req, res) => {
    const pageNum = req.query.params1;
    const storybookId = req.query.params2;
    // console.log('storybookId:', storybookId);
    // console.log('pageNum:', pageNum);

    const sqlText = `
        SELECT "sb_pages".img_x, "sb_pages".img_y, "sb_pages".img_width, "sb_pages".img_height,
                "sb_pages".id, "sb_pages".text, "sb_pages".storybook_id, "sb_pages".user_gallery_id, 
                "user_gallery".title, "user_gallery".img_url 
            FROM "sb_pages"
            JOIN "user_gallery"
                ON "user_gallery".id = "sb_pages".user_gallery_id
                WHERE "page_number" = $1 AND "storybook_id" = $2;
    `
    pool.query(sqlText, [pageNum, storybookId])
    .then((results) => {
        console.log('Fetched page!');
        res.send(results.rows)
    }) .catch((err) => {
        console.log('Error fetching page:', err);
        res.sendStatus(500)
    })
})


module.exports = router;