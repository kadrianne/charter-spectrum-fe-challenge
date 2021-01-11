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
                    <th>Name</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Phone #</th>
                    <th>Genres</th>
                </tr>
            </thead>
            <tbody>{renderRestaurants()}</tbody>
        </table>
    );
};

export default Table;
