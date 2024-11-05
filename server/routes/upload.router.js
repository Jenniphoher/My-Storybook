const { CloudinaryStorage } = require('multer-storage-cloudinary');
const express = require('express');
const multer = require('multer');
const cloudinary = require('../modules/cloudinary');
const router = express.Router();
const pool = require('../modules/pool');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'user_gallery'
    }
})

// const library_gallery = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'msb_library_gallery',
//     }
// })

const upload = multer({ storage: storage });
console.log('This is upload:', upload);
// const uploadLibraryGallery = multer({ storage: library_gallery });


router.post('/', upload.single('file'), async (req, res) => {
        console.log('This is req.body:', req.body.title);
        console.log('This is req.file:', req.file);
    try {
        const sqlText = `
            INSERT INTO "user_gallery"
            ("title", "img_url", "user_id")
            VALUES
            ($1, $2, $3);
        `

        const sqlValues = [req.body.title, req.file.path, req.user.id]
        pool.query(sqlText, sqlValues)
        .then((result) => {
            console.log('SERVER posted data');
            res.sendStatus(201);
        }) .catch((err) => {
            console.log('SERVER error in POST img:', err);
            res.sendStatus(500);
        })

    } catch (error) {
        console.log('SERVER upload error:', error);
    }
})

// router.post('/library', uploadLibraryGallery.single('file'), async (req, res) => {

//     try {
//         // console.log('This is req.file:', req.file);
//         // console.log('This is req.body.category_id:', req.body.category);
//         const sqlText = `
//             INSERT INTO "library_gallery"
//             ("image", "category_id")
//             VALUES
//             ($1, $2);`

//         const sqlValues = [req.file.path, req.body.category]
//         pool.query(sqlText, sqlValues)
//         .then((result) => {
//             console.log('SERVER posted data');
//             res.sendStatus(201);
//         }) .catch((err) => {
//             console.log('SERVER error in POST lib:', err);
//             res.sendStatus(500);
//         })

//     } catch (error) {
//         console.log('SERVER upload error:', error);
//     }
// })

module.exports = router;

// await Promise.all(pizzas.map(pizza => {
//     const insertLineItemText = `INSERT INTO "line_item" ("order_id", "pizza_id", "quantity") VALUES ($1, $2, $3)`;
//     const insertLineItemValues = [orderId, pizza.id, pizza.quantity];
//     return client.query(insertLineItemText, insertLineItemValues);
// }));