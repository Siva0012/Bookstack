import './App.css'

//modules
import {BrowserRouter as Router , Route , Routes } from 'react-router-dom'


//routes
import UserRoutes from './Routes/UserRoutes'
import AdminRoutes from './Routes/AdminRoutes'

function App() {
 
  return (

      <Router>
        <Routes>
          <Route path='/*' element={<UserRoutes />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Routes>
      </Router>

  )
}

export default App
