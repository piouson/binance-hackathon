import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../components/header/Header';
import { ErrorBoundary } from '../components';
import NinjaButton, { NinjaButtonSec, NinjaButtonTer } from '../components/button/NinjaButton';
import { withStyles } from '@material-ui/core';
import { globalStyle } from '../utils/global';
import SignupModal from '../components/modal/Modal';
import EmojiCarousel from '../components/carousel/Carousel';
import Home from '../components/home/Home';
import Login from '../components/login/Login';
import Todo from '../components/todo/Todo';

function App() {
  const [show, setShowModal] = useState(false);
  const stravaOAuth =
    process.env.REACT_APP_STRAVA_API_AUTH_URL ||
    process.env.STRAVA_API_AUTH_URL;

  return (
    <ErrorBoundary>
      <CssBaseline />
      <Header />
      <Router>
        <Switch>
          <Route path="/todos">
            <Todo />
          </Route>
          <Route path="/playground">
            <NinjaButton text="Primary Button" />
            <NinjaButtonSec text="Secondary Button" />
            <NinjaButtonTer
              text="Tertiary Button"
              onClick={() => setShowModal(!show)}
            />
            <SignupModal show={show} onShow={() => setShowModal(!show)} />
            <EmojiCarousel />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route
            path="/auth"
            component={() => {
              window.location.href = stravaOAuth;
              return null;
            }}
          />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}

export default withStyles(globalStyle)(App);
