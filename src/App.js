import { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';

function App() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
            headers: {
                Authorization: 'Api-Key q3MNxtfep8Gt',
            },
        })
            .then((response) => response.json())
            .then(setRestaurants);
    }, []);

    return (
        <div className="App">
            <h1>Filter Restaurants</h1>
            <Table restaurants={restaurants} />
        </div>
    );
}

export default App;
