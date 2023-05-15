import {useState, useEffect} from 'react';
import axios from "axios";
import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

import './App.css';
import MyTable from './components/MyTable';

function App() {
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState(0.0)
  const [category, setCategory] = useState("")
  const [expensesList, setExpensesList] = useState([])
  const [quote, setRandomQuote] = useState("")
  const quotes = ["Being rich is having money; being wealthy is having time — Margaret Bonanno", "The only man who never makes mistakes is the man who never does anything. ― Theodore Roosevelt", "A dream doesn't become reality through magic; it takes sweat, determination and hard work.” ― Colin Powell"]
  const getRandomQuote = () => {
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }

    const handleDescription = e => {
    setDescription(e.target.value)
  }

  const handleAmount = e => {
    setAmount(e.target.value)
  }

  const handleCategory = e => {
    setCategory(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    axios.post('http://127.0.0.1:5000/expenses', {
      description: description,
      amount: amount,
      category: category
    }).then((res) => {
      setExpensesList([...expensesList, res.data])
      setDescription('')
      setAmount(0.0)
      setCategory('')
    }).catch((err) => console.error(err.message))
  }

  const fetchExpenses = () => {
    axios.get('http://127.0.0.1:5000/expenses').then((res) => setExpensesList(res.data))
  }

  useEffect(() => {
    fetchExpenses()
    getRandomQuote()
  }, [])

  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid xs={7} direction="column">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <div className='expense-form-fields'>
              <TextField 
                onChange={handleDescription} 
                id="expense-description" 
                label="Description" 
                required
                size='small'
                variant='filled'
                value={description}
              /><br/><br/>
              <TextField 
                onChange={handleAmount} 
                id="expense-amount" 
                label="Amount" 
                required
                size='small'
                variant='filled'
                value={amount}
              /><br/><br/>
              {/* <InputLabel id="expense-category">Category</InputLabel> */}
              <Select
                id="expense-category"
                value={category}
                label="Category"
                variant="filled"
                onChange={handleCategory}
              >
                <MenuItem value="Housing">Housing</MenuItem>
                <MenuItem value="Groceries">Groceries</MenuItem>
                <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
                <MenuItem value="Utilities">Utilities</MenuItem>
                <MenuItem value="Savings">Savings</MenuItem>
                <MenuItem value="Food & Drink">Food & Drink</MenuItem>
              </Select><br/><br/>
            </div>
            <Button onClick={handleSubmit} variant="contained" size="submit">Submit</Button>
          </FormControl>
        </Grid>
        <Grid xs={5} direction="column">
          <Card>
            <CardContent>
              <Typography variant="h5" component="div"> 
                {quote}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <div className='expenses-table'>
        <h3>Expenses</h3>
        <MyTable expenses={expensesList} />
      </div>
    </div>
  );
}

export default App;
