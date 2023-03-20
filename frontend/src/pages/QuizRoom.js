import React from 'react'
import { useNavigate } from 'react-router-dom';
import { handleQuizID, handleQuizCode } from '../redux/actions';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import api from "../api/users";


const QuizRoom = () => {

  
    const navigate = useNavigate();
    const [pass, setPass] = useState('')
    const dispatch = useDispatch();

    const handlePassChange = (e) => {
      e.preventDefault();
        setPass(e.target.value);
    }

      const  handleCreateRoom =  () =>{
       /*  e.preventDefault();
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
        } */
        navigate("/")
    }

     const  handleJoinRoom = async (e) =>{
       e.preventDefault();
       try {
        console.log(pass)
         const join = await api.post('/quiz/join', {
           requestKey : pass
         },{
           withCredentials:true
         });
         console.log(join.data.code)
         dispatch(handleQuizCode(join.data.code.RoomID))
         dispatch(handleQuizID(join.data.code._id))
       } catch (error) {
         console.log(error)
       }
       navigate("/groups")
   }
 

    
    return (
    <div>
      <button onClick={() => handleCreateRoom()}>Create Room</button><br/><br/><br/>

      <input 
      type="text" 
      label="Code"
      value={pass}
      onChange={(e) => handlePassChange(e)}
      />
    <button onClick={ (e) => handleJoinRoom(e) }>Join Room</button> 


    </div>
  )
  
}

export default QuizRoom
