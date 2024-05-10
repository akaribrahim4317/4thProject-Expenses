import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: ({ id }) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString;
      return [{ ...action.payLoad, id: id }, ...state];
    case "UPDATE":
      const updatebleExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payLoad.id
      );
      const updatedableExpense = state[updatebleExpenseIndex];
      const updatedItem = { ...updatedableExpense, ...action.payLoad.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatebleExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payLoad);
    default:
      state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payLoad: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payLoad: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payLoad: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
