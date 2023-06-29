import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import CreateQuote from './components/CreateQuote';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import OtherUserProfile from './components/OtherUserProfile';
import NavBar from './components/NavBar';
const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/create" element={<CreateQuote />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/profile/:userid" element={<OtherUserProfile />} />
      </Routes>
    </>
  )
}
export default App;
