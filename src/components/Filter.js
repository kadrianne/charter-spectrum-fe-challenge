import { useState } from 'react';

const Filter = ({ restaurants, setUpdatedRestaurants }) => {
    const [selectedState, setSelectedState] = useState('All');
    const [selectedGenre, setSelectedGenre] = useState('All');

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    const handleFilterLogic = () => {
        if (selectedState === 'All') {
            return (restaurant) => restaurant.genre.includes(selectedGenre);
        } else if (selectedGenre === 'All') {
            return (restaurant) => restaurant.state.includes(selectedState);
        } else {
            return (restaurant) =>
                restaurant.state.includes(selectedState) &&
                restaurant.genre.includes(selectedGenre);
        }
    };

    const filterRestaurants = () => {
        setUpdatedRestaurants(restaurants.filter(handleFilterLogic()));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        selectedState === 'All' && selectedGenre === 'All'
            ? setUpdatedRestaurants(restaurants)
            : filterRestaurants();
    };

    const renderStates = () => {
        let states = restaurants.map((restaurant) => restaurant.state);
        let stateOptions = [...new Set(states.sort())];
        return ['All', ...stateOptions].map((state) => (
            <option key={state}>{state}</option>
        ));
    };

    const renderGenres = () => {
        let genres = restaurants.map((restaurant) => restaurant.genre);
        let genreOptions = [...new Set(genres.flat().sort())];
        return ['All', ...genreOptions].map((genre) => (
            <option key={genre}>{genre}</option>
        ));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="state-filter">By State: </label>
            <select
                id="state-filter"
                name="state"
                value={selectedState}
                onChange={handleStateChange}
            >
                {renderStates()}
            </select>
            <label htmlFor="genre-filter">By Genre: </label>
            <select
                id="genre-filter"
                name="genre"
                value={selectedGenre}
                onChange={handleGenreChange}
            >
                {renderGenres()}
            </select>
            <input type="submit" value="Filter" />
        </form>
    );
};

export default Filter;
