const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// ============= GET =============
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    const sqlText = `
        SELECT * FROM "user_gallery"
            WHERE "user_id" = $1;
    `
    pool.query(sqlText, [userId])
    .then((result) => {
        console.log('User gallery get');
        res.send(result.rows)
    }) .catch((err) => {
        console.log('Server user gallery error', err);
        res.sendStatus(500)
    })
});

router.get('/profile_picture/:id', (req, res) => {
    const userId = req.params.id;
    const sqlText = `
        SELECT "profile_photo" FROM "user"
            WHERE "id" = $1;
    `

    const sqlValues = [userId]
    pool.query(sqlText, sqlValues)
    .then((result) => {
        console.log('User profile updated!');
        res.send(result.rows);
    }) .catch((err) => {
        console.log('Error in updating user profile', err);
        res.sendStatus(500);
    })
})

router.get('/cover_photo/:id', (req, res) => {
    const userId = req.params.id;
    const sqlText = `
        SELECT "cover_photo" FROM "user"
            WHERE "id" = $1;
    `

    const sqlValues = [userId]
    pool.query(sqlText, sqlValues)
    .then((result) => {
        console.log('User profile updated!');
        res.send(result.rows);
    }) .catch((err) => {
        console.log('Error in updating user profile', err);
        res.sendStatus(500);
    })
})

router.get('/logo', (req,res) => {
    sqlText = `SELECT * FROM "logo";`
    pool.query(sqlText)
    .then((result) => {
        res.send(result.rows)
    }) .catch((err) => {
        console.log('Error in getting logo', err);
        res.sendStatus(500);
    })
})


// ============= PUT =============
router.put('/profile_picture/:id', (req, res) => {
    const userId = req.params.id;
    const imgUrl = req.body.img_url
    const sqlText = `
        UPDATE "user"
            SET "profile_photo" = $1
            WHERE "id" = $2;
    `

    const sqlValues = [imgUrl, userId]
    pool.query(sqlText, sqlValues)
    .then((result) => {
        console.log('User profile updated!');
        res.sendStatus(200);
    }) .catch((err) => {
        console.log('Error in updating user profile', err);
        res.sendStatus(500);
    })
})

router.put('/cover_photo/:id', (req, res) => {
    const userId = req.params.id;
    const imgUrl = req.body.img_url
    const sqlText = `
        UPDATE "user"
            SET "cover_photo" = $1
            WHERE "id" = $2;
    `

    const sqlValues = [imgUrl, userId]
    pool.query(sqlText, sqlValues)
    .then((result) => {
        console.log('User profile cover updated!');
        res.sendStatus(200);
    }) .catch((err) => {
        console.log('Error in updating user cover profile', err);
        res.sendStatus(500);
    })
})


module.exports = router;
