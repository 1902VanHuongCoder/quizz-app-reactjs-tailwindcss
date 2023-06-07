import { Route, Routes } from 'react-router-dom'
import Home from './component/Home'
import './App.css'
import Quizz from './component/Quizz'
import Result  from './component/Result'

function App() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/result' element={<Result />}></Route>
          <Route path='/quiz/:level' element={<Quizz />}></Route>
        </Routes>
    </div>
  )
}

export default App
