import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { Stage, Layer, Image, Text } from 'react-konva'; 
import { Card } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import HomeIcon from '@mui/icons-material/Home';
import { Html } from 'react-konva-utils';
import useImage from "use-image";
import Nav from "../Nav/Nav";
import NavBar from "../NavBar/NavBar";
import './HomePage.css'


function ImageUrl({item}) {
    const [image] = useImage(item.img_url)

    useEffect(() => {
        // getPhoto()
    }, [])

    return (
        <Layer className="homeStageLayer">
            {/* <Html>
                <img className="homeStageImage"
                        src={item.img_url} 
                        width={Number(item.img_width)} height={Number(item.img_height)} 
                        x={Number(item.img_x)} y={Number(item.img_y)} />
            </Html> */}
            <Image className="homeStageImage"
                    image={image} 
                    width={Number(item.img_width)} height={Number(item.img_height)} 
                    x={Number(item.img_x)} y={Number(item.img_y)}/>
            <Text className="homeStageText"
                    x={300} y={700}
                    text={item.text} />
        </Layer>
    )

}

function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user);
    const storybook = useSelector(store => store.storybook)
    

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_STORIES' });
    }, [dispatch]);



    console.log('This is storybook:', storybook);

    return (
        <div className="homePage bg-black mb-20" >

            <div className="homeTitleDiv">
                <HomeIcon sx={{ fontSize: 70 }} />
                <span className="homePageTitle">Home Feed</span>
            </div>

            <div className="homeBody">
                {!storybook ? '' : storybook.map((item) => {

                    return (
                        <Card className="tw-flex tw-flex-col tw-p-2 tw-my-20"
                            sx={{ borderRadius: 3,
                                boxShadow: '2px 2px 5px rgba(3, 10, 26, 0.2), -2px 2px 5px rgba(3, 10, 26, 0.2), 2px -2px 5px rgba(3, 10, 26, 0.2), -2px -2px 5px rgba(3, 10, 26, 0.2)'
                            }}
                            // sx={{ backgroundColor: 'rgb(3, 10, 26)' }}
                            >
                            <span className="tw-flex tw-flex-row tw-m-5" >
                                <img className="tw-size-20 tw-rounded-full" 
                                    src={user.profile_photo}
                                    onClick={() => {

                                    }} />
                                <h4 className="tw-font-bold tw-pt-5 tw-pl-5 tw-text-2xl">{user.username}</h4>
                            </span>

                            
                            <Stage className="tw-flex tw-flex-items tw-items-center tw-my-5 tw-bg-[rgb(3,10,26)] tw-rounded-md"
                                key={item.id}
                                height={800}
                                width={800}
                                >
                                <ImageUrl className="tw-"
                                        item={item} 
                                />
                            </Stage>
                        </Card>
                    )
                })}
                
            </div>
            
            <NavBar />
        </div>
    )

}

export default HomePage;

    // const getPhoto = () => {
    //         storybook.map((item) => {
    //             setImgUrl(item.img_url)
    //         })
    // }