import React from 'react';
import Header from './components/Header';
import './styles/main.css';

function App() {
    return (
        <div className="App">
            <Header />
            <main>
                <h1>Welcome to wpa_tic_tac_toe</h1>
                <p>This is a Progressive Web Application.</p>
            </main>
        </div>
    );
}

export default App;