import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CloseButton from "../img/cerrar.svg";
import { setEditExpenseAction } from "../Redux/Reducers/ExpensesReducer";
import Message from "./Message";

const ModalWindow = ({
  setModal,
  animateModal,
  setAnimateModal,
  saveExpense,
  editExpense,
}) => {
  const dispatch = useDispatch();

  // Define states for trip budget fields
  const [id, setId] = useState("");
  const [name, setName] = useState(""); // Name of expense (airfare, lodging, etc.)
  const [amount, setAmount] = useState(""); // Amount for the specific category
  const [category, setCategory] = useState(""); // Trip category: airfare, lodging, etc.
  const [date, setDate] = useState(""); // Date of the trip
  const [message, setMessage] = useState(""); // Error message

  // Load existing trip expense if editing
  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setName(editExpense.name);
      setAmount(editExpense.amount);
      setCategory(editExpense.category);
      setId(editExpense.id);
      setDate(editExpense.date);
    }
  }, [editExpense]);

  // Function to hide the modal
  const hideModalWindow = () => {
    setAnimateModal(false);
    dispatch(setEditExpenseAction({})); // Reset editing state
    setTimeout(() => {
      setModal(false);
    }, 400);
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if ([name, amount, category].includes("")) {
      setMessage("All the fields are mandatory");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    // Save the trip-related expense
    saveExpense({ name, amount, category, id, date });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CloseButton} alt="close modal" onClick={hideModalWindow} />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`formulario ${animateModal ? "animar" : "cerrar"}`}
      >
        <legend>{editExpense.name ? "Edit Trip Expense" : "New Trip Expense"}</legend>

        {message && <Message type="error">{message}</Message>}

        <div className="campo">
          <label htmlFor="name">Expense Name</label>
          <input
            id="name"
            type="text"
            placeholder="E.g., Travel"
            maxLength={30}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">--Select a category--</option>
            <option value="airfare">Airfare</option>
            <option value="lodging">Lodging</option>
            <option value="activities">Activities</option>
            <option value="transportation">Transportation</option>
            <option value="meals">Meals</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
        </div>

        <div className="campo">
          <label htmlFor="date">Date of Expense</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value={editExpense.name ? "Save Changes" : "Add Expense"}
        />
      </form>
    </div>
  );
};

export default ModalWindow;
