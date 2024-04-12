import PropTypes from "prop-types";
import { useQuiz } from "../context/QuizContext";

function Option() {
  const { questions, answer, dispatch, index } = useQuiz();
  const currentQuestion = questions[index];
  const hasAnswer = answer !== null;

  return (
    <div className="options">
      {currentQuestion.options.map((option, optionIndex) => (
        <button
          key={optionIndex}
          onClick={() => dispatch({ type: "newAnswer", payload: optionIndex })}
          className={`btn btn-option ${
            optionIndex === answer ? "answer" : ""
          } ${
            hasAnswer
              ? optionIndex === currentQuestion.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswer}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

Option.propTypes = {
  index: PropTypes.number,
};

export default Option;
