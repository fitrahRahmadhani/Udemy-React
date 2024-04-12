import { useEffect, useReducer } from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Loader from "./Loader.jsx";
import Error from "./Error.jsx";
import StartScreeen from "./StartScreeen.jsx";
import Question from "./Question.jsx";
import NextButton from "./NextButton.jsx";
import Progress from "./Progress.jsx";
import FinishScreen from "./FinishScreen.jsx";
import Timer from "./Timer.jsx";
import Footer from "./Footer.jsx";

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

function App() {
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
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreeen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQustion={numQuestion}
              points={points}
              maxScore={maxScore}
              answer={answer}
            />
            <Question
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestion={numQuestion}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxScore}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
