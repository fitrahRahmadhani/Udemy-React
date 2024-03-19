import { useState } from "react";
import PropTypes from "prop-types";
import "./index.css";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  return (
    <>
      <Steps />
    </>
  );
}
function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) setStep((currStep) => --currStep);
  }
  function handleNext() {
    if (step < messages.length) setStep((currStep) => ++currStep);
  }
  function handleClose() {
    setIsOpen((is) => !is);
  }
  return (
    <>
      <button className="close" onClick={handleClose}>
        {isOpen ? "\u00D7" : "\u2295"}
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <StepMessage step={step}>
            <span>{messages[step - 1]}</span>
            <div className="buttons">
              <Button
                backgroundColor="#e7e7e7"
                color="#333333"
                onClick={() => alert(`Learn how to ${messages[step - 1]}`)}
              >
                Learn How
              </Button>
            </div>
          </StepMessage>
          <div className="buttons">
            <Button
              backgroundColor={"#7950f2"}
              color={"#fff"}
              onClick={handlePrevious}
            >
              <span>👈 Previous</span>
            </Button>
            <Button
              backgroundColor={"#7950f2"}
              color={"#fff"}
              onClick={handleNext}
            >
              <span>Next 👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function Button({ backgroundColor, color, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: `${backgroundColor}`, color: `${color}` }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function StepMessage({ step, children }) {
  return (
    <p className="message">
      Step {step}: {children}
    </p>
  );
}
Button.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
StepMessage.propTypes = {
  step: PropTypes.array.isRequired,
  children: PropTypes.element.isRequired,
};
export default App;
