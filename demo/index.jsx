import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Demo from './component';
import './styles.scss';

export function renderApp(RootComponent) {
  const target = document.getElementById('react');

  /* istanbul ignore if */
  if (target) {
    ReactDOM.render(
      <AppContainer>
        <RootComponent />
      </AppContainer>,
      target
    );
  }
}

renderApp(Demo);

/* istanbul ignore next  */
if (module.hot) {
  module.hot.accept(
    './component',
    () => renderApp(require('./component').default)
  );
}
