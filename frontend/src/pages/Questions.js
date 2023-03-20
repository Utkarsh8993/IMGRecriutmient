import React from 'react'
import api from "../api/users";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { decode } from "html-entities";
import { useDispatch } from "react-redux";
import { handleScoreChange } from '../redux/actions';
import {io} from 'socket.io-client'

const Questions = ({ socket }) => {

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {quizid, score, user , groupId} = useSelector((state) => state)
    const [questionIndex, setQuestionIndex] = useState(0);
    const [options, setOptions] = useState([]);
    const [response, setResponse] = useState([])
    const [select, setSelect] = useState();

    const [count , setCount] = useState(0);
    useEffect(() => { 
      const getQuestions = async() => {
        try {
          const questions = await api.post(`/quiz/questions`,{
            id:quizid
          },{
            withCredentials : true,

          })
          setResponse(questions.data)
          } 
          catch (error) {
          console.log(error)
        }
      }
      getQuestions()
    },[])
  
       useEffect(() => {
      if (response.length !== 0) {
        const ques = response[questionIndex]
        let answers = [...ques.incorrect_answers];
        answers.splice(
          getRandomInt(ques.incorrect_answers.length),
          0,
          ques.correct_answer
        );
        setOptions(answers)
        } 
    }, [response, questionIndex]);
  
    /* if (loading) {
      return (
        <Box mt={20}>
          <CircularProgress />
        </Box>
      );
    } */
    const handleSelectAnswer = (e) =>{
      setSelect(e.target.textContent)
      console.log(select) 
    }
  useEffect(() =>{
    socket?.on('nextClicked' ,async () =>{
      console.log('next clicked')
      const question = response[questionIndex];
      if (select === question.correct_answer) {
        dispatch(handleScoreChange(score + 1));
      }
      if (questionIndex + 1 < response.length) {
        setQuestionIndex(questionIndex + 1);
      } else {
        try {
        console.log(quizid)
          const finish = await api.patch("/groups/update",{
            score: score,
            quizId : quizid,
            leaderId : user._id
          },{
            withCredentials: true
          })
          console.log(finish)
        } catch (error) {
          console.log(error)
        }
        navigate("/score");
      }
    })
  } , [count])
    
    
    const handleClickAnswer = async (e) => {
      setCount(count + 1)
      console.log(select);
      socket?.emit('next' , {
        groupId:  groupId
      })
      
    };
  if(response[questionIndex] !== undefined)
    {return (
      <Box>
      <Typography variant="h4">Questions {questionIndex + 1}</Typography>
      <Typography mt={5}>
        {decode(response[questionIndex].question)}
      </Typography>
      {options?.map((data, id) => (
        <Box mt={2} key={id}>
          <Button onClick={(e) => handleSelectAnswer(e)} variant="contained">
            {decode(data)}
          </Button>
        </Box>
      ))}
      {user.isLeader &&
        <button onClick={handleClickAnswer}>Next</button>}
    </Box>
    )}
    else{
      return
      (<h1>Loading</h1>)
    }
}

  

export default Questions
