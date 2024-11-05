import NavBar from "../NavBar/NavBar";
import './StoryFullScreen.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from "react";
import { Stage, Layer, Image, Text } from 'react-konva'; 
import Swal from "sweetalert2";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useImage from "use-image";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';


function ImageUrl({item}) {
    const [image] = useImage(item.img_url)

    useEffect(() => {

    }, [])

    return (
        <Layer className="homeStageLayer">
            <Image className="homeStageImage"
                    image={image} 
                    width={Number(item.img_width)} height={Number(item.img_height)} 
                    x={Number(item.img_x)} y={Number(item.img_y)} />
            <Text className="homeStageText"
                    x={450} y={800}
                    fontSize={ 32 }
                    fontStyle="bold"
                    fontFamily="Montserrat Alternates"
                    stroke={'white'}
                    strokeWidth={1.5}
                    fill={'black'}
                    text={item.text} />
        </Layer>
    )

}


function StoryFullScreen() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const storybookId = params.id;
    const user = useSelector(store => store.user);
    const storybook = useSelector(store => store.storybook)
    const [marginLeft, setMarginLeft] = useState(0);
    const [img, setImg] = useState(0)
    const item = document.querySelector('.storyFullScreenList')
    let length = storybook.length - 1;
    let active = 0;

    useEffect(() => {
        dispatch({
            type: 'FETCH_STORY_FULLSCREEN',
            payload: {
                storybookId: storybookId, 
            }
        })
    }, [storybookId])

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
                        story_id: storybookId,
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

    const handleLeft = () => {
        const currentImg = img;
        if(currentImg > 0) {
            setImg(currentImg - 1)
            setLeft();
        }
    }

    const setLeft = () => {
        if(img > 0) {
            setMarginLeft(marginLeft + 1200);    
        }
    }

    const handleRight = () => {
        const currentImg = img;
        if(currentImg != length) {
            setImg(currentImg + 1)
            setRight();
        }
    }

    const setRight = () => {
        if(img != length) {
            setMarginLeft(marginLeft - 1200);    
        }
    }

    console.log('This is storybook:', storybook);
    console.log('This is marginLeft:', marginLeft);
    console.log('This is img:', img);

    return (
        <div className="storyFullScreen">
            <h2 className="userName">{user.first_name}'s Story</h2>

            <div className="storyFullScreenSlider">
                <div className="storyFullScreenList"
                    style={{marginLeft: `${marginLeft}px`}}>
                    {storybook.map((item) => {
                    return (
                        <span className="storyFullScreenSpan"
                                key={item.id}>
                            <Stage className="active"
                                key={item.id}
                                height={950} width={1200}
                                >
                            <ImageUrl item={item} />
                            </Stage>
                        </span>
                    )
                    })}
                </div>
            </div>

            <span className="slideButtons">
                <ArrowCircleLeftIcon className="leftBtn"
                    sx={{ fontSize: 60 }}
                    onClick={handleLeft} />
                <ArrowCircleRightIcon className="rightBtn"
                    sx={{ fontSize: 60 }}
                    onClick={handleRight} />
            </span>

            <span className="storyFullScreenButtons">
                <button className="storyFullScreenDelete"
                    onClick={handleDelete}>Delete</button>
                <button className="storyFullScreenClose"
                    onClick={() => {
                    history.push(`/profile_page/${user.id}`)
                }}>Close</button>
            </span>
            <NavBar />
        </div>
    )

}

export default StoryFullScreen;