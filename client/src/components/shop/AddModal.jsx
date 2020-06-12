import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { getItems, addItems } from "../../redux/actions/items";
import PropTypes from "prop-types";
export class AddModal extends Component {
  state = {
    modal: false,
    name: "",
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  toggle = () => this.setState({ modal: !this.state.modal });

  onSubmit(e) {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
    };

    this.props.addItems(newItem);
    this.state.modal = false;
  }

  render() {
    return (
      <div>
        <Button color="dark" style={btnStyle} onClick={this.toggle}>
          Add Item
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit.bind(this)}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Add Shopping Item"
                  onChange={this.onChange}
                ></Input>
                <Button color="dark" style={btnFormStyle} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

AddModal.propTypes = {
  addItems: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
};

const btnStyle = {
  marginBottom: "2rem",
};

const btnFormStyle = {
  marginTop: "2rem",
};

const gawingProps = (state) => ({
  items: state.items,
  tae: "tae",
});

export default connect(gawingProps, { getItems, addItems })(AddModal);
