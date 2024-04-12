import Option from "./Option";
import PropTypes from "prop-types";
function Question({ questions, dispatch, answer }) {
  console.log(questions);
  return (
    <div>
      <h4>{questions.question}</h4>
      <Option question={questions} dispatch={dispatch} answer={answer} />
    </div>
  );
}
Question.propTypes = {
  questions: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  answer: PropTypes.number,
};

export default Question;
