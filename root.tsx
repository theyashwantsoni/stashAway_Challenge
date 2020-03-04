import * as React from 'react';
import {Provider} from 'react-redux';
import App from './App';
import configureStore from './src/state/store';

const store = configureStore();

export class Root extends React.Component<{}, void> {
  render(): JSX.Element|any {
    return (
    <Provider store = {store}>
      <App />
    </Provider>
    );
  }
}
export default Root;