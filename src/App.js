
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import TodoContainer from './TodoContainer';

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<TodoContainer />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
