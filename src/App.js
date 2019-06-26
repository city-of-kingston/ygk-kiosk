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
import Menu from './views/Menu';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';

library.add(
  faHome, faChevronRight
);

const supportsHistory = 'pushState' in window.history;

const mainMenuEntries = [
  // { label: 'Tourism Websites',
  //   path: undefined },
  // { label: 'Games',
  //   path: undefined },
  // { label: 'Something Else',
  //   path: undefined },
  { label: 'possible made here',
    labelStyle: { color: 'white', fontWeight: 'bold', fontFamily: 'Arial', fontSize: '90px' },
    iconStyle: { color: '#42c1af' },
    buttonStyle: { backgroundColor: '#4d4094' },
    path: '/possiblemadehere' },
  { label: 'YGK Airport Website',
    // iconStyle: { color: '#e6721b' },
    buttonStyle: { backgroundColor: '#5bcbdc' },
    path: 'kingstonairport' },
  { label: 'SE Ontario Website',
    buttonStyle: { backgroundColor: '#f0ede5' },
    iconStyle: { color: '#720d22' },
    path: 'seontario' },
  { label: 'Go Back', icon: 'home',
    path: '/', swap: false },
];

const routes = [
  { path: '/', Component: Landing, props: { variant: 0 } },
  { path: '/1', Component: Landing, props: { variant: 1 } },
  { path: '/2', Component: Landing, props: { variant: 2 } },
  { path: '/menu', Component: Menu,
    props: { menuEntries: mainMenuEntries } },
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
            <Component {...props} {...rest} in={match != null} />
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
