/* eslint-disable react/jsx-no-bind*/

import { browserHistory, withRouter } from 'react-router';
import { red700, yellow600 } from 'material-ui/styles/colors';
import Dissatisfied
  from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import Joi from 'joi';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import Satisfied from 'material-ui/svg-icons/social/sentiment-satisfied';
import TextField from 'material-ui/TextField';
import axios from 'axios';

const schema = Joi.object({
  email: Joi.string()
    .trim()
    .email()
    .error(new Error('Please enter a valid email.#email')),
  password: Joi.string()
    .trim()
    .min(8)
    .error(new Error('8 characters, remember?#password'))
});

const Login = React.createClass({
  getInitialState() {
    return {
      login: {
        email: '',
        password: ''
      },
      errors: {}
    };
  },

  handleBlur(event) {
    const { name, value } = event.target;
    const nextErrors = Object.assign({}, this.state.errors);
    const result = Joi.validate({ [name]: value }, schema);

    if (result.error) {
      nextErrors[name] = result.error.message;

      return this.setState({ errors: nextErrors });
    }

    delete nextErrors[name];

    this.setState({ errors: nextErrors });
  },

  handleTextChange(event) {
    const nextLogin = Object.assign({}, this.state.login, {
      [event.target.name]: event.target.value
    });

    this.setState({ login: nextLogin });
  },

  handleLogin() {
    const result = Joi.validate(this.state.login, schema, {
      abortEarly: false,
      allowUnknown: true
    });

    if (result.error) {
      const parsedError = result.error.message.split('#');
      const nextErrors = {};

      nextErrors[parsedError[1]] = result.error.message;

      return this.setState({ errors: nextErrors });
    }

    const login = this.state.login;

    axios.post('/api/token', login)
    .then(() => {
      browserHistory.push('/');
      this.props.setToast(true, 'Login successful!');
    })
    .catch((err) => {
      this.props.setToast(
        true,
        `Whoops! ${err.response.data}`
      );
    });
  },

  render() {
    const styleRaisedButton = {
      marginLeft: '1rem',
      marginRight: '1rem',
      marginTop: '20px'
    };

    const stylePassword = {
      errorStyle: {
        position: 'absolute',
        top: '0.1rem',
        zIndex: -1,
        color: red700
      },
      underlineStyle: {
        borderColor: red700
      },
      floatingLabelStyle: {
        color: red700
      },
      floatingLabelFocusStyle: {
        color: red700
      }
    };

    const styleEmail = {
      errorStyle: {
        position: 'absolute',
        top: '0.1rem',
        zIndex: -1,
        color: yellow600
      },
      underlineStyle: {
        borderColor: yellow600
      },
      floatingLabelStyle: {
        color: yellow600
      },
      floatingLabelFocusStyle: {
        color: yellow600
      }
    };

    const errors = this.state.errors;

    return <div>
      <img className="login" src="./images/login.jpg" />
      <div>
        <Paper circle={true} className="mustard loginForm" />
        <TextField
          className="loginTextField"
          errorStyle={styleEmail.errorStyle}
          errorText={errors.email ? errors.email.split('#')[0] : ''}
          floatingLabelFocusStyle={styleEmail.floatingLabelFocusStyle}
          floatingLabelStyle={styleEmail.floatingLabelStyle}
          floatingLabelText="Email"
          name="email"
          onBlur={this.handleBlur}
          onChange={this.handleTextChange}
          underlineFocusStyle={styleEmail.underlineStyle}
          underlineStyle={styleEmail.underlineStyle}
        />
      </div>

      <div>
        <Paper circle={true} className="ketchup loginForm" />
        <TextField
          className="loginTextField"
          errorStyle={stylePassword.errorStyle}
          errorText={errors.password ? errors.password.split('#')[0] : ''}
          floatingLabelFocusStyle={stylePassword.floatingLabelFocusStyle}
          floatingLabelStyle={stylePassword.floatingLabelStyle}
          floatingLabelText="Password"
          name="password"
          onBlur={this.handleBlur}
          onChange={this.handleTextChange}
          type="password"
          underlineFocusStyle={stylePassword.underlineStyle}
          underlineStyle={stylePassword.underlineStyle}
        />
      </div>

      <div className="loginBackground" />
      <div className="raisedBtn">
        <RaisedButton
          icon={<Satisfied />}
          label="Login"
          onTouchTap={this.handleLogin}
          style={styleRaisedButton}
        />

        <RaisedButton
          icon={<Dissatisfied />}
          label="Cancel"
          onTouchTap={() => browserHistory.push('/search')}
          style={styleRaisedButton}
        />
      </div>
    </div>;
  }
});

export default withRouter(Login);
