import React from 'react'
import { useState, useEffect } from "react"
import api from "../api/users";

const CreateRoom = () => {

    const [quizcode, setQuizCode] = useState('')

    useEffect(() => {
        const fetchQuizCode = async () => {
          try{
            const response = await api.get('/quiz');
            const message = JSON.stringify(response.data.RoomID)
            setQuizCode(JSON.parse(message));       
        }catch(err)
        {
          console.log(err.message);
        }
      }
      fetchQuizCode();
        },[])
  return (
    <div>
      {quizcode}
    </div>
  )
}

export default CreateRoom
