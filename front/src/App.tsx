import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { SignUp } from './signUp/signUp';
import Loading from './loading/loading';
import { Main } from './main/main';
import { Post } from './post/post';
import Board from './main/board';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/main" element={<Main />} />
          <Route path="/main/board/*" element={<Board />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
