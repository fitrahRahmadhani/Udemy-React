import { useEffect } from "react";
import PropTypes from "prop-types";
function Timer({ dispatch, secondRemaining }) {
  const mins = Math.floor(secondRemaining / 60);
  const secs = secondRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins} : {secs < 10 && "0"}
      {secs}
    </div>
  );
}

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  secondRemaining: PropTypes.number.isRequired,
};
export default Timer;
