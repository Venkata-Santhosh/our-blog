import { Outlet } from 'react-router-dom';
import { Buffer } from 'buffer';

import Header from './containers/Header';

import './App.scss';


function App() {
  window.Buffer = Buffer;

  return (
    <>
      <Header/>
      <Outlet/>
    </>
  );
}

export default App;
