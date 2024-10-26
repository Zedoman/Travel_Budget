import { configureStore } from "@reduxjs/toolkit";

import ExpensesReducer from "./Reducers/ExpensesReducer";

const store = configureStore({
  reducer: {
    expenses: ExpensesReducer,
  },
});

export default store;
