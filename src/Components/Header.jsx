import React from "react";

import BudgetControl from "./BudgetControl";
import NewBudget from "./NewBudget";

const Header = ({ isValidBudget }) => {
  return (
    <header>
      <h1>TravelTally</h1>
      {isValidBudget ? <BudgetControl /> : <NewBudget />}
    </header>
  );
};

export default Header;
