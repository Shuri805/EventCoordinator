import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';

import {
  Header
} from './components';

const App = () => {
  const [userList, setUserList] = useState([]);

  return (
    <div id="App">
      <h1>Hello world</h1>
      <Header userList={ userList } />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
