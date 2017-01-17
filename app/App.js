import React from 'react';
import CollectionContainer from './containers/CollectionContainer.js';
import ReleaseContainer from './containers/ReleaseContainer.js';
import Container from './components/NavigationBar.js';
import RecordBagContainer from './containers/RecordBagContainer.js';
import { Router, Route, hashHistory } from 'react-router';

const App = () => (
  <Router history={hashHistory}>
    <Route path="/" component={Container}>
      <Route path="collection" component={CollectionContainer} />
      <Route path="collection/:release" component={ReleaseContainer} />
      <Route path="bag" component={RecordBagContainer} />
    </Route>
  </Router>
);

export default App;
