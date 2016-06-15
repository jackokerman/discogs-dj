import React from 'react';
import CollectionList from './CollectionList.js';
import Release from './Release.js';
import Container from './Container.js';

import { Router, Route, hashHistory } from 'react-router';

const App = () => (
  <Router history={hashHistory}>
    <Route path="/" component={Container}>
      <Route path="collection" component={CollectionList} />
      <Route path="collection/:release" component={Release} />
    </Route>
  </Router>
);

export default App;
