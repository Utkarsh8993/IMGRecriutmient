import React from 'react'
import { useNavigate } from 'react-router-dom';
import { handleCodeChange } from '../redux/actions';
import { useState } from 'react';
import { useDispatch } from "react-redux";

const QuizRoom = () => {

    const navigate = useNavigate();
    const [pass, setPass] = useState('')
    const dispatch = useDispatch();

    const handlePassChange = (e) => {
        setPass(e.target.value);
        dispatch(handleCodeChange(e.target.value));
    }

    const handleCreateRoom = () => {
        navigate("/")
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
      <button onClick={() => navigate("/groups")}>Join Room</button>

    </div>
  )
  
}

export default QuizRoom
