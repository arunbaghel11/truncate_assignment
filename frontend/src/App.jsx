import React, { useEffect, useReducer } from "react";
import Sidebar from "./components/Sidebar";
import TopHeader from "./components/TopHeader";
import FilterToolbar from "./components/FilterToolbar";
import TransactionTable from "./components/TransactionTable";
import Pagination from "./components/Pagination";
import api from "./services/api";
import "./styles.css";

// ---------------- INITIAL STATE ----------------
const initialState = {
  q: "",

  // filter arrays (must exist)
  regions: [],
  genders: [],
  categories: [],
  tags: [],
  paymentMethods: [],

  // numeric filters
  ageMin: "",
  ageMax: "",

  // date filters
  dateFrom: "",
  dateTo: "",

  // sorting
  sort: "date_desc",

  // pagination + results
  page: 1,
  results: [],
  total: 0,
  loading: false,
};

// ---------------- REDUCER ----------------
function reducer(state, action) {
  switch (action.type) {
    case "SET":
      return { ...state, ...action.payload };
    case "SET_RESULTS":
      return {
        ...state,
        results: action.payload.items,
        total: action.payload.total,
        loading: false,
      };
    case "LOADING":
      return { ...state, loading: true };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ---------------- API CALL ----------------
  async function fetchData() {
    dispatch({ type: "LOADING" });

    try {
      const res = await api.get("/sales", {
        params: {
          q: state.q,
          regions: state.regions.join(","),
          genders: state.genders.join(","),
          ageMin: state.ageMin,
          ageMax: state.ageMax,
          categories: state.categories.join(","),
          tags: state.tags.join(","),
          paymentMethods: state.paymentMethods.join(","),
          dateFrom: state.dateFrom,
          dateTo: state.dateTo,
          sort: state.sort,
          page: state.page,
        },
      });

      dispatch({ type: "SET_RESULTS", payload: res.data });
    } catch (err) {
      console.error("fetchData error:", err);
      dispatch({ type: "SET", payload: { loading: false } });
    }
  }

  // Call API whenever filters/search/sort/page change
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.q,
    state.regions.join(","),
    state.genders.join(","),
    state.ageMin,
    state.ageMax,
    state.categories.join(","),
    state.tags.join(","),
    state.paymentMethods.join(","),
    state.dateFrom,
    state.dateTo,
    state.sort,
    state.page,
  ]);

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <TopHeader
          search={state.q}
          onSearch={(q) => dispatch({ type: "SET", payload: { q, page: 1 } })}
        />

        <FilterToolbar state={state} dispatch={dispatch} />

        <TransactionTable items={state.results} loading={state.loading} />

        <Pagination
          page={state.page}
          totalPages={Math.max(1, Math.ceil(state.total / 10))}
          onChange={(p) => dispatch({ type: "SET", payload: { page: p } })}
        />
      </div>
    </div>
  );
}
