import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit: (state, action) => {
      state.balance += action.payload;
      state.isLoading = false;
    },
    convertingCurrency: (state) => {
      state.isLoading = true;
    },
    withdraw: (state, action) => {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, loanPurpose) {
        return {
          payload: { amount, loanPurpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.loanPurpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan: (state) => {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    isLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export function deposit(amount, currency) {
  return async function (dispatch) {
    try {
      if (currency === "USD") {
        dispatch({ type: "account/deposit", payload: amount });
      } else {
        dispatch({ type: "account/convertingCurrency" });
        // Panggilan API untuk konversi mata uang
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
        );
        if (!res.ok) {
          throw new Error("Failed to convert currency");
        }
        const data = await res.json();
        const converted = data.rates.USD;
        // Update state dengan hasil konversi
        dispatch({ type: "account/deposit", payload: converted });
      }
    } catch (error) {
      console.error("Error during currency conversion:", error.message);
    }
  };
}

export const { convertingCurrency, withdraw, requestLoan, payLoan } =
  accountSlice.actions;

export default accountSlice.reducer;
// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case "account/deposit": {
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     }
//     case "account/convertingCurrency": {
//       return {
//         ...state,
//         isLoading: true,
//       };
//     }
//     case "account/withdraw": {
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//       };
//     }
//     case "account/requestLoan": {
//       if (state.loan > 0) {
//         return {
//           ...state,
//         };
//       }
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.loanPurpose,
//         balance: state.balance + action.payload.amount,
//       };
//     }
//     case "account/payLoan": {
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     }
//     default:
//       return state;
//   }
// }
// export function deposit(amount, currency) {
//   return async function (dispatch) {
//     try {
//       if (currency === "USD") {
//         dispatch({ type: "account/deposit", payload: amount });
//       } else {
//         dispatch({ type: "account/convertingCurrency" });
//         // Panggilan API untuk konversi mata uang
//         const res = await fetch(
//           `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//         );
//         if (!res.ok) {
//           throw new Error("Failed to convert currency");
//         }
//         const data = await res.json();
//         const converted = data.rates.USD;
//         // Update state dengan hasil konversi
//         dispatch({ type: "account/deposit", payload: converted });
//       }
//     } catch (error) {
//       console.error("Error during currency conversion:", error.message);
//     }
//   };
// }
// export function withdraw(amount) {
//   return {
//     type: "account/withdraw",
//     payload: amount,
//   };
// }
// export function requestLoan(amount, loanPurpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount, loanPurpose },
//   };
// }
// export function payLoan() {
//   return {
//     type: "account/payLoan",
//   };
// }
