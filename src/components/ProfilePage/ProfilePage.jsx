import NavBar from "../NavBar/NavBar";
import './ProfilePage.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Divider from '@mui/material/Divider';

function ProfilePage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();
    const userId = params.id;
    const storybook = useSelector(store => store.storybook)
    const user = useSelector(store => store.user)
    const profilePicture = useSelector(store => store.profilePicture)
    const profileCover = useSelector(store => store.profileCover)

    console.log('params:', params);
    console.log('useParams:', useParams());

    useEffect(() => {
        dispatch({
            type: 'FETCH_PROFILE_STORIES',
            payload: userId
        })
        fetchProfilePicture()
        fetchProfileCover()
    }, [])

    const fetchProfilePicture = () => {
        dispatch({
            type: 'FETCH_PROFILE_PICTURE',
            payload: userId
        })
    }

    const fetchProfileCover = () => {
        dispatch({
            type: 'FETCH_PROFILE_COVER',
            payload: userId
        })
    }

    console.log('storybooks:', storybook);
    console.log('cover', profileCover);

    return (
        <div className="profilePage">

        <div className="profileCoverDiv">
            {!profileCover ? '' : profileCover.map(photo => {
                    return (
                        <div className="imgCoverCropper">
                            <img className="profileCover"
                                src={photo.cover_photo} />
                        </div>
                    )
                })
            }
        </div>

            <div className="profileInfo">
                {!profilePicture ? '' : profilePicture.map(photo => {
                        return (
                            <div className="imgCropper">
                                <img className="profilePicture"
                                    src={photo.profile_photo} />
                            </div>
                        )
                    })
                }
            
                <div className="profileName">
                    <h2 className="name username">@{user.username}</h2>
                    <h2 className="name first">{user.first_name}</h2>
                    <h2 className="name last">{user.last_name}</h2>
                </div>

            

                <button className="profilePhotoButton"
                    onClick={() => {
                        history.push(`/profile_photo/${userId}`)
                    }}>Change Profile Picture</button>

                <button className="profileCoverButton"
                    onClick={() => {
                        history.push(`/profile_cover/${userId}`)
                    }}>Change Cover</button>

            </div>

            <Divider sx={{ marginTop: '200px',
                    color: 'black',
                    fontSize: 30 }} 
                    >My Stories</Divider>

            <div className="profileStoryGallery">
                {!storybook ? null : storybook.map((item) => {
                    return (
                        <Card className="storiesCropper"
                                key={item.id}>
                            <img className="profileImages"
                                src={item.img_url}
                                onClick={() => {
                                    history.push(`/story_fullscreen/${item.id}`)
                                }} />
                        </Card>
                    )
                })}
            </div>

            <NavBar />
        </div>
    )

}

export default ProfilePage;