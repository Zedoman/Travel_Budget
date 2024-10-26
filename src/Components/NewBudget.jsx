import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setBudgetAction,
  setIsValidBudgetAction,
} from "../Redux/Reducers/ExpensesReducer";
import Message from "./Message";
import Footer from "./Footer";

const NewBudget = () => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [budgetForm, setBudgetForm] = useState("0"); // Start with "0"

  const handleBudget = (e) => {
    e.preventDefault();
    const budgetValue = Number(budgetForm);
    if (!budgetValue || budgetValue < 0) {
      setMessage("It's not a valid budget");
      return;
    }
    setMessage("");

    dispatch(setIsValidBudgetAction(true));
    dispatch(setBudgetAction(budgetValue));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    // If the user types, remove "0" and allow number input
    if (value === "" || /^\d+$/.test(value)) {
      setBudgetForm(value === "0" ? "" : value); // Clear "0" only if user types
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor shadow-lg p-10 bg-white rounded-lg">
      <form onSubmit={handleBudget} className="formulario space-y-6">
        <div className="campo grid space-y-4 relative">
          <label className="text-blue-500 text-2xl text-center">
            Define Your Travel Budget
            <div className="tooltip hidden absolute z-10 left-1/2 transform -translate-x-1/2 mt-2 p-4 bg-gray-800 text-white text-sm rounded-md shadow-lg transition-opacity duration-300">
              Take the first step toward a memorable journey by setting your travel budget today! By doing so, you’ll pave the way for an enriching and enjoyable travel experience that aligns with your financial goals. Start planning, and let your travel dreams become a reality!
            </div>
          </label>
          <input
            type="number"
            min={0}
            className="nuevo-presupuesto bg-gray-200 rounded-lg p-4 text-2xl text-center focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Add your budget"
            value={budgetForm}
            onChange={handleInputChange}
            onFocus={() => setMessage("")} // Clear message on input focus
          />
        </div>

        <input
          type="submit"
          value="Add"
          className="bg-blue-800 text-white font-bold uppercase text-lg py-4 px-8 rounded-lg hover:bg-blue-900 cursor-pointer transition-colors duration-300"
        />

        {message && <Message type="error">{message}</Message>}
      </form>

      {/* Tooltip show on hover */}
      <style jsx>{`
        .campo:hover .tooltip {
          display: block; /* Show tooltip on hover */
        }
      `}</style>
    </div>
  );
};

export default NewBudget;
