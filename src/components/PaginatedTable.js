import { useEffect, useState } from 'react';
import Table from './Table';
import loadingSpinner from '../assets/loading-spinner.svg';

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
        return pages.map((page) => (
            <button key={page} className="page-button" onClick={handleClick}>
                {page + 1}
            </button>
        ));
    };

    useEffect(() => {
        if (restaurants.length > 0) {
            paginateRestaurants();
        }
    }, [restaurants, currentPage]);

    useEffect(() => {
        paginatedRestaurants.length > 0 && setIsLoaded(true);
    }, [paginatedRestaurants]);

    return (
        <>
            {isLoaded ? (
                <>
                    <div className="pagination">
                        <p className="results">{restaurants.length} Results</p>
                        <div className="pages">Show Page: {displayAvailablePages()}</div>
                    </div>
                    <Table restaurants={paginatedRestaurants} />
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
