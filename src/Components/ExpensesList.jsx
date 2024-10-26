import { useSelector } from "react-redux";
import Expense from "./Expense";

const ExpensesList = ({ deleteExpense, filter }) => {
  const expenses = useSelector((state) => state.expenses.expenses);
  const filteredExpenses = useSelector(
    (state) => state.expenses.filteredExpenses
  );

  return (
    <div className="listado-gastos contenedor">
      {filter ? (
        <>
          <h2>
            {filteredExpenses.length ? "Expenses" : "There are no expenses yet"}
          </h2>
          {filteredExpenses.map((expense) => (
            <Expense
              key={expense.id}
              expense={expense}
              deleteExpense={deleteExpense}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{expenses.length ? "Expenses" : "There are no expenses yet"}</h2>
          {expenses.map((expense) => (
            <Expense
              key={expense.id}
              expense={expense}
              deleteExpense={deleteExpense}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ExpensesList;
