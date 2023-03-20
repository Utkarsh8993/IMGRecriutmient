import Profile from "./Profile";
import Quiz from "./Quiz";
import api from "./api/users";
import About from "./About";
import { useState, useEffect } from "react";
import MacBookPro141 from "./mac-book-pro141";
import Login from "./Login";
import Settings from "./pages/Settings";
import FinalScreen from "./pages/FinalScreen";
import CreateQuiz from "./pages/CreateQuiz";
import QuizRoom from "./pages/QuizRoom";
import Groups from "./pages/Groups";
import CreateRoom from "./pages/CreateRoom";
import MacBookPro1411 from "./HomePage";
import Questions  from '../src/pages/Questions';
import { io } from 'socket.io-client'
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import MacBookPro142 from "./pages/MacBookPro142";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleUser } from "./redux/actions";


function App() {
  const { user } = useSelector((state) => state);
  
  const [userData, setUserData] = useState([])
  const [socket , setSocket] = useState(null);
  useEffect(()=>{
    setSocket(io('http://localhost:3500'))} , 
    [])
  const dispatch = useDispatch();
  
  //const [groups, setGroups] = useState([])

  useEffect(() => {
    const fetchuser = async () => {
      try{
        const response = await api.get('/users');
        setUserData(response.data);       
    }catch(err)
    {
      console.log(err.message);
    }
  }
  fetchuser();
    },[])


useEffect(()=>{
  const fetchUser = async() =>{
    try {
      const userdata = await api.get("/users/profile",{
        withCredentials:true
      })
      console.log(userdata)
     dispatch(handleUser(userdata.data)) 
    } catch (error) {
      console.log(error)
    }
  }
  fetchUser()
} , [])


  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);
    
  const pathn = location.pathn;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathn]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathn) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathn]);
  
  
    return (
    <main className="App">
      
      <Routes>
        
        <Route path="profile" element={<Profile userData={userData}  />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="about" element={<About />} />
        <Route path="j" element={<MacBookPro141 />} />
        <Route path="/" element={<Settings/>} />
        <Route path="score" element={<FinalScreen/>} />
        <Route path="createquiz" element={<CreateQuiz/>} />
        <Route path="quizroom" element={<QuizRoom />} />
        <Route path="groups" element={<Groups socket = {socket}/>} />
        <Route path="createquizroom" element={<CreateRoom />} />
        <Route path="login" element={<MacBookPro142 />} />
        <Route path="/h" element={<MacBookPro1411 />} />
        <Route path="/questions" element={<Questions socket = {socket}/>} />
        
      </Routes>
     
      
    </main>
    
    )
}

export default App;
