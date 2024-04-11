import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const FakeAuthContext = createContext();
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Invalid action");
  }
}

function FakeAuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispacth] = useReducer(
    reducer,
    initialState
  );
  async function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispacth({ type: "login", payload: FAKE_USER });
    }
  }
  async function logout() {
    dispacth({ type: "logout" });
  }
  return (
    <FakeAuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </FakeAuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(FakeAuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
FakeAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { FakeAuthProvider, useAuth };
