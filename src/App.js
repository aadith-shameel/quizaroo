import './App.css';
import Login from './Pages/login/LoginPage';
import SignUp from './Pages/signup/SignupPage';
import Quiz from './Pages/quiz/QuizPage';
import Score from './Pages/score/ScorePage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Typography } from '@mui/material';

function App() {
  return (
    <div className="App">
      <div className='app-title-div'>
        <Typography variant='h2' className='app-name'>Quizaroo</Typography>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/score' element={<Score />} />
          <Route path='/' element={<Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
