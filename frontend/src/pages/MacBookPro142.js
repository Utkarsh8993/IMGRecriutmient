import { useEffect } from "react";
import styles from "./MacBookPro142.module.css";
import { useNavigate } from "react-router-dom";
import api from "../api/users";
import { useDispatch } from "react-redux";
import { handleLogin } from "../redux/actions";

const MacBookPro142 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleSignUp = async () =>{
    /*try {
      const response = await api.get('auth/google');
    } catch (error) {
      console.log(error.message)
    }*/
    dispatch(handleLogin(true))
    navigate("/j")

      }
  

  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  return (
    <main
      className={styles.macbookPro142}
      display="flex"
      justify-content="center"
      align-items="center"
    >
      <section
        className={styles.mainBox}
        display="flex"
        align-items="center"
        positio="relative"
        flex-diretion="column"
        margin="0 auto"
        data-animate-on-scroll
      >
        <a className={styles.logo1}>
          <a className={styles.logo11} onClick={()=> navigate("/j")} />
        </a>
        <strong className={styles.segnIn}>
          <div className={styles.segnIn1}>
            <div className={styles.signInWrapper}>
              <div className={styles.signIn}>Sign In</div>
            </div>
          </div>
        </strong>
        <form >
        <input className={styles.email} type="text" placeholder="Email" />
        <br></br>
          <input 
          className={styles.email}
          type="text"
          placeholder="Password"
        />
        </form>
        <a href="http://localhost:3500/auth/google" className={styles.google}>
          <img
            className={styles.googleJpeg}
            alt=""
            src="/google--jpeg@2x.png"
          />
        </a>
        <button className={styles.buttonArrow}>
          <img
            className={styles.buttonArrowChild}
            alt=""
            src="/rectangle-1.svg"
          />
          <img className={styles.vectorIcon} alt="" src="/vector.svg" />
        </button>
        <div className={styles.bySigningInYouAgreeToThWrapper}>
          <div className={styles.bySigningIn}>
            By signing in, you agree to the Terms of Service and the Privacy
            Policy.
          </div>
        </div>
      </section>
      <img className={styles.verticalLine} alt="" src="/vector-1.svg" />
      <img className={styles.image} alt="" src="/frame-6@2x.png" />
    </main>
  );
};

export default MacBookPro142;
