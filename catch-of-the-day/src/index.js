import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './css/style.css';
import App from './components/App';
import NotFound from './components/NotFound';
import StorePicker from './components/StorePicker';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={StorePicker} />
        <Route path="/store/:storeId" component={App} />
        <Route component={NotFound} />
      </div>
    </BrowserRouter>
  );
};

render(<Root />, document.querySelector('#main'));
