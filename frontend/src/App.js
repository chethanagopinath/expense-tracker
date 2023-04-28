import {useState, useEffect} from 'react';
import axios from "axios";

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
      <section>
        <form onSubmit={handleSubmit}>
          {/* description, amount and category  */}
          <label htmlFor="description">Description</label>
          <input
            onChange={handleDescription} 
            type="text"
            name="description"
            id="description"
            value={description}
          />
          <label htmlFor="amount">Amount</label>
          <input
            onChange={handleAmount}
            type="number"
            name="amount"
            id="amount"
            value={amount}
          />
          <label htmlFor="category">Category</label>
          <input 
            onChange={handleCategory}
            type="text"
            name="category"
            id="category"
            value={category}
          />
          <button type="submit">Submit</button>
        </form>
        <div>
          
        </div>
      </section>
      <section>
        <h3>Expenses</h3>
        <MyTable expenses={expensesList} />
      </section>
    </div>
  );
}

export default App;
