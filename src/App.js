import React from "react";
//core components
import ProductTable from "./pages/product/ProductTable";
//redux
import store from "./store/rootStore";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <Provider store={store}>
    <ProductTable />
    <ToastContainer />
  </Provider>
);

export default App;
