import {
    CHANGE_AMOUNT,
    CHANGE_CATEGORY,
    CHANGE_DIFFICULTY,
    CHANGE_SCORE,
    CHANGE_TYPE,
    CHANGE_CODE,
    CHANGE_LOGIN,
    CHANGE_QUIZID,
    CHANGE_QUIZCODE,
    CHANGE_USER,
    CHANGE_QUIZSTARTED,
    CHANGE_SOCKET,
    CHANGE_GROUPID
  } from "./actionsTypes";
  
  const initialState = {
    question_category:"",
    question_difficulty: "" ,
    question_type: "",
    amount_of_question: 20 ,
    score:0 ,
    code:"",
    login: false,
    quizid:'',
    quizcode:"",
    user:{},
    quizStarted:false,
    socket:null,
    groupId : ''

  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case CHANGE_CATEGORY:
        return {
          ...state,
          question_category: action.payload,
        };
      case CHANGE_DIFFICULTY:
        return {
          ...state,
          question_difficulty: action.payload,
        };
      case CHANGE_TYPE:
        return {
          ...state,
          question_type: action.payload,
        };
      case CHANGE_AMOUNT:
        return {
          ...state,
          amount_of_question: action.payload,
        };
      case CHANGE_SCORE:
        return {
          ...state,
          score: action.payload,
        };
      case CHANGE_CODE:
        return{
          ...state,
          code: action.payload,
        };  
      
      case CHANGE_LOGIN:
        return{
          ...state,
          login: action.payload,
        };  
      
      case CHANGE_QUIZID:
        return{
          ...state,
          quizid: action.payload,
        };  
      
      
      case CHANGE_QUIZCODE:
        return{
          ...state,
          quizcode: action.payload,
        };  
      
      
      case CHANGE_USER:
        return{
          ...state,
          user: action.payload,
        };  
      case CHANGE_QUIZSTARTED:
        return{
          ...state,
          quizStarted:action.payload
        }
      case CHANGE_SOCKET:
        return{
          ...state,
          socket:action.payload
        }
      case CHANGE_GROUPID:
        return{
          ...state,
          groupId:action.payload
        }
      default:
        return state;
    }
  };
  
  export default reducer;