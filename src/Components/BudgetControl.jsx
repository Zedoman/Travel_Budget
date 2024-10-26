import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setBudgetAction,
  setExpensesAction,
  setIsValidBudgetAction,
} from "../Redux/Reducers/ExpensesReducer";


const BudgetControl = () => {
  const dispatch = useDispatch();

  const budget = useSelector((state) => state.expenses.budget); // Trip budget
  const expenses = useSelector((state) => state.expenses.expenses); // Trip-related expenses

  const [percentage, setPercentage] = useState(0);
  const [available, setAvailable] = useState(0);
  const [spent, setSpent] = useState(0);

  useEffect(() => {
    // Calculate total spent on the trip
    const totalSpent = expenses.reduce(
      (total, expense) => expense.amount + total,
      0
    );

    // Calculate remaining budget
    const totalAvailable = budget - totalSpent;

    // Calculate the percentage of the budget spent
    const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(
      2
    );

    // Update state with new values
    setAvailable(totalAvailable);
    setSpent(totalSpent);
    setTimeout(() => {
      setPercentage(newPercentage);
    }, 1800);
  }, [expenses, budget]);

  // Format budget numbers for display
  const formatBudgetNumber = (amount) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // Handle resetting the trip budget
  const handleResetBudget = () => {
    const response = confirm("Do you want to reset the trip budget?");
    if (response) {
      dispatch(setBudgetAction(0)); // Reset budget to zero
      dispatch(setExpensesAction([])); // Clear all expenses
      dispatch(setIsValidBudgetAction(false)); // Invalidate the budget
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={percentage}
          text={`${percentage} % spent`}
          styles={buildStyles({
            pathColor: percentage > 100 ? "#DC2626" : "#3b82f6", // Red if over budget
            trailColor: "#f5f5f5",
            textColor: percentage > 100 ? "#DC2626" : "#3b82f6",
          })}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetBudget}>
          Reset Trip Budget
        </button>
        <p>
          <span>Trip Budget:</span> {formatBudgetNumber(budget)}
        </p>
        <p className={`${available < 0 ? "negativo" : ""}`}>
          <span>Available Funds:</span> {formatBudgetNumber(available)}
        </p>
        <p>
          <span>Spent Funds:</span> {formatBudgetNumber(spent)}
        </p>
      </div>
      {/* <div className="fixed bottom-5 left-5" style={{ backgroundColor: 'purple', color: 'white' }}>
        <Copilot className="fixed bottom-5 right-5 bg-black text-white p-4 rounded-lg shadow-lg " />
      </div> */}
    </div>
  );
};

export default BudgetControl;
