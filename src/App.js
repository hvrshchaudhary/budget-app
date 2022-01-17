import { Button, Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './App.css';
import AddBudgetModal from './components/AddBudgetModal';
import BudgetCard from './components/BudgetCard';
import { useState } from "react"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetContexts';
import AddExpenseModal from './components/AddExpenseModal';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import ViewExpenseModal from './components/ViewExpensesModal';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets , getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId){
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
  <>
  <Container className='my-4'>
    <Stack direction="horizontal" gap="2" className="mb-4">
      <h1 className='me-auto'>Budgets</h1>
      <Button variant='primary' onClick={() => setShowAddBudgetModal(true)}>Add Budgets</Button>
      <Button variant='outline-primary' onClick={openAddExpenseModal}>Add Expense</Button>
    </Stack>
    <div style={{display:"grid", gridTemplateColumns:"repeat(autofill,minmax(300px, 1fr))", gap:"1rem", alignItems: "flex-start" }}></div>
    {budgets.map(budget => {
      const amount= getBudgetExpenses(budget.id).reduce(
        (total, expense) => total + expense.amount,
        0
      )
      return(
      <BudgetCard 
      key={budget.id}
      name={budget.name}
      amount={amount} 
      max={budget.max}
      onAddExpenseClick={() => openAddExpenseModal(budget.id)}
      onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
    />
    )
})}
    <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal}
      onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
    
    />
    <TotalBudgetCard />

  </Container>
  <AddBudgetModal show={showAddBudgetModal} handleClose={() =>
  setShowAddBudgetModal(false)} />
  <AddExpenseModal show={showAddExpenseModal} 
  defaultBudgetId={addExpenseModalBudgetId}
  handleClose={() =>setShowAddBudgetModal(false)} 
  />
  <ViewExpenseModal 
  budgetId={viewExpensesModalBudgetId}
  handleClose={() =>setViewExpensesModalBudgetId()} 
  />  
  </>
  )
}

export default App;
