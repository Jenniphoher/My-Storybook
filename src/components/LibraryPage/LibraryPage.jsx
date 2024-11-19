import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './LibraryPage.css'

function LibraryPage() {
    const categories = useSelector(store => store.libraryCategory)
    const gallery = useSelector(store => store.libraryGallery)

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({
            type: 'FETCH_LIBRARY'
        })
    }, [])

    const handleGalleryNextButton = () => {
        const lastPhotoIdNumber = gallery[gallery.length - 1].id;
        // console.log('This is the id of the last photo:', lastPhotoIdNumber);

        dispatch({
            type: 'FETCH_GALLERY_NEXT_PHOTOS',
            payload: lastPhotoIdNumber
        })
        
    }

    const handleGalleryBackButton = () => {
        const lastPhotoIdNumber = gallery[gallery.length - 1].id;
        // console.log('This is the id of the last photo:', lastPhotoIdNumber);

        dispatch({
            type: 'FETCH_GALLERY_BACK_PHOTOS',
            payload: lastPhotoIdNumber
        })
        
    }

    // console.log('This is categories:', categories);
    // console.log('This is gallery:', gallery);
    
    return (
        <div>
            <h1>Welcome to the Library!</h1>

            <div>
                <h2>Categories</h2>
                {!categories ? '' : categories.map((category) => {
                    return (
                    <div key={category.id}>
                        <p onClick={() => {
                            dispatch({
                                type: 'FETCH_CATEGORY_PHOTOS'
                            })}
                        }>{category.category}</p>
                    </div>
                    )
                })}
            </div>

            <div>
                <h2>Photos</h2>
                <div className='libraryGalleryPhotoDiv'>
                    {!gallery ? '' : gallery.map((photo) => {
                        return (
                        <div key={photo.id}>
                            <img className='libraryGalleryPhoto'
                                src={photo.image}
                                onClick={() => {
                                dispatch({
                                    type: 'CHOOSE_IMAGE'
                                })}}
                            />
                        </div>
                        ) 
                    })}
                </div>

                <button className='libraryGalleryBackBtn'
                    onClick={handleGalleryBackButton}>Back</button>
                <button className='libraryGalleryNextBtn'
                    onClick={handleGalleryNextButton}>Next</button>
            </div>

            

        </div>
    )

}

export default LibraryPage;

// {/* {Object.keys(library).length > 0 ? 
//     library.categories.map((category) => {
//     return (
//         <div key={category.id}>
//             <p onClick={() => {
//                 dispatch({
//                     type: 'FETCH_CATEGORY_PHOTOS'
//                 })}
//             }>{category.category}</p>
//         </div>
//     ) 
// }) : '' } */}

// {/* {Object.keys(library).length > 0 ? 
//     library.gallery.map((gallery) => {
//     return (
//         <div key={gallery.id}>
//             <img className='libraryGalleryPhoto'
//                 src={gallery.image}
//                 onClick={() => {
//                 dispatch({
//                     type: 'CHOOSE_IMAGE'
//                 })}}
//             />
//         </div>
//     ) 
// }) : '' } */}