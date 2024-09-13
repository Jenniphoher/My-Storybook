import NavBar from "../NavBar/NavBar";
import './StoryFullScreen.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from "react";
import { Stage, Layer, Image, Text } from 'react-konva'; 
import Swal from "sweetalert2";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function StoryFullScreen() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const postId = params.id;
    const user = useSelector(store => store.user);
    const post = useSelector(store => store.post)
    const [image, setImage] = useState('');
    const [imgUrl, setImgUrl] = useState('')

    useEffect(() => {
        dispatch({
            type: 'FETCH_STORY_FULLSCREEN',
            payload: {postId: postId, getPhoto}
        })
  
    }, [postId, imgUrl])

    const getPhoto = () => {
        try {
            !post ? '' :  post.map((item) => {
                setImgUrl(item.img_url)
                const img = new window.Image()
                img.src = item.img_url
                img.onload = () => {
                    setImage(img)
                }
                
            })
        } catch (error) {
            console.log('Error in getting image:', error);
        }
    }

    const handleDelete = async () => {
        try {
            const result = await Swal.fire({
                title: 'Delete',
                text: 'Are you sure you want to delete this story?',
                icon: 'warning',
                confirmButtonText: 'Yes',
                showCancelButton: true
            })
            if (result.isConfirmed) {
                dispatch({
                    type: 'DELETE_STORY',
                    payload: {
                        story_id: postId,
                        history: history,
                        user_id: user.id
                    }
                })

                Swal.fire("Deleted!", "", "success");
            }
        } catch (error) {
            console.log('Nothing deleted!', error);
        }

    }

    return (
        <div className="storyFullScreen">
            <h2>{user.first_name}'s Story</h2>

            <div className="storyFullScreenGallery">
                {post.map((item) => {
                    return (
                        <span className="storyFullScreenSpan"
                                key={item.id}>
                            <Stage className="homeStage"
                                key={item.id}
                                height={800}
                                width={800}
                                >
                                <Layer className="homeStageLayer">
                                    <Image className="homeStageImage"
                                            image={image} 
                                            width={Number(item.img_width)} height={Number(item.img_height)} 
                                            x={Number(item.x_position)} y={Number(item.y_position)} />
                                    <Text className="homeStageText"
                                            x={300} y={700}
                                            text={item.text} />
                                </Layer>
                            </Stage>
                            
                            <span className="storyFullScreenButtons">
                                <button className="storyFullScreenDelete"
                                    onClick={handleDelete}>Delete</button>
                                <button className="storyFullScreenClose"
                                    onClick={() => {
                                    history.push(`/profile_page/${user.id}`)
                                }}>Close</button>
                            </span>
                        </span>
                    )
                })}
            </div>

            <NavBar />
        </div>
    )

}

export default StoryFullScreen;