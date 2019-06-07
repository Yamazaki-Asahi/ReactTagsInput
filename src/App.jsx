import React from 'react';
import TagsInput from './tagsInput';
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1>タグを入力</h1>
                <TagsInput />
            </header>
        </div>
    );
}

export default App;
