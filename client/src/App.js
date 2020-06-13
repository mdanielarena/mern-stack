import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Provider } from "react-redux";
import store from "./redux/store";
import { Container } from "reactstrap";

import MyNavbar from "./components/layouts/Navbar";
import ShoppingList from "./components/shop/ShoppingList";
import AddModal from "./components/shop/AddModal";

import { loadUser } from "./redux/actions/auth";

export class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
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
