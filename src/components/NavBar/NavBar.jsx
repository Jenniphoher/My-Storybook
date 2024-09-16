import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useSelector, useDispatch } from "react-redux";
import HomeIcon from '@mui/icons-material/Home';
import './NavBar.css'

function NavBar() {
    const user = useSelector(store => store.user)
    const history = useHistory();
    const dispatch = useDispatch();

    const handleOnClickCreate = (e) => {
        e.preventDefault
        dispatch({
            type: 'CREATE_STORYBOOK',
            payload: {
                history: history,
                userId: user.id
            }
        })
    }

    return (
        <div className="navBar tw-w-full tw-bg-black tw-h-24 " >
            <HomeIcon className="homeButton tw-block tw-bg-slate-50 tw-rounded-sm hover:tw-transition hover:tw-scale-125 hover:tw-rotate-180 hover:tw-duration-500 hover:tw-ease-in-out" 
                sx={{ fontSize: 40 }}
                onClick={() => {
                    history.push('/home_page')
            }} />
            {/* <button >Home</button> */}
            <button className="tw-block tw-bg-red-800 tw-text-slate-50 tw-size-20 tw-text-center tw-font-bold tw-rounded-full tw-text-6xl hover:tw-transition hover:tw-duration-300 hover:tw-delay-100 hover:tw-ease-in-out hover:tw-bg-red-950 hover:tw-scale-110" 
                    onClick={handleOnClickCreate}
                    >+</button>
            <img className="profileButton tw-block tw-bg-slate-50 tw-size-14 tw-rounded-full hover:tw-transition hover:tw-scale-125 hover:tw-rotate-180 hover:tw-duration-500 hover:tw-ease-in-out" 
                src={user.profile_photo}
                onClick={() => {
                    history.push(`/profile_page/${user.id}`)
                }} />
        </div>
    )

}

export default NavBar;