import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './ImagePage.css'
import NavBar from '../NavBar/NavBar'

function ImagePage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const gallery = useSelector(store => store.gallery);
    const user = useSelector(store => store.user);
    const params = useParams();
    const postId = params.id;
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('')

    useEffect(() => {
        dispatch({ type: 'FETCH_GALLERY' })
    }, [dispatch])

    const addPhoto = (e) => {
        e.preventDefault();
        dispatch({
            type: 'ADD_PHOTO',
            payload: {
                title: title,
                file: file
            }
        })

    }

    return (
        <div className='imagePage'>
            <h2>Gallery</h2>

            <form className='formImageGallery'
                    onSubmit={addPhoto} >
                <input type='file' 
                        // multiple
                        onChange={e => setFile(e.target.files[0])}
                        />
                <input type='text'
                        placeholder='a title for picture'
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                <button>Submit</button>
            </form>

            <div className='imageGallery'>
                {gallery && gallery.map((photo) => {
                    return (
                    <span className='img' key={photo.id} >
                        <img className='photoImageGallery'
                            src={photo.img_url} 
                            onClick={() => {
                                dispatch({
                                    type: 'ADD_CHOSEN_PHOTO',
                                    payload: {
                                        img_id: photo.id,
                                        post_id: postId
                                    }
                                })
                                history.push(`/create_page/${postId}`)
                            }}
                            />
                        <h4 className='h4ImageGallery'>{photo.title}</h4>
                    </span>
                    )
                })}
            </div>

            <NavBar />
        </div>
    )

}

export default ImagePage;