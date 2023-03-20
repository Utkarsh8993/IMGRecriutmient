import { useCallback, useEffect } from "react";
import "./HomePage.css";
import Nav from "./Nav";

const HomePage = () => {
  const onFrameButtonClick = useCallback(() => {
    // Please sync "MacBook Pro 14" - 2" to the project
  }, []);

  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
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
    <main className="macbook-pro-14-11">
      <Nav/>
      
      <img className="macbook-pro-14-1-inner" alt="" src="/vector-2.svg" />
      <div className="component-2default">
        <article className="content-1-wrapper">
          <article className="content-1">
            <div className="st-page">
              <div className="quizhub">QuizHub</div>
            </div>
            <div className="quizhub-is-the-next-generation-wrapper">
              <div className="quizhub-is-the">
                QuizHub is the next-generation quiz generator for all the peeps
                out there. It provides you with a set of questions to strengthen
                your knowledge and improve your thinking.
              </div>
            </div>
            <button className="rectangle-parent">
              <div className="instance-child" />
              <a href="#aboutus"className="read-more" data-animate-on-scroll>
                Read More
              </a>
            </button>
          </article>
        </article>
        <img className="main-pic-icon" alt="" src="/main-pic@2x.png" />
        <div className="socialmedia">
          <img className="socialmedia-child" alt="" src="/vector-11.svg" />
          <a className="facebook">
            <img className="vector-icon1" alt="" src="/vector1.svg" />
          </a>
          <button className="twitter">
            <img className="vector-icon2" alt="" src="/vector2.svg" />
          </button>
          <a className="facebook">
            <img className="vector-icon3" alt="" src="/vector3.svg" />
          </a>
          <a
            className="facebook"
            href="https://github.com/Utkarsh8993/IMGRecruitment.git"
          >
            <img className="vector-icon4" alt="" src="/vector4.svg" />
          </a>
        </div>
        <header className="about-us">
          <img className="about-us-child" alt="" src="/vector-12.svg" />
          <b className="about-us1" id="aboutus">About Us</b>
        </header>
        <div className="about-us-pic-1">
          <img
            className="about-us-pic-1-child"
            alt=""
            src="/rectangle-5@2x.png"
          />
          <img
            className="mcq-illustration-insta-4x-1-icon"
            alt=""
            src="/mcq-illustration-insta-4x-1@2x.png"
          />
        </div>
        <article className="about-us-main">
          <b className="multiple-categories">Multiple Categories</b>
          <div className="about-us-content">
            <div className="quizhub-is-the">
              QuizHub provides various quizzes ranging from single correct to
              multi correct and puzzle. It aims to be at par with modern-day
              education and help develop a person's reasoning.
            </div>
          </div>
          <div className="icons">
            <div className="checkcircleoutline-parent">
              <div className="checkcircleoutline">
                <img className="vector-icon5" alt="" src="/vector5.svg" />
              </div>
              <div className="easy-to-use">Easy to Use</div>
            </div>
            <div className="checkcircleoutline-parent">
              <div className="checkcircleoutline">
                <img className="vector-icon5" alt="" src="/vector6.svg" />
              </div>
              <div className="easy-to-use">Safe and Fast</div>
            </div>
          </div>
        </article>
        <div className="about-us-pic-3">
          <img
            className="about-us-pic-3-child"
            alt=""
            src="/rectangle-51@2x.png"
          />
          <img
            className="unsplashxp4nc72yvwq-icon"
            alt=""
            src="/unsplashxp4nc72yvwq@2x.png"
          />
        </div>
        <article className="about-us-main-2">
          <article className="about-us-main1">
            <b className="multiple-categories">Numerous Genres</b>
            <div className="about-us-content">
              <div className="quizhub-is-the">
                The quizzes have various genres ranging from sports to the
                latest news and movies. It keeps people engrossed while at the
                same time maximizing their knowledge.
              </div>
            </div>
            <div className="icons">
              <div className="checkcircleoutline-parent">
                <div className="checkcircleoutline">
                  <img className="vector-icon5" alt="" src="/vector7.svg" />
                </div>
                <div className="easy-to-use">Interactive</div>
              </div>
              <div className="checkcircleoutline-parent">
                <div className="checkcircleoutline">
                  <img className="vector-icon5" alt="" src="/vector8.svg" />
                </div>
                <div className="safe-and-fast1">Latest questions</div>
              </div>
            </div>
          </article>
        </article>
        <header className="our-team">
          <img className="about-us-child" alt="" src="/vector-13.svg" />
          <b className="about-us1">Our Team</b>
        </header>
        <div className="utkarsh-sharma">
          <img
            className="unsplasheqftezjgerg-icon"
            alt=""
            src="/unsplasheqftezjgerg@2x.png"
          />
          <div className="person-details">
            <div className="perosn-name">
              <b className="quizhub-is-the">Utkarsh Sharma</b>
            </div>
            <div className="designation">
              <div className="quizhub-is-the">Senior Backend Developer</div>
            </div>
            <div className="socialmedia1">
              <img className="socialmedia-item" alt="" src="/vector-14.svg" />
              <img className="facebook-icon" alt="" src="/facebook.svg" />
              <img className="facebook-icon" alt="" src="/twitter.svg" />
              <img className="facebook-icon" alt="" src="/instagram.svg" />
              <img className="facebook-icon" alt="" src="/github.svg" />
            </div>
          </div>
        </div>
        <div className="pranav">
          <img
            className="unsplashu-z4p2h3kfe-icon"
            alt=""
            src="/unsplashuz4p2h3kfe@2x.png"
          />
          <div className="person-details1">
            <div className="perosn-name">
              <b className="quizhub-is-the">Pranav Pardeshi</b>
            </div>
            <div className="designation">
              <div className="quizhub-is-the">Senior Frontend Developer</div>
            </div>
            <div className="socialmedia1">
              <img className="socialmedia-item" alt="" src="/vector-15.svg" />
              <img className="facebook-icon" alt="" src="/facebook1.svg" />
              <img className="facebook-icon" alt="" src="/twitter1.svg" />
              <img className="facebook-icon" alt="" src="/instagram1.svg" />
              <img className="facebook-icon" alt="" src="/github1.svg" />
            </div>
          </div>
        </div>
        <article className="amrit">
          <img
            className="unsplashgcqxcsynmhk-icon"
            alt=""
            src="/unsplashgcqxcsynmhk@2x.png"
          />
          <div className="person-details2">
            <div className="perosn-name">
              <b className="quizhub-is-the">Amrit Chirania</b>
            </div>
            <div className="designation">
              <div className="quizhub-is-the">Senior Designer</div>
            </div>
            <div className="socialmedia1">
              <img className="socialmedia-item" alt="" src="/vector-16.svg" />
              <img className="facebook-icon" alt="" src="/facebook2.svg" />
              <img className="facebook-icon" alt="" src="/twitter2.svg" />
              <img className="facebook-icon" alt="" src="/instagram2.svg" />
              <img className="facebook-icon" alt="" src="/github2.svg" />
            </div>
          </div>
        </article>
        <article className="contact1">
          <div className="contact-us">
            <b id="contact" className="quizhub-is-the">Contact Us</b>
          </div>
          <div className="address">
            <div className="address-iit-roorkee-container">
              <p className="address-iit-roorkee-hardiwar">
                <span className="address1">Address:</span>
                <span className="span">{` `}</span>
                <span>IIT Roorkee, Hardiwar Highway,</span>
              </p>
              <p className="address-iit-roorkee-hardiwar">
                <span> Roorkee, Uttarakhand 247677.</span>
                <span className="span">{`                              `}</span>
              </p>
              <p className="p">{`                 `}</p>
            </div>
          </div>
          <div className="phone">
            <div className="quizhub-is-the">
              <span>Phone:</span>
              <span className="span">{` `}</span>
              <span className="utkarsh-seceiitracin">+91 98766 37993</span>
            </div>
          </div>
          <div className="phone">
            <div className="quizhub-is-the">
              <span>Email:</span>
              <span className="span">{` `}</span>
              <span className="utkarsh-seceiitracin">
                utkarsh_s@ece.iitr.ac.in
              </span>
            </div>
          </div>
        </article>
        <div className="component-1">
          <div className="component-1-child" />
          <img href="https://maps.google.com/?cid=17951815015756325119&entry=gps" className="address-2-icon" alt="" src="/address-2@2x.png" />
        </div>
        <header className="testimonials">
          <img className="about-us-child" alt="" src="/vector-17.svg" />
          <b className="about-us3">Testimonials</b>
        </header>
        <img className="bhavya-pic-icon" alt="" src="/bhavya-pic@2x.png" />
        <article className="bhavya">
          <div className="perosn-name">
            <div className="quizhub">
              “This website is awesome. It has helped me grow so much and now
              the biggest problem I have is too much to learn - which is the
              best problem to have.”
            </div>
          </div>
          <div className="star">
            <img className="vector-icon9" alt="" src="/vector9.svg" />
            <img className="vector-icon9" alt="" src="/vector9.svg" />
            <img className="vector-icon9" alt="" src="/vector9.svg" />
            <img className="vector-icon9" alt="" src="/vector9.svg" />
            <img className="vector-icon9" alt="" src="/vector9.svg" />
          </div>
          <div className="info">
            <div className="perosn-name">
              <div className="quizhub-is-the">Bhavya Jain</div>
            </div>
            <div className="perosn-name">
              <div className="quizhub-is-the">Aspiring Designer</div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};

export default HomePage;
