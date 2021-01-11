const TableRow = ({ restaurant }) => {
    return (
        <tr>
            <td>{restaurant.name}</td>
            <td>{restaurant.city}</td>
            <td>{restaurant.state}</td>
            <td>{restaurant.telephone}</td>
            <td>{restaurant.genre}</td>
        </tr>
    );
};

export default TableRow;
