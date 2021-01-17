import { useState } from 'react';
import TableRow from './TableRow';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Table = ({ restaurants }) => {
    const [showModal, setShowModal] = useState(false);
    const [clickedRestaurant, setClickedRestaurant] = useState({});

    const onHide = () => setShowModal(false);

    const renderRestaurants = () => {
        return restaurants.map((restaurant) => {
            const cleanedRestaurant = {
                ...restaurant,
                genre: restaurant.genre.split(','),
            };
            return (
                <TableRow
                    key={restaurant.id}
                    restaurant={cleanedRestaurant}
                    setShowModal={setShowModal}
                    setClickedRestaurant={setClickedRestaurant}
                />
            );
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
            {clickedRestaurant.id && (
                <Modal
                    show={showModal}
                    onHide={onHide}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {clickedRestaurant.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="info">{clickedRestaurant.address1}</p>
                        <p className="info">
                            {clickedRestaurant.city}, {clickedRestaurant.state}{' '}
                            {clickedRestaurant.zip}
                        </p>
                        <p className="info">{clickedRestaurant.telephone}</p>
                        <a href={clickedRestaurant.website}>
                            {clickedRestaurant.website}
                        </a>
                        <p className="info">{clickedRestaurant.hours}</p>
                        <p className="info">
                            Attire: {clickedRestaurant.attire.toUpperCase()}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default Table;
