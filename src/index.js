import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import { BudgetsProvider } from "./contexts/BudgetContexts";

ReactDOM.render(
    <BudgetsProvider>
    <App />
    </BudgetsProvider>,
  document.getElementById('root')
);

reportWebVitals();
