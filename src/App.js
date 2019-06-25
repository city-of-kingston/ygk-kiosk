import React from 'react';
import logo from './logo.svg';
import './App.css';

import BrowserRouter from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';

import Defs from './Defs';

import Landing from './views/Landing';
import Dashboard from './views/Dashboard';
import WebView from './views/WebView';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome } from '@fortawesome/free-solid-svg-icons';

library.add(
  faHome
);

const supportsHistory = 'pushState' in window.history;

const routes = [
  { path: '/', Component: Landing, props: { variant: 0 } },
  { path: '/1', Component: Landing, props: { variant: 1 } },
  { path: '/2', Component: Landing, props: { variant: 2 } },
  { path: '/dashboard', Component: Dashboard },
  { path: '/possiblemadehere', Component: WebView,
    props: { url: "https://possiblemadehere.org" }},
  { path: '/kingstonairport', Component: WebView,
    props: { url: "http://kingstonairport.ca" }},
  { path: '/seontario', Component: WebView,
    props: { url: "https://thegreatwaterway.com" }},
];

const App = () => (
  <BrowserRouter forceRefresh={!supportsHistory}
    basename={Defs.BASENAME}>
    {routes.map(({ path, Component, props }) => (
      <Route key={path} exact path={path}>
        {({ match, ...rest }) => (
          <CSSTransition
            in={match != null}
            timeout={1000}
            classNames="page"
            unmountOnExit
          >
            <Component {...props} {...rest} />
          </CSSTransition>
        )}
      </Route>
    ))}
    {/* This route is to grab the location so that the
        nested route won't get re-rendered when transitioning */}
    {/*<Route render={({ location }) => {
      const { pathname } = location;
      return (
        <TransitionGroup>
          <CSSTransition key={pathname}
            classNames="page"
            timeout={{ enter: 1000, exit: 1000 }}>
            <Route location={ location }
              render={() => (
                <Switch>
                  <Route path="/" exact component={ Dashboard } />
                  <Route path="/possiblemadehere"
                    component={ WebView("https://possiblemadehere.org") } />
                </Switch>
              )} />
          </CSSTransition>
        </TransitionGroup>
      );
    }} />*/}
  </BrowserRouter>
);

export default App;
