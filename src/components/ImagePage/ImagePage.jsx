import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './ImagePage.css'
import { Card, TextField } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Divider from '@mui/material/Divider';
import NavBar from '../NavBar/NavBar'

function ImagePage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const gallery = useSelector(store => store.gallery);
    const user = useSelector(store => store.user);
    const { id, page } = useParams();
    const storybookId = id;
    const pageNum = page;
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('')
    const fileRef = useRef(null);

    useEffect(() => {
        dispatch({ type: 'FETCH_GALLERY', payload: user.id })
    }, [dispatch])

    const addPhoto = (e) => {
        e.preventDefault();
        dispatch({
            type: 'ADD_PHOTO',
            payload: {
                title: title,
                file: file,
                userId: user.id
            }
        })
        setFile(null);
        fileRef.current.value = null;
        setTitle('');
    }

    return (
        <div className='imagePage'>
            <div className='backgroundImg'></div>
            <div className='imagePageDiv'>
                <h1 className='imageTitle'>Photo Gallery</h1>

                <form className='formImageGallery'
                        onSubmit={addPhoto} >
                    <p className='formTitle'>Upload Photos</p>
                    <p className='formPara'>Upload photos into your gallery and use them to build your stories with!</p>
                    <input className='uploadInput'
                            id="upload"
                            type='file' 
                            ref={fileRef}
                            onChange={e => setFile(e.target.files[0])}
                            hidden />
                    <label htmlFor="upload" 
                            className='uploadArea'
                            >Upload Photo</label>
                    <CloudUploadIcon sx={{ fontSize: 70, 
                            color: 'rgb(82, 144, 236)',
                            marginTop: '-190px',
                            cursor: 'pointer' }} />
                    <TextField className='titleButton'
                            type='text'
                            placeholder='The most beautiful city'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            label="title" color="primary" focused
                            sx={{ marginTop: 12 }} />
                    <button className='uploadSubmitButton'>Submit</button>
                </form>
                
                
                <Divider className='pageBreak'
                        sx={{ marginTop: '10px',
                            fontSize: 30 }} 
                        >My Photos</Divider>

                <div className='imageGallery'>
                    {gallery && gallery.map((photo) => {
                        return (
                        <span className='galleryCropper' key={photo.id} >
                        <img className='photoImages'
                            src={photo.img_url} 
                            onClick={() => {
                                dispatch({
                                    type: 'ADD_CHOSEN_PHOTO',
                                    payload: {
                                        imgId: photo.id,
                                        storybookId: storybookId,
                                        pageNum: pageNum
                                    }
                                })
                                history.push(`/create_page/${storybookId}/${pageNum}`)
                            }}
                            />
                        </span>
            
                        )
                    })}
                </div>
            </div>

        </div>
    )

}



export default ImagePage;

{/* <h4 className='h4ImageGallery'>{photo.title}</h4> */}