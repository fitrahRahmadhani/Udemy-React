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
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "error":
      return {
        ...state,
        error: action.payload,
      };
    case "cities/fetched":
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    case "city/loaded":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };
    default:
      throw new Error("Action not found");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, currentCity, isLoading, error }, dispacth] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispacth({ type: "loading" });
      try {
        const response = await fetch(`${URL}/cities`);
        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }
        const data = await response.json();
        dispacth({ type: "cities/fetched", payload: data });
      } catch (error) {
        dispacth({ type: "error", payload: error.message });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispacth({ type: "loading" });
    try {
      const response = await fetch(`${URL}/cities/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch city id");
      }
      const data = await response.json();
      dispacth({ type: "city/loaded", payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  async function createCity(city) {
    dispacth({ type: "loading" });
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
      dispacth({ type: "city/created", payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteCity(id) {
    dispacth({ type: "loading" });
    try {
      const response = await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete city");
      }
      dispacth({ type: "city/deleted", payload: id });
    } catch (error) {
      console.log(error);
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
