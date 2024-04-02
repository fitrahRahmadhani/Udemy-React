import PropTypes from "prop-types";
function Progress({ index, numQustion, points, maxScore, answer }) {
  return (
    <header className="progress">
      <progress max={numQustion} value={index + Number(answer !== null)} />
      <p>
        Question{" "}
        <strong>
          {index + 1} / {numQustion}
        </strong>
      </p>
      <p>
        <strong>{points}</strong>/{maxScore}
      </p>
    </header>
  );
}
Progress.propTypes = {
  index: PropTypes.number.isRequired,
  numQustion: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  maxScore: PropTypes.number.isRequired,
  answer: PropTypes.number,
};
export default Progress;
