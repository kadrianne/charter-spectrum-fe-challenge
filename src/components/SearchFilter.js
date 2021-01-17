import { useState, useEffect } from 'react';
import Filter from './Filter';
import Search from './Search';
import useFormField from '../hooks/useFormField';
import Button from 'react-bootstrap/Button';

const SearchFilter = ({ restaurants, setUpdatedRestaurants, setCurrentPage }) => {
    const [searchedRestaurants, setSearchedRestaurants] = useState([]);
    const [selectedState, handleStateChange, setSelectedState] = useFormField('All');
    const [selectedGenre, handleGenreChange, setSelectedGenre] = useFormField('All');
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
        setCurrentPage(0);
        searchFilterLogic();
    };

    useEffect(() => {
        setSearchedRestaurants([...restaurants]);
    }, [restaurants]);

    useEffect(() => {
        selectedState === 'All' && selectedGenre === 'All'
            ? setUpdatedRestaurants(searchedRestaurants)
            : filterRestaurants();
    }, [searchedRestaurants, selectedState, selectedGenre]);

    useEffect(() => {
        if (!filtersOn) {
            setUpdatedRestaurants(searchedRestaurants);
            setSelectedState('All');
            setSelectedGenre('All');
        }
    }, [filtersOn]);

    useEffect(() => {
        if (searchText === '') {
            setSearchedRestaurants(restaurants);
        }
    }, [searchText]);

    useEffect(() => {
        setCurrentPage(0);
    }, [selectedState, selectedGenre]);

    return (
        <div className="search-filter">
            <Search
                searchText={searchText}
                handleTextChange={handleTextChange}
                handleSubmit={handleSubmit}
            />
            {filtersOn && (
                <Filter
                    restaurants={restaurants}
                    selectedState={selectedState}
                    selectedGenre={selectedGenre}
                    handleStateChange={handleStateChange}
                    handleGenreChange={handleGenreChange}
                />
            )}
            <Button
                size="sm"
                variant="outline-primary"
                className="button-toggle"
                onClick={handleButtonToggle}
            >
                {filtersOn ? 'Clear' : 'Add'} Filters
            </Button>
        </div>
    );
};

export default SearchFilter;
