import TableRow from './TableRow';

const Table = ({ restaurants }) => {
    const renderRestaurants = () => {
        return restaurants.map((restaurant) => (
            <TableRow key={restaurant.id} restaurant={restaurant} />
        ));
    };

    return (
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
            <tbody>{renderRestaurants()}</tbody>
        </table>
    );
};

export default Table;
