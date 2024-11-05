import { useHistory, useParams, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Image, Text, Transformer, Rect, Group } from 'react-konva';
import { Html } from 'react-konva-utils';
import useImage from 'use-image';
import './CreatePage.css'

function ImageUrl({item, handleDragEnd, handleTransform, imgChange, imgRef, handleImgSelect, imgSelected}) {
    const imgTransformerRef = useRef(null);
    const [image, imageStatus] = useImage(item.img_url);
    


    useEffect(() => {
        if (imgSelected && imgTransformerRef.current && imgRef.current) { 
            imgTransformerRef.current.nodes([imgRef.current]); 
            imgTransformerRef.current.getLayer().batchDraw(); 
        }
    }, [imgSelected])


    return (

        <Layer className="createStageLayer">
            <Image className="createStageImage"
                ref={imgRef}
                image={image} 
                width={imgChange.width} height={imgChange.height} 
                x={imgChange.x} y={imgChange.y}
                draggable
                onDragEnd={handleDragEnd}
                onClick={handleImgSelect} 
                onTransformEnd={handleTransform} />
            
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

    )

}

function CreatePage() {
    // const textTransformerRef = useRef(null);
    const groupRef = useRef(null);
    const imgRef = useRef(null);
    const imgSelectedRef = useRef(false)
    const storybook = useSelector(store => store.storybook)
    const pages = useSelector(store => store.pages);
    const pageNumStore = useSelector(store => store.pageNum);
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const { id, page } = useParams();
    const storybookId = id;
    const pageNum = page;

    
    // const [textSelected, setTextSelected] = useState(false);
    const [imgSelected, setImgSelected] = useState(false);
    const [imgUrl, setImgUrl] = useState(null)
    const [text, setText] = useState('');
    const [imgChange, setImgChange] = useState({x:200, y:150, width: 800, height: 980});
    // const [textSize, setTextSize] = useState('');

    useEffect(() => {
        dispatch({
                type: 'FETCH_PAGE',
                payload: { 
                    storybookId: storybookId, 
                    pageNum: pageNum
                }
            })
    }, [storybookId, pageNum, dispatch]);

    console.log('This is pageNum:', pageNum);
    console.log('This is pages:', pages);


    const handleAddPage = (e) => {

        dispatch({
            type: 'CREATE_NEW_PAGE',
            payload: { storybookId: storybookId, 
                        pageNum: pageNum, 
                        imgChange: imgChange,
                        text: text,
                        history: history }
        })

        return (
            <div>
            {!pages ? '' : 
                (<ImageUrl 
                    text={text}
                    handleText={handleText}
                    groupRef={groupRef}
                    imgUrl={imgUrl}
                    handleDragEnd={handleDragEnd}
                    handleTransform={handleTransform}
                    imgChange={imgChange}
                    imgRef={imgRef}
                    getPhoto={getPhoto} />
            )}
            </div>
        )
    }

    const handleDragEnd = (e) => {
        const currentPosition = {
            ...imgChange,
            x: e.target.x(),
            y: e.target.y(),
        }
        setImgChange(currentPosition)
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

    const handleText = (e) => {
        setText(e.target.value)
    }

    const handleImgSelect = () => {
        setImgSelected(true)
    }


    return (
        <div className="createPage">
            <h2 className="pageNumber">Page {pageNum}</h2>

            <Stage className="createStage"
                height={950} width={1200}
                onClick={(e) => { 
                    if (e.target === e.target.getStage()) { 
                        setImgSelected(false)
                    }}}
            >

                    {pages.map((item) => {
                        return (
                        <ImageUrl item={item}
                            text={text}
                            handleText={handleText}
                            handleDragEnd={handleDragEnd}
                            handleTransform={handleTransform}
                            imgChange={imgChange}
                            imgSelected={imgSelected}
                            handleImgSelect={handleImgSelect}
                            imgRef={imgRef} />
                        )
                    })}

                <Layer>
                    <Group id='textGroup'
                        x={250} y={800}

                        // onClick={() => setTextSelected(true)} 
                        >
                        <Html >
                            <input className="createStageText"
                                    type='text'
                                    placeholder='Write your story here...'
                                    value={text}
                                    onChange={handleText}
                                    style={{
                                        width: '700px',
                                        height: '60px',
                                        fontSize: '28px',
                                        padding: '5px',
                                        border: '1px solid black',
                                        borderRadius: '5px',
                                    }}
                                    />
                        </Html>
                    </Group>
                </Layer>
            </Stage>


            {handleAddPage}

            <div className="buttonDiv">
                <button className="addImgButton"
                    onClick={() => {
                        history.push(`/image_page/${storybookId}/${pageNum}`)
                    }}>+ Add Image</button>

                <button className="addPageButton"
                    onClick={handleAddPage}>+ Add Page</button>

                <button className="publish"
                    onClick={() => {
                        dispatch({
                            type: 'UPDATE_PAGE',
                            payload: {
                                imgChange: imgChange,
                                text: text,
                                storybookId: storybookId,
                                pageNum: pageNum
                            }
                        })
                        history.push('/home_page')
                    }}>Publish</button>

                <button className="cancel"
                    onClick={() => {
                        dispatch({
                            type: 'DELETE_CREATED_STORYBOOK',
                            payload: {
                                storybookId: storybookId,
                                history: history,
                            }
                        })
                    }}>Cancel</button>
            </div>
        </div>
    )

}

export default CreatePage;













    // const fetchCreatedStorybook = () => {
    //     dispatch({
    //         type: 'FETCH_CREATED_STORYBOOK',
    //         payload: { 
    //             storybookId: storybookId, 
    //             fetchPage, 
    //             getPhoto }
    //     })
    // }

    // {textSelected && (
    //     <Transformer
    //         ref={textTransformerReftransformerRef}
    //         flipEnabled={false}
    //         boundBoxFunc={(oldBox, newBox) => {
    //             if (newBox.width < 20 || newBox.height < 20) {
    //                 return oldBox;
    //             }
    //             return newBox;
    //         }} /> 
    // )}

        // const handleAddPage = (e) => {
    //     setPageCount(pageCount + 1)
    //     dispatch({
    //         type: 'CREATE_NEW_PAGE',
    //         payload: { storybookId: storybookId, pageNum: pageCount }
    //     })
        
    //     return (
    //         <>
    //             <h2>Page {setPageCount(pageCount)}</h2>
    //             <Stage className="createStage"
    //             height={800} width={800}
    //             onClick={(e) => { 
    //                 if (e.target === e.target.getStage()) { 
    //                     setImgSelected(false); 
    //                     setTextSelected(false)
    //                 }}}
    //             >
    //         <Layer className="createStageLayer">
    //             {storybook.map((item) => {
    //                 return (
    //                     <Image className="createStageImage"
    //                             ref={imgRef}
    //                             key={item.id}
    //                             id='{item.id}'
    //                             image={image} 
    //                             width={imgChange.width} height={imgChange.height} 
    //                             x={imgChange.x} y={imgChange.y}
    //                             draggable
    //                             // onDragStart={handleDragStart}
    //                             onDragEnd={handleDragEnd}
    //                             onClick={() => setImgSelected(true)} 
    //                             onTransformEnd={handleTransform} />
    //                 )
    //             })}
    //             {imgSelected && (
    //                 <Transformer
    //                     ref={imgTransformerRef}
    //                     flipEnabled={false}
    //                     boundBoxFunc={(oldBox, newBox) => {
    //                         if (newBox.width < 20 || newBox.height < 20) {
    //                             return oldBox;
    //                         }
    //                         return newBox;
    //                     }} /> 
    //             )}
    //         </ Layer>
    //         <Layer>
    //             <Group id='textGroup'
    //                 x={300} y={700}
    //                 ref={groupRef}
    //                 onClick={() => setTextSelected(true)} 
    //                 >
    //                 <Html >
    //                     <input className="createStageText"
    //                             type='text'
    //                             placeholder='Write your story here...'
    //                             value={text}
    //                             onChange={e => setText(e.target.value)}
    //                             style={{
    //                                 width: '200px',
    //                                 height: '30px',
    //                                 fontSize: '16px',
    //                                 padding: '5px',
    //                                 border: '1px solid black',
    //                                 borderRadius: '5px',
    //                             }}
    //                             />
    //                 </Html>
    //             </Group>
    //             {textSelected && (
    //                 <Transformer
    //                     ref={textTransformerReftransformerRef}
    //                     flipEnabled={false}
    //                     boundBoxFunc={(oldBox, newBox) => {
    //                         if (newBox.width < 20 || newBox.height < 20) {
    //                             return oldBox;
    //                         }
    //                         return newBox;
    //                     }} /> 
    //             )}
    //         </Layer>
    //             </Stage>
    //         </>
    //     )
    // }
