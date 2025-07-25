import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import './App.css'

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App 