import { createContext, useEffect, useContext, useReducer } from "react";
import PropTypes from "prop-types";
const CitiesContext = createContext();
const URL = "http://localhost:8000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "cities/fetched": {
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    }
    case "cities/loaded": {
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    }
    case "city/created": {
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    }
    case "city/deleted": {
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    }
    case "error": {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${URL}/cities`);
        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }
        const data = await response.json();
        dispatch({ type: "cities/fetched", payload: data });
      } catch (error) {
        dispatch({ type: "error", payload: error.message });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${URL}/cities/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch city id");
      }
      const data = await response.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  }

  async function createCity(city) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      if (!response.ok) {
        throw new Error("Failed to create city");
      }
      const data = await response.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete city");
      }
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { CitiesProvider, useCities };
