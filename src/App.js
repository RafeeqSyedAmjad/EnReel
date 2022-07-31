import './App.css';
import Signup from './Components/Signup'
import Login from './Components/Login'
import Feed from './Components/feed'
import Profile from './Components/Profile'
import PrivateRoute from './Components/PrivateRoute'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route
            path="/profile/:id"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Feed />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;