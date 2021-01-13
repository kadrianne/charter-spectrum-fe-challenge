import useFormField from '../hooks/useFormField';

const Search = () => {
    const [searchText, handleTextChange] = useFormField('');

    const handleSubmit = (event) => {
        event.preventDefault();
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