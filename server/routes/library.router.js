const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// ============= GET =============
// -------- fetchLibrary
router.get('/', async (req, res) => {

    let connection;
    try {
        connection = await pool.connect()
        await connection.query('BEGIN;')
        
        const categorySqlText = `
            SELECT * FROM "library_category"
                ORDER BY "category";
        `
        const categoryResults = await connection.query(categorySqlText)
        const categories = categoryResults.rows;
        // console.log('These are the categories:', categories);
        
        const gallerySqlText = `
            SELECT * FROM "library_gallery"
                ORDER BY "id"
                LIMIT 10;
        `

        const galleryResults = await connection.query(gallerySqlText)
        const gallery = galleryResults.rows;
        // console.log('This is the gallery:', gallery);

        const library = {categories, gallery}

        await connection.query('Commit;')
        res.send(library);
        
    } catch(err) {
        console.log('GET library failed: ', err);
        await connection.query('Rollback;')
        res.sendStatus(500);
    } finally {
        await connection.release()
    }
})

// -------- fetchGalleryNextPhotos
router.get('/galleryNextPhotos/:id', (req, res) => {
    const photoId = req.params.id;
    // console.log('This is the last photo id in gallery:', photoId);

    // NEED TO WRITE AN IF STATEMENT FOR WHEN YOU HIT THE LAST ROUND
    // PHOTOS IN THE DATABASE

    const sqlText = `
        SELECT * FROM "library_gallery"
            WHERE "id" > $1
            LIMIT 10;
    `
    pool.query(sqlText, [photoId])
    .then((result) => {
        res.send(result.rows)
    }) .catch((error) => {
        console.log('Error GET next photos for gallery:', error);
        res.sendStatus(500);
        
    })
    
})

// -------- fetchCategories
router.get('/category', (req, res) => {
    const sqlText = `
        SELECT * FROM "library_category"
            ORDER BY "category";
    `
    pool.query(sqlText)
    .then((result) => {
        res.send(result.rows)
    }) .catch((error) => {
        console.log('Server library category error', error);
        res.sendStatus(500)
    })
})


// -------- fetchGallery
router.get('/gallery', (req, res) => {
    const sqlText = `
        SELECT * FROM "library_gallery"
            ORDER BY "id"
            LIMIT 10;
    `
    pool.query(sqlText)
    .then((result) => {
        res.send(result.rows)
    }) .catch((error) => {
        console.log('Server library gallery error', error);
        res.sendStatus(500)
    })
})




module.exports = router;