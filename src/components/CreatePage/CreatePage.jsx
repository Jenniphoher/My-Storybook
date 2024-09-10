import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Image, Text, Transformer, Rect, Group } from 'react-konva';
import { Html } from 'react-konva-utils';
import NavBar from '../NavBar/NavBar';
import './CreatePage.css'

function CreatePage() {
    const textTransformerRef = useRef(null);
    const imgTransformerRef = useRef(null);
    const groupRef = useRef(null);
    const imgRef = useRef(null);
    const post = useSelector(store => store.post)
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();
    const postId = params.id

    const [text, setText] = useState('');
    const [imgSelected, setImgSelected] = useState(false);
    const [textSelected, setTextSelected] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [image, setImage] = useState('');
    const [imgUrl, setImgUrl] = useState('')
    const [imgChange, setImgChange] = useState({x:200, y:150, width: 400, height: 480});
    // const [imgSize, setImgSize] = useState({width: 400, height: 480});
    const [textSize, setTextSize] = useState('');

    useEffect(() => {
        fetchCreatedPost()

        if (imgSelected && imgTransformerRef.current && imgRef.current) { 
            imgTransformerRef.current.nodes([imgRef.current]); 
            imgTransformerRef.current.getLayer().batchDraw(); 
        }
        if (textSelected && showInput && textTransformerRef.current && groupRef.current) { 
            textTransformerRef.current.nodes([groupRef.current]); 
            textTransformerRef.current.getLayer().batchDraw(); 
        }
    }, [postId, imgSelected, showInput]);

    const fetchCreatedPost = () => {
        dispatch({
            type: 'FETCH_CREATED_POST',
            payload: { post_id: postId, getPhoto: getPhoto }
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

    const handleDragEnd = (e) => {
        const currentPosition = {
            ...imgChange,
            x: e.target.x(),
            y: e.target.y(),
        }
        setImgChange(currentPosition)
        dispatch({
            type: 'UPDATE_IMAGE_POSITION',
            payload: currentPosition
        })
    }

    const handleTransform = (e) => {
        const node = imgRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        node.scaleX(1);
        node.scaleY(1);

        setImgChange({
            x: node.x(),
            y: node.y(),
            width: Math.max(node.width() * scaleX, 20),
            height: Math.max(node.height() * scaleY, 20)
        })
    }


    return (
        <div className="createPage">
            <h2>Create</h2>

            <Stage className="createStage"
                    height={800}
                    width={800}
                    onClick={(e) => { 
                        if (e.target === e.target.getStage()) { 
                            setImgSelected(false); 
                            setTextSelected(false)
                        }}}
                    >
                <Layer className="createStageLayer">
                    {post.map((item) => {
                        return (
                            <Image className="createStageImage"
                                    ref={imgRef}
                                    key={item.id}
                                    id='{item.id}'
                                    image={image} 
                                    width={imgChange.width} height={imgChange.height} 
                                    x={imgChange.x} y={imgChange.y}
                                    draggable
                                    // onDragStart={handleDragStart}
                                    onDragEnd={handleDragEnd}
                                    onClick={() => setImgSelected(true)} 
                                    onTransformEnd={handleTransform} />
                        )
                    })}
                    {imgSelected && (
                        <Transformer
                            ref={imgTransformerRef}
                            flipEnabled={false}
                            boundBoxFunc={(oldBox, newBox) => {
                                if (newBox.width < 20 || newBox.height < 20) {
                                    return oldBox;
                                }
                                return newBox;
                            }} /> 
                    )}

                </ Layer>
                <Layer>
                    {showInput && (
                        <Group id='textGroup'
                            x={300} y={700}
                            ref={groupRef}
                            onClick={() => setTextSelected(true)} 
                            >
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
                                        />
                            </Html>
                            
                        </Group>
                    )}

                    {textSelected && showInput && (
                        <Transformer
                            ref={transformerRef}
                            flipEnabled={false}
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
                        imgChange: imgChange,
                        text: text,
                        postId: postId
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

