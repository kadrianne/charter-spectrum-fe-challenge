import { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import Filter from './components/Filter';
import Search from './components/Search';

function App() {
    const [restaurants, setRestaurants] = useState([]);
    const [sortedRestaurants, setSortedRestaurants] = useState([]);
    const [searchedRestaurants, setSearchedRestaurants] = useState([]);
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

    useEffect(() => {
        searchedRestaurants.length > 0 && setUpdatedRestaurants(searchedRestaurants);
    }, [searchedRestaurants]);

    return (
        <div className="App">
            <h1>Filter Restaurants</h1>
            <Search
                restaurants={sortedRestaurants}
                setUpdatedRestaurants={setUpdatedRestaurants}
                setSearchedRestaurants={setSearchedRestaurants}
            />
            <Filter
                restaurants={sortedRestaurants}
                searchedRestaurants={searchedRestaurants}
                setUpdatedRestaurants={setUpdatedRestaurants}
            />
            <Table restaurants={updatedRestaurants} />
        </div>
    );
}

export default App;
