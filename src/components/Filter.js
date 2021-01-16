const Filter = ({
    restaurants,
    selectedState,
    selectedGenre,
    handleStateChange,
    handleGenreChange,
}) => {
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

    return (
        <div className="filter">
            <p>Filter By: </p>
            <label htmlFor="state-filter">State:</label>
            <select
                id="state-filter"
                name="state"
                value={selectedState}
                onChange={handleStateChange}
            >
                {renderStates()}
            </select>
            <label htmlFor="genre-filter">Genre:</label>
            <select
                id="genre-filter"
                name="genre"
                value={selectedGenre}
                onChange={handleGenreChange}
            >
                {renderGenres()}
            </select>
        </div>
    );
};

export default Filter;
