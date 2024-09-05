import NavBar from "../NavBar/NavBar";
import './ProfilePage.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfilePage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();
    const userId = params.id;
    const post = useSelector(store => store.post)

    useEffect(() => {
        dispatch({
            type: 'FETCH_PROFILE_POSTS',
            payload: userId
        })
    }, [])

    return (
        <div className="profilePage">
            <h2>Profile</h2>

            <div className="profilePostGallery">
                {!post ? null : post.map((item) => {
                    return (
                        <span className="profilePosts"
                                key={item.id}>
                            <img className="profileImages"
                                src={item.img_url}
                                onClick={() => {
                                    history.push(`/story_fullscreen/${item.id}`)
                                }} />
                        </span>
                    )
                })}
            </div>

            <NavBar />
        </div>
    )

}

export default ProfilePage;