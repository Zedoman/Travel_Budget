import { useState, useEffect } from "react";
import Header from "./Components/Header";
import ExpensesList from "./Components/ExpensesList";
import ModalWindow from "./Components/ModalWindow";
import Filters from "./Components/Filters";
import { generateId } from "./helpers";
import newExpenseIcon from "./img/nuevo-gasto.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditExpenseAction,
  setExpensesAction,
  setFilteredExpensesAction,
  setIsValidBudgetAction,
} from "./Redux/Reducers/ExpensesReducer";
import  CopilotBot  from "./Components/Copilot/CopilotBot";

function App() {
  const dispatch = useDispatch();

  //Redux states
  const expenses = useSelector((state) => state.expenses.expenses);
  const budget = useSelector((state) => state.expenses.budget);
  const editExpense = useSelector((state) => state.expenses.editExpense);
  const isValidBudget = useSelector((state) => state.expenses.isValidBudget);
  const filteredExpenses = useSelector(
    (state) => state.expenses.filteredExpenses
  );

  //Local states
  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimateModal(true);
      }, 200);
    }
  }, [editExpense]);

  useEffect(() => {
    localStorage.setItem("budget", budget ?? 0);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses) ?? []);
  }, [expenses]);

  useEffect(() => {
    if (filter) {
      const expensesByCategory = expenses.filter(
        (expense) => expense.category === filter
      );

      dispatch(setFilteredExpensesAction(expensesByCategory));
    }
  }, [filter]);

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem("budget")) ?? 0;
    if (budgetLS > 0) {
      dispatch(setIsValidBudgetAction(true));
    }
  }, []);

  const handleNewExpense = () => {
    setModal(true);

    dispatch(setEditExpenseAction({}));
    setTimeout(() => {
      setAnimateModal(true);
    }, 200);
  };

  const saveExpense = (expense) => {
    if (expense.id) {
      //Updating expense
      const updatedExpenses = expenses.map((expenseState) =>
        expenseState.id === expense.id ? expense : expenseState
      );

      dispatch(setExpensesAction(updatedExpenses));

      dispatch(setEditExpenseAction({}));
    } else {
      //New expense
      expense.id = generateId();
      expense.date = Date.now();

      dispatch(setExpensesAction([...expenses, expense]));
    }

    setAnimateModal(false);
    setTimeout(() => {
      setModal(false);
    }, 400);
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    dispatch(setExpensesAction(updatedExpenses));
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header isValidBudget={isValidBudget} />
      {isValidBudget && (
        <>
          <main>
            <Filters filter={filter} setFilter={setFilter} />
            <ExpensesList deleteExpense={deleteExpense} filter={filter} />
          </main>

          <div className="nuevo-gasto">
            <img
              src={newExpenseIcon}
              alt="new Expense Icon"
              onClick={handleNewExpense}
            />
          </div>
        </>
      )}
      {modal && (
        <ModalWindow
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          saveExpense={saveExpense}
          editExpense={editExpense}
        />
      )}
      <CopilotBot className="fixed bottom-14 left-5 bg-black text-white p-4 rounded-lg shadow-lg" />
    </div>
  );
}

export default App;
