import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { AppContainer } from 'react-hot-loader';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
};

render(App);