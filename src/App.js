import { useState, useEffect } from 'react';
import './App.css';
import PaginatedTable from './components/PaginatedTable';
import SearchFilter from './components/SearchFilter';

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [sortedRestaurants, setSortedRestaurants] = useState([]);
    const [updatedRestaurants, setUpdatedRestaurants] = useState([]);

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
            .then(setRestaurants);
    }, []);

    useEffect(() => {
        const allRestaurantsSorted = [...restaurants].sort(
            compareAlphabeticallyByNameThenState
        );
        setSortedRestaurants(allRestaurantsSorted);
        setUpdatedRestaurants(allRestaurantsSorted);
    }, [restaurants]);

    return (
        <div className="App">
            <h1>Restaurants Galore!</h1>
            <SearchFilter
                restaurants={sortedRestaurants}
                setUpdatedRestaurants={setUpdatedRestaurants}
            />
            <PaginatedTable
                isLoaded={isLoaded}
                setIsLoaded={setIsLoaded}
                restaurants={updatedRestaurants}
            />
        </div>
    );
}

export default App;
