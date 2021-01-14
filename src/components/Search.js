import { useEffect } from 'react';
import useFormField from '../hooks/useFormField';

const Search = ({ restaurants, setUpdatedRestaurants, setSearchedRestaurants }) => {
    const [searchText, handleTextChange] = useFormField('');

    const handleSearchLogic = (restaurant) =>
        restaurant.name.toLowerCase().includes(searchText.toLowerCase()) ||
        restaurant.city.toLowerCase().includes(searchText.toLowerCase()) ||
        restaurant.genre.toLowerCase().includes(searchText.toLowerCase());

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchedRestaurants(restaurants.filter(handleSearchLogic));
    };

    useEffect(() => {
        if (searchText === '') {
            setSearchedRestaurants(restaurants);
        }
    }, [searchText]);

    return (
        <form onSubmit={handleSubmit}>
            <label style={{ display: 'none' }} htmlFor="search-field">
                Search:
            </label>
            <input
                id="search-field"
                name="search"
                type="text"
                placeholder="Search by name, city, or genre"
                value={searchText}
                onChange={handleTextChange}
            />
            <input type="submit" value="Search" />
        </form>
    );
};

export default Search;
