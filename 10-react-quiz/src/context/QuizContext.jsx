import { createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

const QuizContext = createContext();
const SECS_PER_QUESTION = 30;

const initialsState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondRemaining: 0,
};
function reducer(state, action) {
  if (!action || !action.type) {
    throw new Error('Action must be an object with a "type" property');
  }
  switch (action.type) {
    case "dataReceived":
      if (!action.payload) {
        throw new Error('"dataReceived" action must have a "payload" property');
      }
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SECS_PER_QUESTION,
        highScore: state.highScore,
      };
    case "newAnswer": {
      let question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "reset":
      return {
        ...initialsState,
        questions: state.questions,
        highScore: state.highScore,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highScore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialsState);
  const numQuestion = questions.length;
  const maxScore = questions.reduce(
    (prev, question) => prev + question.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed", payload: err }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondRemaining,
        numQuestion,
        maxScore,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizContext must be used within a QuizContextProvider");
  }
  return context;
}

QuizProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { QuizProvider, useQuiz };
