import PropTypes from "prop-types";

function StartScreeen({ numQuestion, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestion} question to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Lets&apos;s start
      </button>
    </div>
  );
}

StartScreeen.propTypes = {
  numQuestion: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default StartScreeen;
