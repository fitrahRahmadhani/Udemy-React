import PropTypes from "prop-types";

function Option({ question, dispatch, answer }) {
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswer
              ? index === question.correctOption
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
  question: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  answer: PropTypes.number,
};

export default Option;
