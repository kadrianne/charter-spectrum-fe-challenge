import { useEffect, useState } from 'react';
import Table from './Table';

const PaginatedTable = ({ restaurants }) => {
    const [paginatedRestaurants, setPaginatedRestaurants] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const paginateRestaurants = () => {
        const lowerBoundary = 10 * currentPage;
        const upperBoundary = lowerBoundary + 10;
        setPaginatedRestaurants(restaurants.slice(lowerBoundary, upperBoundary));
    };

    const handleClick = (event) => {
        setCurrentPage(event.target.textContent - 1);
    };

    const displayAvailablePages = () => {
        const pages = Array.from(Array(Math.ceil(restaurants.length / 10)).keys());
        return pages.map((page) => (
            <button key={page} onClick={handleClick}>
                {page + 1}
            </button>
        ));
    };

    useEffect(() => {
        if (restaurants.length > 0) {
            paginateRestaurants();
        }
    }, [restaurants, currentPage]);

    return (
        <>
            <p>{restaurants.length} Results</p>
            <div className="pages">{displayAvailablePages()}</div>
            <Table restaurants={paginatedRestaurants} />
        </>
    );
};

export default PaginatedTable;
