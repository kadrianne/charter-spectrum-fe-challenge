import useFormField from '../hooks/useFormField';

const Search = ({ restaurants, setUpdatedRestaurants }) => {
    const [searchText, handleTextChange] = useFormField('');

    const handleSearchLogic = (restaurant) =>
        restaurant.name.toLowerCase().includes(searchText.toLowerCase()) ||
        restaurant.city.toLowerCase().includes(searchText.toLowerCase());
    // restaurant.genre.map((g) => g.toLowerCase().includes(searchText.toLowerCase()));
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        setUpdatedRestaurants(restaurants.filter(handleSearchLogic));
    };

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
