// src/routes.js
import React from 'react'
import { Route, Router, IndexRoute, hashHistory } from 'react-router'
import Layout from './Layout.jsx';
import IndexPage from './IndexPage.jsx';
import PollPage from './PollPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="poll/:id" component={PollPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default class PollApp extends React.Component {
  render() {
    return (
      <Router history={hashHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
    );
  }
}