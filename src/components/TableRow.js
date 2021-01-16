const TableRow = ({ restaurant, setShowModal, setClickedRestaurant }) => {
    const handleClick = (event) => {
        setShowModal(true);
        setClickedRestaurant(restaurant);
    };

    return (
        <tr id={restaurant.id} onClick={handleClick}>
            <td>{restaurant.name}</td>
            <td>{restaurant.city}</td>
            <td>{restaurant.state}</td>
            <td>{restaurant.telephone}</td>
            <td>{restaurant.genre.join(', ')}</td>
        </tr>
    );
};

export default TableRow;
