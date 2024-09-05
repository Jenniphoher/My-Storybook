import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Stage, Layer, Image, Text } from 'react-konva';
import NavBar from '../NavBar/NavBar';
import './CreatePage.css'

function CreatePage() {
    const post = useSelector(store => store.post)
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();
    const postId = params.id

    useEffect(() => {
        dispatch({
            type: 'FETCH_CREATED_POST',
            payload: postId
        })
    }, [postId])

    // console.log('post is:', post);

    return (
        <div className="createPage">
            <h2>Create</h2>

            {/* <Stage height={800}
                    width={1000}
                    >
                <Layer>
                    <Text text='Your Blank Page.' />
                    {userGallery && userGallery.map((photo) => {
                        return (
                            <Image key={photo.id}
                                    id='{photo.id}'
                                    image={image} 
                                    width={400}
                                    height={480} 
                                    x={50}
                                    y={50}
                                    draggable
                                    onDragStart={handleDragStart}
                                    onDragEnd={(e) => setPosition({
                                        isDragging: false,
                                        x: e.target.x(),
                                        y: e.target.y(),
                                        id: photo.id
                            })} />
                        )
                    })}
                    <Html>
                    
                    </Html>
                </Layer>
            </Stage> */}

            <div>
                {!post ? '' : post.map((item) => {
                    return (
                        <span key={item.id} >
                            <img src={item.img_url} />
                        </span>
                    )
                })}
            </div>

            <button onClick={() => {
                history.push(`/image_page/${postId}`)
            }}>Add Image</button>

            <button>Add Text</button>
            <button onClick={() => {
                history.push('/home_page')
            }}>Publish</button>
            <button onClick={() => {
                dispatch({
                    type: 'DELETE_CREATED_POST',
                    payload: {
                        post_id: postId,
                        history: history,
                    }
                })
            }}>Cancel</button>
        </div>
    )

}

export default CreatePage;