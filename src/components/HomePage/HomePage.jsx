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


function Stories({item}) {

    return (
        <div>
            <div className="homeStageDiv">
                <img className="homeStageImage"
                    src={item.img_url} 
                    width={Number(item.img_width)} height={Number(item.img_height)} 
                    />
                <p className="homeStageText">{item.text}</p>
            </div>
        </div>
    )

}

function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user);
    const storybook = useSelector(store => store.storybook)
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() => {
        const fetchGallery = async () => {
            setIsLoading(true);
            try {
                await dispatch({ type: 'FETCH_ALL_STORIES' });
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
            }
        }
        fetchGallery()
    }, []);

    if(isLoading) {
        return (
            <div className="loading">

            </div>
        )
    }

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
                            >
                            <span className="tw-flex tw-flex-row tw-m-5" >
                                <img className="tw-size-20 tw-rounded-full" 
                                    src={item.profile_photo}
                                    onClick={() => {

                                    }} />
                                <h4 className="tw-font-bold tw-pt-5 tw-pl-5 tw-text-2xl">{item.username}</h4>
                            </span>
                            <Stories item={item} />
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


    // <Image className="homeStageImage"
    //                 image={image} 
    //                 width={Number(item.img_width) * 0.8} height={Number(item.img_height)* 0.8} 
    //                 y={100} />