import { HashLink as Link} from 'react-router-hash-link';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { handleLogin, handleUser } from './redux/actions';
import './HomePage.css'
import './submenu.css'
import api from './api/users'

const Nav = (props) => {

  const { login, user } = useSelector((state) => state);
  const [open , setOpen] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const goToHome = () => {
        navigate("/h");
    }
    const goToLogin = () => {

        navigate("/login");
    }
    const goToLogout = async () => {
      try {
        const response = await api.get('auth/logout' , {
          withCredentials: true
        })
        console.log(response)
        dispatch(handleUser(""))
      } catch (error) {
        console.log(error)
      }
        dispatch(handleLogin(false));
        navigate("/h");
    }
    const goToSettings = () => {
      navigate("/");
  }
    return(
        
<nav className="new-navbar">
        <a className="logo-12" onClick={() => goToHome()} />
        <div className="lela-wrapper">
          <div className="lela">
            <button className="home-link-parent" /* onClick={onFrameButtonClick} */>
              <div className="home-link">
                <a className="play" onClick={() => goToSettings()}>Play</a>
              </div>
              <img
                className="chevrondownoutline-icon"
                alt=""
                src="/chevrondownoutline.svg"
              />
            </button>
            <a className="home-link-wrapper">
              <a className="home-link1">
                <a className="play" href="#aboutus">About</a>
              </a>
            </a>
            <a className="home-link-wrapper">
              <div className="home-link">
                <a className="play" href="#contact">Contact</a>
              </div>
            </a>
            <div className="home-link-frame">
              <a className="home-link1">
                { !user &&
                <a className="play" onClick={() => goToLogin()}>Login</a>}
              </a>
            </div>
            {user &&
              <img
              onClick={() => {setOpen(!open);
              console.log(open)}}
              className="image"
              alt=""
              src="/usercircleoutline.svg"
            />}
            {open && user &&
             <div className='sub-wrap' id='sub-menu'>
             <div className='sub-menu'>
               <div className='user-info'>
                 <img src={user.imgLink.toString()} className='img1'/>
                 <h2>{user.username}</h2>
               </div>
               <hr></hr>
               <a href='#' className='sub-menu-link'>
                 <img src='/playground_assets/electric.png'></img>
                 <p>Number of Quizzes Played: {user.quizPlayed}</p>
               </a>
               <a href='#' className='sub-menu-link'>
                 <img src='/playground_assets/Bar.png'></img>
                 <p>Number of Points Earned:{ user.questionCorrect }</p>
               </a>
               <a href='#' className='sub-menu-link1'>
                 <img src='/playground_assets/logout.png'></img>
                 <p><a onClick={() => goToLogout()}>LogOut</a></p>
               </a>
             </div>
           </div>
             }
               
          </div>
        </div>
      </nav>
    )
}

export default Nav