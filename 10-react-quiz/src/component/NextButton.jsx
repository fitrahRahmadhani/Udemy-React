import PropTypes from "prop-types";

function NextButton({ dispatch, answer, index, numQuestion }) {
  if (answer === null) {
    return null;
  }
  if (index === numQuestion - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  }
  if (index <= numQuestion) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }
}
NextButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  answer: PropTypes.number,
  index: PropTypes.number,
  numQuestion: PropTypes.number,
};
export default NextButton;
