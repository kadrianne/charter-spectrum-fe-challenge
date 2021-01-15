import { useState, useEffect } from 'react';
import Filter from './Filter';
import Search from './Search';
import useFormField from '../hooks/useFormField';

const SearchFilter = ({ restaurants, setUpdatedRestaurants }) => {
    const [searchedRestaurants, setSearchedRestaurants] = useState([...restaurants]);
    const [selectedState, handleStateChange] = useFormField('All');
    const [selectedGenre, handleGenreChange] = useFormField('All');
    const [filtersOn, setFiltersOn] = useState(false);
    const [searchText, handleTextChange] = useFormField('');

    const handleButtonToggle = () => setFiltersOn(!filtersOn);
    const handleSearchLogic = (restaurant) =>
        restaurant.name.toLowerCase().includes(searchText.toLowerCase()) ||
        restaurant.city.toLowerCase().includes(searchText.toLowerCase()) ||
        restaurant.genre.toLowerCase().includes(searchText.toLowerCase());

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
        setUpdatedRestaurants(searchedRestaurants.filter(handleFilterLogic()));
    };

    const searchFilterLogic = () => {
        setSearchedRestaurants(restaurants.filter(handleSearchLogic));
        setUpdatedRestaurants(restaurants.filter(handleSearchLogic));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        searchFilterLogic();
    };

    useEffect(() => {
        filtersOn
            ? selectedState === 'All' && selectedGenre === 'All'
                ? setUpdatedRestaurants(searchedRestaurants)
                : filterRestaurants()
            : setUpdatedRestaurants(searchedRestaurants);
    }, [filtersOn, searchedRestaurants, selectedState, selectedGenre]);

    return (
        <>
            <Search
                searchText={searchText}
                handleTextChange={handleTextChange}
                handleSubmit={handleSubmit}
            />
            {filtersOn ? (
                <>
                    <button className="button-toggle" onClick={handleButtonToggle}>
                        Hide Filters
                    </button>
                    <Filter
                        restaurants={restaurants}
                        selectedState={selectedState}
                        selectedGenre={selectedGenre}
                        handleStateChange={handleStateChange}
                        handleGenreChange={handleGenreChange}
                    />
                </>
            ) : (
                <button className="button-toggle" onClick={handleButtonToggle}>
                    Apply Filters
                </button>
            )}
        </>
    );
};

export default SearchFilter;
