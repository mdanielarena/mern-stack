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
  NavLink,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../redux/actions/auth";
import { clearErrors } from "../../redux/actions/errors";

export class LoginModal extends Component {
  state = {
    modal: false,
    password: "",
    email: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  toggle = () => {
    this.props.clearErrors();
    this.setState({ modal: !this.state.modal });
  };

  //display errors on registermodal
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error.id !== prevProps.error.id) {
      //check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    //if authenticated then close modal
    if (this.state.modal && isAuthenticated) this.toggle();
  }

  onSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;
    const user = {
      email,
      password,
    };

    //attempt to login
    this.props.login(user);
  }

  render() {
    return (
      <div>
        <NavLink href="#" onClick={this.toggle}>
          Login
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit.bind(this)}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>
                <Label for="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>
                <Button color="dark" style={btnFormStyle} block>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const btnFormStyle = {
  marginTop: "2rem",
};

//get all states from reducers/index.js
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.errors,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
