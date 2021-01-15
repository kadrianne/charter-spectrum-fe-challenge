import TableRow from './TableRow';

const Table = ({ restaurants }) => {
    const renderRestaurants = () => {
        return restaurants.map((restaurant) => {
            const cleanedRestaurant = {
                ...restaurant,
                genre: restaurant.genre.split(','),
            };
            return <TableRow key={restaurant.id} restaurant={cleanedRestaurant} />;
        });
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th className="name-column">Name</th>
                        <th className="city-column">City</th>
                        <th className="state-column">State</th>
                        <th className="phone-column">Phone #</th>
                        <th className="genre-column">Genres</th>
                    </tr>
                </thead>
                {restaurants.length > 0 && <tbody>{renderRestaurants()}</tbody>}
            </table>
            {restaurants.length === 0 && <p className="no-results">No results found.</p>}
        </>
    );
};

export default Table;
