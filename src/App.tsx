import Rules from "./Components/Rules";
import store from "./store/store";
import { Provider } from "react-redux";
import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
      <Provider store={store}>
        <Rules/>
      </Provider>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App





