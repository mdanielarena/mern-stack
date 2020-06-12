import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItems } from "../../redux/actions/items";
import PropTypes from "prop-types";

export class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems(); //store it to redux/ w/out this you cant
  }

  deleteItem(id) {
    this.props.deleteItems(id);
  }

  render() {
    const { items } = this.props.items;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.deleteItem.bind(this, _id)}
                  >
                    Delete
                  </Button>{" "}
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const btnStyle = {
  marginBottom: "2rem",
};

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
};

const gawingProps = (state) => ({
  items: state.items,
  tae: "tae",
});

export default connect(gawingProps, { getItems, deleteItems })(ShoppingList);
