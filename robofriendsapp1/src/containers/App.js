import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchField, requestRobots } from '../action';
import './App.css';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  const text = useSelector(state => state.searchRobots.setSearchField);
  const robots = useSelector(state => state.requestRobots.robots);
  const dispatch = useDispatch();

  const onSearchChange = e => {
    dispatch(setSearchField(e.target.value));
  };

  useEffect(() => {
    dispatch(requestRobots());
  }, [dispatch]);

  useEffect(() => {
    let filteredRobots = robots.filter(robots => {
      return robots.name.toLowerCase().includes(text.toLowerCase());
    });
    setSearchResults(filteredRobots);
  }, [robots, text]);

  const newRobot = searchResults;

  return (
    <div className="tc">
      <Scroll>
        <h1 className="f2">RoboFriends</h1>
        <SearchBox SearchChange={onSearchChange} />
      </Scroll>
      {text === '' ? (
        <CardList robots={robots} />
      ) : (
        <CardList robots={newRobot} />
      )}
    </div>
  );
};

export default App;
