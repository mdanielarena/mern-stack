import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Provider } from "react-redux";
import store from "./redux/store";
import { Container } from "reactstrap";

import MyNavbar from "./components/layouts/Navbar";
import ShoppingList from "./components/shop/ShoppingList";
import AddModal from "./components/shop/AddModal";

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <MyNavbar />
          <Container>
            <AddModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
