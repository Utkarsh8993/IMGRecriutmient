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
import './Question.css'

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
      if (select === question?.correct_answer) {
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
  } , [questionIndex])
    
    
    const handleClickAnswer = async (e) => {
      setCount(count + 1)
      console.log(select);
      socket?.emit('next' , {
        groupId:  groupId
      })
      
    };
  if(response[questionIndex] !== undefined)
    {return ( <div className="macbook-pro-14-1">
      <div className="discord-parent">
        <div className="instance-wrapper">
          <div className="frame-parent2">
            <div className="question-1215-wrapper">
              <span className="question-1215">Question: { questionIndex+1}</span>
            </div>
            <div className="who-has-contributed-the-most-t-wrapper">
             {/*  <span className="amrit"> */}
                {/* <p className="who-has-contributed">{`Who has contributed the most to the `}</p> */}
                <p className="who-has-contributed">{decode(response[questionIndex]?.question)}</p>
              {/* </span> */}
            </div>
            {/* <img className="instance-child" alt="" src="/vector-1.svg" /> */}
            <div className="frame-parent3" onClick={(e) => {handleSelectAnswer(e)}}>
            {options?.map((data, id) => (
            <button className="frame-wrapper" >
            <div className="component-2-parent">
              <div className="component-2">
                <img
                  className="component-2-child"
                  alt=""
                  src="/ellipse-1.svg"
                />
                <div className="a">{id + 1}</div>
              </div>
              <div className="utkarsh-container">
                <span className="youtube">{decode(data)}</span>
              </div>
            </div>
          </button>
     
    ))}
     </div>
            </div>
            {user.isLeader &&
            <div className="frame-parent4">
              <button className="next-wrapper" onClick={handleClickAnswer}>
                <div className="next">Next</div>
              </button>
              </div>
            }
          </div>
        </div>
      </div>
    )}
    else{
      return
      (<h1>Loading</h1>)
    }
}

  

export default Questions
