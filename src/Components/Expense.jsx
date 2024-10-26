import { formatDate } from "../helpers";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import expenseIcon from "../img/expense.svg";
import { useDispatch } from "react-redux";
import { setEditExpenseAction } from "../Redux/Reducers/ExpensesReducer";

const Expense = ({ expense, deleteExpense }) => {
  const { category, name, amount, id, date } = expense;
  const dispatch = useDispatch();

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          //AQUI
          dispatch(setEditExpenseAction(expense));
        }}
      >
        Edit
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => deleteExpense(id)}>
        Delete
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={expenseIcon} alt="expense icon" />
            <div className="descripcion-gasto">
              <p className="categoria">{category}</p>
              <p className="nombre-gasto">{name}</p>
              <p className="fecha-gasto">
                For date: <span>{formatDate(date)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${amount}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Expense;
