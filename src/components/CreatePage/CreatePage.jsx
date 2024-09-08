import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Image, Text, Transformer, Rect, Group } from 'react-konva';
import { Html } from 'react-konva-utils';
import NavBar from '../NavBar/NavBar';
import './CreatePage.css'

function CreatePage() {
    const transformerRef = useRef(null);
    const groupRef = useRef(null);
    const post = useSelector(store => store.post)
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();
    const postId = params.id
    const [text, setText] = useState('');
    const [isSelected, setIsSelected] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [image, setImage] = useState('');
    const [imgUrl, setImgUrl] = useState('')
    const [imgPosition, setImgPosition] = useState('');
    const [textPosition, setTextPosition] = useState('');

    useEffect(() => {
        fetchCreatedPost()
        getPhoto()
        if (isSelected && showInput && transformerRef.current && groupRef.current) { 
            transformerRef.current.nodes([groupRef.current]); 
            transformerRef.current.getLayer().batchDraw(); 
        }
    }, [isSelected, showInput]);

    const fetchCreatedPost = () => {
        dispatch({
            type: 'FETCH_CREATED_POST',
            payload: postId
        })
    }

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

    const handleDragStart = (e) => {
        const id = e.target.id();
        setIsSelected( id === 'textGroup')
    }

    const handleDragEnd = (e) => {
        const currentPosition = {
            x: e.target.x(),
            y: e.target.y(),
            id: e.target.id()
        }

        if (e.target.id() === 'textGroup') {
            setTextPosition(currentPosition);
            dispatch({
                type: 'UPDATE_TEXT_POSITION',
                payload: currentPosition
            })
        } else {
            setImgPosition(currentPosition)
            dispatch({
                type: 'UPDATE_IMAGE_POSITION',
                payload: currentPosition
            })
        }
    }


    return (
        <div className="createPage">
            <h2>Create</h2>

            <Stage className="createStage"
                    height={800}
                    width={1000}
                    onClick={(e) => { 
                        if (e.target === e.target.getStage()) { 
                            setIsSelected(false); 
                        }}}
                    >
                <Layer className="createStageLayer">
                    {!post ? '' : post.map((item) => {
                        return (
                            <Image className="createStageImage"
                                    key={item.id}
                                    id='{item.id}'
                                    image={image} 
                                    width={400} height={480} 
                                    x={imgPosition.x} y={imgPosition.y}
                                    draggable
                                    onDragStart={handleDragStart}
                                    onDragEnd={handleDragEnd} />
                        )
                    })}
                {/* </Layer>
                <Layer> */}
                    {showInput && (
                        <Group id='textGroup'
                            x={textPosition.x} y={textPosition.y}
                            ref={groupRef}
                            onClick={() => setIsSelected(true)} 
                            draggable
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd} >
                            <Html >
                                <input className="createStageText"
                                        type='text'
                                        placeholder='Write your story here...'
                                        value={text}
                                        onChange={e => setText(e.target.value)}
                                        style={{
                                            width: '200px',
                                            height: '30px',
                                            fontSize: '16px',
                                            padding: '5px',
                                            border: '1px solid black',
                                            borderRadius: '5px',
                                        }}
                                        // draggable
                                        // onDragStart={handleDragStart}
                                        />
                            </Html>
                            
                        </Group>
                    )}

                    {isSelected && showInput && (
                        <Transformer
                            ref={transformerRef}
                            // enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
                            boundBoxFunc={(oldBox, newBox) => {
                                if (newBox.width < 20 || newBox.height < 20) {
                                    return oldBox;
                                }
                                return newBox;
                            }} /> 
                    )}
                </Layer>
            </Stage>

            <button onClick={() => {
                history.push(`/image_page/${postId}`)
            }}>Add Image</button>

            <button onClick={() => setShowInput(true)}>Add Text</button>

            <button onClick={() => {
                dispatch({
                    type: 'UPDATE_POST_POSITION_SIZE_TEXT',
                    payload: {
                        imgPosition: imgPosition,
                        textPosition: textPosition,
                        text: text
                    }
                })
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

{/* <Rect
                                width={textPosition.width}
                                height={textPosition.height}
                                fill="white"
                                stroke="black"
                                strokeWidth={1}
                            /> */}