import { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';

function App() {
    const [restaurants, setRestaurants] = useState([]);

    const compareAlphabeticallyByNameThenState = (a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
        if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
        if (a.name.toUpperCase() === b.name.toUpperCase()) {
            if (a.state.toUpperCase() > b.state.toUpperCase()) return 1;
            if (a.state.toUpperCase() < b.state.toUpperCase()) return -1;
            return 0;
        }
    };

    useEffect(() => {
        fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
            headers: {
                Authorization: 'Api-Key q3MNxtfep8Gt',
            },
        })
            .then((response) => response.json())
            .then((restaurants) => {
                setRestaurants(restaurants.sort(compareAlphabeticallyByNameThenState));
            });
    }, []);

    return (
        <div className="App">
            <h1>Filter Restaurants</h1>
            <Table restaurants={restaurants} />
        </div>
    );
}

export default App;
