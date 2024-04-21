import { createStore } from "redux";

const initialsStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialsStateAccount, action) {
  switch (action.type) {
    case "account/deposit": {
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    }
    case "account/withdraw": {
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    }
    case "account/requestLoan": {
      if (state.loan > 0) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.amount,
      };
    }
    case "account/payLoan": {
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    }
    default:
      return state;
  }
}

// const store = createStore(reducer);
// store.dispatch({ type: "account/deposit", payload: 100 });
// console.log(store.getState());
// store.dispatch({ type: "account/withdraw", payload: 30 });
// console.log(store.getState());
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 100, loanPurpose: "buy a car" },
// });
// console.log(store.getState());
// store.dispatch({
//   type: "account/payLoan",
// });
// console.log(store.getState());

function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}
function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}
function requestLoan(amount, loanPurpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, loanPurpose },
  };
}
function payLoan() {
  return {
    type: "account/payLoan",
  };
}
