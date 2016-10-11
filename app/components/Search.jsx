import { brown700, fullWhite, green600, yellow600 }
  from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Joi from 'joi';
import Paper from 'material-ui/Paper';
import React from 'react';
import TextField from 'material-ui/TextField';

const schema = Joi.object({
  location: Joi.alternatives()
  .try(Joi.string().required(), Joi.number().required())
  .error(new Error('Please provide a valid location.#location')),
  keyword: Joi.string()
    .allow('')
    .max(255)
    .error(new Error('Too many characters!#keyword'))
});

const Search = React.createClass({
  getInitialState() {
    return {
      search: {
        location: '',
        keyword: ''
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

  handleChange(event) {
    const nextSearch = Object.assign({}, this.state.search, {
      [event.target.name]: event.target.value
    });

    this.setState({ search: nextSearch });
  },

  handleSubmit() {
    const result = Joi.validate(this.state.search, schema, {
      abortEarly: false
    });

    if (result.error) {
      const parsedError = result.error.message.split('#');
      const nextErrors = {};

      nextErrors[parsedError[1]] = result.error.message;

      return this.setState({ errors: nextErrors });
    }

    this.props.searchRestaurants(
      this.state.search.location,
      this.state.search.keyword,
      4
    );
  },

  render() {
    const styleIcon = {
      largeIcon: {
        width: 150,
        height: 150
      },
      large: {
        width: 180,
        height: 180
      }
    };

    const styleLocation = {
      errorStyle: {
        color: '#FFFFFF'
      },
      underlineStyle: {
        borderColor: '#FFFFFF'
      },
      floatingLabelStyle: {
        color: '#FFFFFF',
        textShadow: '3px 3px 10px black'
      },
      floatingLabelFocusStyle: {
        color: '#FFFFFF'
      },
      inputStyle: {
        color: fullWhite,
        fontSize: '30px',
        textShadow: '3px 3px 4px grey'
      }
    };

    const styleCircle = {
      height: 180,
      width: 180,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
      backgroundColor: brown700
    };

    const styleError = {
      color: '#ffe004',
      position: 'absolute',
      top: '0.2rem',
      fontSize: '1rem',
      textShadow: '1px 1px 3px black',
      fontWeight: 800
    };

    const errors = this.state.errors;

    return <div>
      <img className="welcome" src="./images/welcome.png" />

      <Paper
        className="paperSearch lettuce"
        style={{ backgroundColor: green600 }}
        zDepth={3}
      >
        <TextField
          errorStyle={styleError}
          errorText={errors.location ? errors.location.split('#')[0] : ''}
          floatingLabelFocusStyle={styleLocation.floatingLabelFocusStyle}
          floatingLabelStyle={styleLocation.floatingLabelStyle}
          floatingLabelText="Location"
          hintStyle={{ color: 'white', textShadow: '3px 3px 10px black' }}
          hintText="City or Zip"
          inputStyle={styleLocation.inputStyle}
          name="location"
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          style={{ marginLeft: '40px' }}
          underlineFocusStyle={styleLocation.underlineStyle}
          underlineStyle={styleLocation.underlineStyle}
          value={this.state.search.location}
        />
      </Paper>

      <Paper
        className="cheeseSearch cheese"
        style={{ backgroundColor: yellow600 }}
        zDepth={3}
      >
        <TextField
          errorStyle={styleError}
          errorText={errors.keyword ? errors.keyword.split('#')[0] : ''}
          floatingLabelFocusStyle={styleLocation.floatingLabelFocusStyle}
          floatingLabelStyle={styleLocation.floatingLabelStyle}
          floatingLabelText="Keyword (optional)"
          hintStyle={{ color: 'white', textShadow: '3px 3px 10px black' }}
          hintText="Sushi, lunch, Mexican, etc."
          inputStyle={styleLocation.inputStyle}
          name="keyword"
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          style={{ marginLeft: '40px' }}
          underlineFocusStyle={styleLocation.underlineStyle}
          underlineStyle={styleLocation.underlineStyle}
          value={this.state.search.keyword}
        />
      </Paper>

      <div className="burgerBtn">
        <Paper circle={true} className="burger" style={styleCircle}zDepth={3} >
          <IconButton
            iconStyle={styleIcon.largeIcon}
            onTouchTap={this.handleSubmit}
            style={styleIcon.large}
            tooltip="Lets Go!"
            tooltipPosition="bottom-right"
            touch={true}
          >
            <div>
              <img className="searchBtn" src="./images/search.png" />
            </div>
          </IconButton>
        </Paper>
      </div>
    </div>;
  }
});

export default Search;
