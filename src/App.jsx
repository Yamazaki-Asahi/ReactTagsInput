import React from 'react';
import TagsInput from './tagsInput';
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <TagsInput />
            </header>
        </div>
    );
}

export default App;
