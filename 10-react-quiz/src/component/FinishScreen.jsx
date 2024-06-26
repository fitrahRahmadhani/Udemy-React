import PropTypes from "prop-types";
import { useQuiz } from "../context/QuizContext";

function FinishScreen() {
  const { points, maxScore, highScore, dispatch } = useQuiz();
  const percentage = (points / maxScore) * 100;

  let emoji;
  if (percentage === 100) emoji = "🎖️";
  if (percentage > 80 && percentage < 100) emoji = "🎉";
  if (percentage > 50 && percentage < 80) emoji = "😐";
  if (percentage > 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🥴";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxScore} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} point)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Reset
      </button>
    </>
  );
}

FinishScreen.propTypes = {
  points: PropTypes.number,
  maxScore: PropTypes.number,
  highScore: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};
export default FinishScreen;
