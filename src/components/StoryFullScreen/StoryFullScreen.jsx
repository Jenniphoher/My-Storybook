import NavBar from "../NavBar/NavBar";
import './StoryFullScreen.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function StoryFullScreen() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const storyId = params.id;
    const user = useSelector(store => store.user);
    const post = useSelector(store => store.post)

    useEffect(() => {
        dispatch({
            type: 'FETCH_STORY_FULLSCREEN',
            payload: storyId
        })
    }, [])

    return (
        <div className="storyFullScreen">
            <h2>{user.first_name}'s Story</h2>

            <div className="storyFullScreenGallery">
                {!post ? null : post.map((item) => {
                    return (
                        <span className="storyFullScreenSpan"
                                key={item.id}>
                            <img className="storyFullScreenImage"
                                src={item.img_url} />
                            
                            <span className="storyFullScreenButtons">
                                <button className="storyFullScreenDelete"
                                    onClick={() => {
                                    // sweet alert?
                                    dispatch({
                                        type: 'DELETE_STORY',
                                        payload: {
                                            story_id: item.id,
                                            history: history,
                                            user_id: user.id
                                        }
                                    })
                                }}>Delete</button>
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