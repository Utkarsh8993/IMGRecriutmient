import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { decode } from "html-entities";
import { useEffect, useState , useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";
import { handleScoreChange , handleQuizID, handleQuizCode} from "../redux/actions";
import api from "../api/users";
import Groups from "./Groups";
import './createQuiz.css'

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const CreateQuiz = () => {
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score,
    quizid,
  } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let apiUrl = `/api.php?amount=${amount_of_question}`;
  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }

  const { response, loading } =useAxios({ url: apiUrl });
  
  const postQuestions = useCallback(async () => {
    try {
      dispatch(handleScoreChange(0))
      console.log(response?.results)
      const result = await api.post('/quiz' ,{ 
        questions : response?.results
      } , {
        withCredentials: true
      })
      dispatch(handleQuizID(result.data.id))
      dispatch(handleQuizCode(result.data.code))

      console.log(result)
    } catch (error) {
      console.log(error.message)
    }
  }, [response?.results])
  
  useEffect(() => {
    postQuestions();
  }, [postQuestions])

return( <main className="macbook-pro-14-4">
<aside className="youready">
  <strong className="are-you-ready-wrapper">
    <div className="are-you-ready-container">
      <p className="are-you">Are You</p>
      <p className="are-you"> Ready?</p>
    </div>
  </strong>
  <img
    className="icon-message-question"
    alt=""
    src="/-icon-message-question.svg"
  />
</aside>
<img
  className="speakerphoneoutline-icon"
  alt=""
  src="/speakerphoneoutline.svg"
/>
<div className="options">
  <button className="next1" onClick={(e) =>{ navigate('/groups')}}>
    <div className="back">Next</div>
    <img
      className="airplane-take-off"
      alt=""
      src="/airplane-take-off@2x.png"
    />
  </button>
  <button className="next1" onClick={(e) =>{ navigate('/')}}>
    <div className="back ">Back</div>
    <img
      className="airplane-take-off"
      alt=""
      src="/airplane-landing@2x.png"
    />
  </button>
</div>
</main>
)
  
}

export default CreateQuiz;