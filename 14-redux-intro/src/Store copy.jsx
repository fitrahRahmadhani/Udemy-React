import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer": {
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createAt,
      };
    }
    case "customer/updateName": {
      return {
        ...state,
        fullName: action.payload,
      };
    }
    default:
      return state;
  }
}

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

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);
store.dispatch(createCustomer("John Doe", "1234567890"));

store.dispatch(deposit(200));
store.dispatch(withdraw(100));
store.dispatch(requestLoan(500, "buy a very cheap car"));
console.log(store.getState());
