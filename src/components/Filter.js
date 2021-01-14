import { useEffect } from 'react';
import useFormField from '../hooks/useFormField';

const Filter = ({ restaurants, searchedRestaurants, setUpdatedRestaurants }) => {
    const [selectedState, handleStateChange] = useFormField('All');
    const [selectedGenre, handleGenreChange] = useFormField('All');

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

    const filterRestaurants = (restaurantSet) => {
        setUpdatedRestaurants(restaurantSet.filter(handleFilterLogic()));
    };

    const allFilterLogic = (restaurantSet) => {
        selectedState === 'All' && selectedGenre === 'All'
            ? setUpdatedRestaurants(restaurantSet)
            : filterRestaurants(restaurantSet);
    };

    const checkForSearchedRestaurants = () => {
        searchedRestaurants.length > 0
            ? allFilterLogic(searchedRestaurants)
            : allFilterLogic(restaurants);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        checkForSearchedRestaurants();
    };

    const renderStates = () => {
        let states = restaurants.map((restaurant) => restaurant.state);
        let stateOptions = [...new Set(states.sort())];
        return ['All', ...stateOptions].map((state) => (
            <option key={state}>{state}</option>
        ));
    };

    const renderGenres = () => {
        let genres = restaurants.map((restaurant) => restaurant.genre.split(','));
        let genreOptions = [...new Set(genres.flat().sort())];
        return ['All', ...genreOptions].map((genre) => (
            <option key={genre}>{genre}</option>
        ));
    };

    useEffect(() => {
        if (selectedState === 'All') {
            checkForSearchedRestaurants();
        }
    }, [selectedState]);

    useEffect(() => {
        if (selectedGenre === 'All') {
            checkForSearchedRestaurants();
        }
    }, [selectedGenre]);

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="state-filter">By State:</label>
            <select
                id="state-filter"
                name="state"
                value={selectedState}
                onChange={handleStateChange}
            >
                {renderStates()}
            </select>
            <label htmlFor="genre-filter">By Genre:</label>
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
