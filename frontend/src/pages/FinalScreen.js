import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { handleAmountChange, handleScoreChange } from "../redux/actions";
import api from "../api/users";
import { useState, useEffect } from "react";

const FinalScreen = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const { score, quizid } = useSelector((state) => state);
  const [grps, setGrps] = useState([])


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

  const finalList = () =>{
    console.log("hello")
      setGrps(grps.sort((a, b) => a.points - b.points));
      

      }
  

  const handleBackToSettings = async () => {
    disptach(handleScoreChange(0));
    disptach(handleAmountChange(50));
    try {
      const exit = await api.post("/quiz/end",{
        quizId : quizid
      },{
        withCredentials:true
      })
    } catch (error) {
      console.log(error)
    }
    navigate("/h");
  };

  return (
    <Box mt={30}>
      <Typography variant="h3" fontWeight="bold" mb={3}>
       Your Score {score}
      </Typography>
      <Button onClick={handleBackToSettings} variant="outlined">
        back to settings!
      </Button>
      <Button onClick={finalList} variant="outlined">
        ScoreCard
      </Button>
      {grps?.map((item, index) => (
        <ul>
          <li>{item.name}</li>
        </ul>
        ))}
    </Box>
  );
};

export default FinalScreen;