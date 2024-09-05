const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET user gallery
router.get('/', (req, res) => {
    const sqlText = `
        SELECT * FROM "user_gallery";
    `
    pool.query(sqlText)
    .then((result) => {
        console.log('user gallery get');
        res.send(result.rows)
    }) .catch((err) => {
        console.log('server user gallery error', err);
        res.sendStatus(500)
    })
});


module.exports = router;
