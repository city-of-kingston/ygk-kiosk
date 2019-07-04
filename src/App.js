import React from 'react';
import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import Defs from './Defs';

import Landing from './views/Landing';
import WebView from './views/WebView';
import ButtonMenu from './views/ButtonMenu';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faChevronRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

library.add(
  faHome, faChevronRight, faSignOutAlt
);

const supportsHistory = 'pushState' in window.history;

const mainMenuEntries = [
  { label: 'Visit Kingston',
    borderColor: '#cf4c27', backgroundColor: 'rgba(68, 54, 53, 0.5)',
    desc: 'Experience Kingston’s vibrant culture and find out what makes the Limestone City one of Canada’s most popular destinations.',
    path: '/visitkingston' },

  { label: 'YGK Airport',
    borderColor: '#00918a', backgroundColor: 'rgba(77, 77, 79, 0.5)',
    desc: 'Navigate the fascinating history and modern amenities of our brand new airport.',
    path: '/kingstonairport' },

  { label: 'Possible Made Here', fullWidth: true,
    borderColor: '#842269', backgroundColor: 'rgba(63, 43, 86, 0.5)',
    desc: 'Discover the possibility and advantage of building your life in Kingston.',
    path: '/possiblemadehere' },

  // { label: 'Kingston Economic Development', fullWidth: true,
  //   borderColor: '#ac0940', backgroundColor: 'rgba(76, 48, 65, 0.5)',
  //   desc: 'Find out how Kingston’s strategic location, state-of-the-art infrastructure, and diverse workforce can benefit your business.',
  //   path: '/kedco' },

  { label: 'South Eastern Ontario', fullWidth: false,
    borderColor: '#00918a', backgroundColor: 'rgba(77, 77, 79, 0.5)',
    desc: 'Discover enchanting villages, endless beaches, and award-winning wineries nestled along the shores of our region’s majestic waterways.',
    path: '/seontario' },

  { label: 'The City of Kingston', fullWidth: false,
    borderColor: '#ee365f', backgroundColor: 'rgba(76, 48, 65, 0.5)',
    desc: 'Learn about life in Kingston and discover the exciting initiatives that make our city a leader in smart and sustainable living.',
    path: '/cityofkingston' },
  // { label: 'Go Back', icon: 'home',
  //   path: '/', swap: false, prev: true, triggersAnimation: true },
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
    props: { url: "https://kingstonairport.ca", title: 'YGK Airport' }},
  { path: '/seontario', Component: WebView,
    props: { url: "https://thegreatwaterway.com", title: 'South Eastern Ontario' }},
  { path: '/visitkingston', Component: WebView,
    props: { url: "https://www.visitkingston.ca/", title: 'Visit Kingston' }},
  { path: '/kedco', Component: WebView,
    props: { url: "https://www.kingstonecdev.com/invest", title: 'Kingston Economic Development' }},
  { path: '/cityofkingston', Component: WebView,
    props: { url: "https://www.cityofkingston.ca/", title: 'City of Kingston' }},
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
