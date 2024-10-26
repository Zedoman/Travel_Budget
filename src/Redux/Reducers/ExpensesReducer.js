import { createSlice } from "@reduxjs/toolkit";

export const ExpensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses"))
      : [],
    filteredExpenses: [],
    editExpense: {},
    budget: Number(localStorage.getItem("budget")) ?? 0,
    isValidBudget: false,
  },
  reducers: {
    setExpensesAction: (state, action) => {
      state.expenses = action.payload;
    },
    setEditExpenseAction: (state, action) => {
      state.editExpense = action.payload;
    },
    setFilteredExpensesAction: (state, action) => {
      state.filteredExpenses = action.payload;
    },
    setBudgetAction: (state, action) => {
      state.budget = action.payload;
    },
    setIsValidBudgetAction: (state, action) => {
      state.isValidBudget = action.payload;
    },
  },
});

export const {
  setExpensesAction,
  setEditExpenseAction,
  setFilteredExpensesAction,
  setBudgetAction,
  setIsValidBudgetAction,
} = ExpensesSlice.actions;

export default ExpensesSlice.reducer;
