import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Workouts from './pages/Workouts'
import Routines from './pages/Routines'
import RoutineDetails from './pages/RoutineDetails'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
        <Routes>
          <Route 
            path="/"
            element={<Home />}
          />
          <Route 
            path="/workouts"
            element={<Workouts />}
          />
          <Route 
            path="/routines"
            element={<Routines />} // Placeholder for routines page
            />
            <Route 
            path="routine/:id"
            element={<RoutineDetails />} // Placeholder for routine
            />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
