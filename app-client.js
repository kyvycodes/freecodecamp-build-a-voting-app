import React from 'react';
import ReactDOM from 'react-dom';
import PollApp from './front/components/PollApp.jsx';

window.onload = () => {
  ReactDOM.render(<PollApp />, document.getElementById('pollApp'));
};