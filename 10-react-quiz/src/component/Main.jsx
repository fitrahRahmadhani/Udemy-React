import PropTypes from "prop-types";

function Main({ children }) {
  return <main className="main">{children}</main>;
}

Main.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Main;
