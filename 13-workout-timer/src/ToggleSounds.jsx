import { memo } from "react";
import PropTypes from "prop-types";

function ToggleSounds({ allowSound, setAllowSound }) {
  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
}

ToggleSounds.propTypes = {
  allowSound: PropTypes.bool.isRequired,
  setAllowSound: PropTypes.func.isRequired,
};

export default memo(ToggleSounds);
