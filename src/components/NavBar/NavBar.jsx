import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useSelector, useDispatch } from "react-redux";
import './NavBar.css'

function NavBar() {
    const user = useSelector(store => store.user)
    const history = useHistory();
    const dispatch = useDispatch();

    const handleOnClickCreate = (e) => {
        e.preventDefault
        dispatch({
            type: 'CREATE_POST',
            payload: {
                history: history,
                user_id: user.id
            }
        })
    }

    return (
        <div className="navBar">
            <button className="homeButton" onClick={() => {
                history.push('/home_page')
            }}>Home</button>
            <button className="createButton" 
                    onClick={handleOnClickCreate}
                    >+</button>
            <button className="profileButton" onClick={() => {
                history.push(`/profile_page/${user.id}`)
            }}>Profile</button>
        </div>
    )

}

export default NavBar;