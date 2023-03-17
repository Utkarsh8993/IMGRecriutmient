import Profile from "./Profile";
import Quiz from "./Quiz";
import api from "./api/users";
import About from "./About";
import { useState, useEffect } from "react";
import MacBookPro141 from "./mac-book-pro141";
import Login from "./Login";
import Settings from "./pages/Settings";
import FinalScreen from "./pages/FinalScreen";
import Questions from "./pages/Questions";
import QuizRoom from "./pages/QuizRoom";
import Groups from "./pages/Groups";
import CreateRoom from "./pages/CreateRoom";

import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import MacBookPro142 from "./pages/MacBookPro142";


function App() {
  const [userData, setUserData] = useState([])
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
    

  
  
    return (
    <main className="App">
     { <Routes>
        
        <Route path="profile" element={<Profile userData={userData} />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="about" element={<About />} />
        <Route path="j" element={<MacBookPro141 />} />
        <Route path="/" element={<Settings/>} />
        <Route path="score" element={<FinalScreen/>} />
        <Route path="questions" element={<Questions/>} />
        <Route path="quizroom" element={<QuizRoom />} />
        <Route path="groups" element={<Groups />} />
        <Route path="createquizroom" element={<CreateRoom />} />
        <Route path="login" element={<MacBookPro142 />} />
        
        
      </Routes>
     }
      
    </main>
    
    )
}

export default App;
