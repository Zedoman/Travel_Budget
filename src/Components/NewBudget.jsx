import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setBudgetAction,
  setIsValidBudgetAction,
} from "../Redux/Reducers/ExpensesReducer";
import Message from "./Message";

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
        <legend className="text-3xl text-center text-blue-600 uppercase border-b-2 border-blue-600 pb-4">
          Define your budget
        </legend>

        <div className="campo grid space-y-4">
          <label className="text-blue-500 text-2xl text-center" htmlFor="">
            Define budget
          </label>
          <input
            type="number"
            min={0}
            className="nuevo-presupuesto bg-gray-200 rounded-lg p-4 text-2xl text-center focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Add your budget"
            value={budgetForm}
            onChange={handleInputChange}
          />
        </div>

        <input
          type="submit"
          value="Add"
          className="bg-blue-800 text-white font-bold uppercase text-lg py-4 px-8 rounded-lg hover:bg-blue-900 cursor-pointer transition-colors duration-300"
        />

        {message && <Message type="error">{message}</Message>}
      </form>
    </div>
  );
};

export default NewBudget;
