import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import './HomePage.css'

function HomePage() {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const post = useSelector(store => store.post)

    useEffect(() => {
        dispatch({ type: 'FETCH_POSTS' });
    }, [dispatch]);

    console.log('post is:', post);

    return (
        <div className="homePage">
            <h2 className="h2Home">Home</h2>

            <div>
                {!post ? null : post.map((item) => {
                    return (
                        <div key={item.id}>
                            <h4>My Story</h4>
                            <img src={item.img_url} />
                        </div>
                    )
                })}
            </div>

            <NavBar />
        </div>
    )

}

export default HomePage;