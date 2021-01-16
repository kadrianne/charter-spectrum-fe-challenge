import { useEffect, useState } from 'react';
import Table from './Table';
import loadingSpinner from '../assets/loading-spinner.svg';
import Pagination from 'react-bootstrap/Pagination';

const PaginatedTable = ({ isLoaded, setIsLoaded, restaurants }) => {
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
        return (
            <Pagination>
                {pages.map((page) => (
                    <Pagination.Item
                        key={page}
                        onClick={handleClick}
                        active={page === currentPage}
                    >
                        {page + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        );
    };

    useEffect(() => {
        paginateRestaurants();
    }, [restaurants, currentPage]);

    useEffect(() => {
        paginatedRestaurants.length > 0 && setIsLoaded(true);
    }, [paginatedRestaurants]);

    return (
        <>
            {isLoaded ? (
                <>
                    <Table restaurants={paginatedRestaurants} />
                    <div className="pagination-results">
                        <p className="results">{restaurants.length} Results</p>
                        {restaurants.length > 0 && (
                            <div className="pages">{displayAvailablePages()}</div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <p className="loading">LOADING...</p>
                    <img src={loadingSpinner} alt="loading icon" />
                </>
            )}
        </>
    );
};

export default PaginatedTable;
