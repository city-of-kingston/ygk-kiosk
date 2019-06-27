import React from 'react';
import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import Defs from './Defs';

import Landing from './views/Landing';
import WebView from './views/WebView';
import ButtonMenu from './views/ButtonMenu';

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
    path: '/', swap: false, prev: true, triggersAnimation: true },
];

const routes = [
  { path: '/', Component: Landing, props: { variant: 0 } },
  { path: '/1', Component: Landing, props: { variant: 1 } },
  { path: '/2', Component: Landing, props: { variant: 2 } },
  { path: '/menu', Component: ButtonMenu,
    props: { menuEntries: mainMenuEntries } },
  { path: '/possiblemadehere', Component: WebView,
    props: { url: "https://possiblemadehere.org", title: 'Possible Made Here.' }},
  { path: '/kingstonairport', Component: WebView,
    props: { url: "http://kingstonairport.ca", title: 'YGK Airport' }},
  { path: '/seontario', Component: WebView,
    props: { url: "https://thegreatwaterway.com", title: 'South Eastern Ontario' }},
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
  </BrowserRouter>
);

export default App;
