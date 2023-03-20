import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import api from "../api/users";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav'
import './Group.css';
import { handleGroupId, handleQuizStart, handleSocket } from '../redux/actions';

const Groups = ({ socket }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
    const {quizid, user ,quizcode , groupId} = useSelector((state) => state);
    const[value, setValue] = useState("")
    const [grps, setGrps] = useState([])
    useEffect(() =>{
      socket?.on('quiz_started_by_leader' , () =>{
        dispatch(handleQuizStart(true))
        navigate('/questions')
      })
    }, [socket])
    

    useEffect(() => {
      
      const fetchgrps = async() => {
        try{
        const response = await api.get(`/quiz/${quizid}`,{
          withCredentials: true
        })
        console.log(response)
        setGrps(response.data)
      }catch(err){
        console.log(err.message)
      }}
      
      fetchgrps()
      
    },[])


    const  handleGrpAdd =async (e) =>{
      try {
        console.log(value)
        const addition = await api.post(`/quiz/${quizid}`, {
          name : value
        },{
          withCredentials:true
        });
        console.log(addition.data)
        
      } catch (error) {
        console.log(error)
      }
      
    }
    const handleGrpEntry = async (e,key) =>{
        e.preventDefault();
        console.log(key)
        const join = await api.post("/groups/add", {
           id : key
        },{
          withCredentials:true
        })
        dispatch(handleGroupId(join.data.groupId.toString()));
    }
    useEffect(() =>{
      socket?.emit('join-group' , {
        groupId : groupId
      })
    } , [groupId])
    const handleGrpExit = async (e,key) =>{
      console.log('hello')
        e.preventDefault();
        const exit = await api.post("/groups/remove", {
           id : key
        },{
          withCredentials:true
        })
        console.log(exit);
      }
    const startQuiz = async (e) => {
      
      e.preventDefault()
      try {
       
          socket?.emit('quiz_started');
        
      } catch (error) {
        console.log(error)
      }
     
    }/*  navigate("/questions") */


  return (
    <>
   
    <div className="waiting-room">
    <Nav />
      <img className="waiting-room-child" alt="" src="/vector-2.svg" />
      <div className="quizid">
        <span className="quiz-id-6415b23ca550a8571282b">
          Quiz ID: {quizcode}
        </span>
      </div>
      <div className="group-parent">
      {grps?.map((item, index) => (

          <div className="group1" key={index}>
          <div className="grpname">
            <div className="grp1">
              <span className="utkarsh2">{item.name}</span>
            </div>
            <img className="grpname-child" alt="" src="/vector-22.svg" />
          </div>
          <img className="vector-icon" alt="" src="/vector.svg" onClick={(e) => handleGrpEntry(e , item._id)} />
          </div>
           
        ))
        }
      
        
        <div className="add-group">
          <div className="group-name">
            <input 
            required 
            className="enter-group-name"
            value={value} 
            onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button onClick={(e) => handleGrpAdd(e)} className="add-button">
            <div className="add">Add</div>
          </button>
        </div>
        <div className="frame-parent5">
        {user.isCreater &&
          
          <button onClick={(e) => startQuiz(e)}className="start-wrapper">
          <div className="start">Start</div>
        </button>
        }
        <button className="exit-container">
          <div className="start">Exit</div>
        </button>
      </div>
      </div>      
      </div>
      </>

    
  )
}

export default Groups;