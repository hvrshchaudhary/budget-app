import React, { useContext } from 'react';
import {v4 as uuidV4} from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage';

const BudgetContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets() {
    return useContext(BudgetContext)
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }
    function addExpense({descreption, amount, budgetId}) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), descreption, amount, budgetId}]
        })

    }
    function addBudget({name, max}) {
        setBudgets(prevBudgets => {
        if (prevBudgets.find(budget => budget.name === name)) {
            return prevBudgets
        }
        
        return [...prevBudgets, { id: uuidV4(), name, max}]
        })
    }
    function deleteBudget({id}) {
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.Id !== id)

        })
    }
    function deleteExpense({id}) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.Id !== id)
            
        })
    }

    return (
        <BudgetContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}>{children}</BudgetContext.Provider>
    )
}