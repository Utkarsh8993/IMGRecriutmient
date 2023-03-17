import { HashLink as Link} from 'react-router-hash-link';
import { useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/j");
    }
    const goToLogin = () => {
        navigate("/login");
    }
    const goToSettings = () => {
      navigate("/");
  }
    return(
        
<div className="mac-book-pro141-navbar">
          <img
            src="/playground_assets/logo1i252-kkxe-200h.png"
            alt="logo1I252"
            className="mac-book-pro141-logo1"
          />
          <div className="mac-book-pro141-frame2">
            <div className="mac-book-pro141-header">
              <div className="mac-book-pro141-home-link">
                <span className="mac-book-pro141-text02">
                  <span><a className='navLinks' onClick={() => goToHome()}>Home</a></span>
                </span>
              </div>
              <div className="mac-book-pro141-home-link1">
                <span className="mac-book-pro141-text02">
                  <span><a className='navLinks' onClick={() => goToSettings()}>Play</a></span>
                </span>
              </div>
              <div className="mac-book-pro141-home-link2">
                <span className="mac-book-pro141-text04">
                  <span><Link to=''>JKGHJH</Link></span>
                </span>
              </div>
              <div className="mac-book-pro141-home-link3">
                <span className="mac-book-pro141-text06">
                  <span>
                    Contact
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                </span>
              </div>
              <div className="mac-book-pro141-home-link3">
                <span className="mac-book-pro141-text02">
                  <span><a className='navLinks' onClick={() => goToLogin()}>Login</a></span>
                </span>
              </div>
              <img
                src="/playground_assets/usercircleoutlinei252-c8f.svg"
                alt="UserCircleOutlineI252"
                className="mac-book-pro141-user-circle-outline"
              />
            </div>
          </div>
        </div>
    )
}

export default Nav