import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchField, requestRobots } from '../action';
import './App.css';

import Header from '../components/header'

const App = ({ store }) => {
  const [searchResults, setSearchResults] = useState([]);

  const text = useSelector(state => state.searchRobots.searchField);
  const robotsUsers = useSelector(state => state.getRobotsReducer.users);
  const dispatch = useDispatch();

  const onSearchChange = e => {
    dispatch(setSearchField(e.target.value));
  };

  useEffect(() => {
    dispatch(requestRobots());
  }, [dispatch]);

  useEffect(() => {
    let filteredRobots = robotsUsers.filter(robots => {
      return (robots.name.toLowerCase().includes(text.toLowerCase()))
    });
    setSearchResults(filteredRobots);
  }, [text, robotsUsers]);

  const newRobot = searchResults;

  return (
    <div className="tc">
      <Scroll>
        <Header />
        <SearchBox SearchChange={onSearchChange} />
      </Scroll>
      {text === '' ? (
        <CardList robots={robotsUsers} />
      ) : (
        <CardList robots={newRobot} />
      )}
    </div>
  );
};

export default App;
