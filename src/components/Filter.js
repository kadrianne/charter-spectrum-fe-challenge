import { useState } from 'react';

const Filter = ({ restaurants, setUpdatedRestaurants }) => {
    const [selectedState, setSelectedState] = useState('All');

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };

    const filterRestaurants = () => {
        const updatedRestaurants = restaurants.filter(
            (restaurant) => restaurant.state === selectedState
        );
        setUpdatedRestaurants(updatedRestaurants);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        selectedState === 'All'
            ? setUpdatedRestaurants(restaurants)
            : filterRestaurants();
    };

    const renderStates = () => {
        let states = restaurants.map((restaurant) => restaurant.state);
        let stateOptions = states.filter(
            (value, index, self) => self.indexOf(value) === index
        );
        stateOptions.sort();
        return ['All', ...stateOptions].map((state) => (
            <option key={state}>{state}</option>
        ));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label for="state-filter">By State: </label>
            <select
                id="state-filter"
                name="state"
                value={selectedState}
                onChange={handleStateChange}
            >
                {renderStates()}
            </select>
            <input type="submit" value="Filter" />
        </form>
    );
};

export default Filter;
