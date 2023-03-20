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

return(
  <h1>Loading...</h1>
)
  
}

export default CreateQuiz;