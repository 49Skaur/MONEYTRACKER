import logo from './logo.svg';
import './App.css';
import 'antd/dist/reset.css'; // ✅ For minimal base styling
import { Button } from 'antd'
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import Test from './pages/Test';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>

          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/test' element={<ProtectedRoute><Test /></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

/*To protect unauthorized user to have access to protected pages */
export function ProtectedRoute(props) {

  if (localStorage.getItem('moneytracker-user')) {
    return props.children
  } else {
    return <Navigate to='/login' />
  }

}

export default App;
