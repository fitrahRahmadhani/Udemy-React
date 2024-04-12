import { useQuiz } from "../context/QuizContext";
import Option from "./Option";
import PropTypes from "prop-types";

function Question() {
  const { questions, index } = useQuiz();
  const currentQuestion = questions[index];

  return (
    <div>
      <h4>{currentQuestion.question}</h4>
      <Option />
    </div>
  );
}

Question.propTypes = {
  questions: PropTypes.array,
  index: PropTypes.number,
};

export default Question;
