/* eslint-disable react/jsx-no-bind*/
import { brown700, green700, yellow600 }
  from 'material-ui/styles/colors';
import { browserHistory, withRouter } from 'react-router';
import Checkbox from 'material-ui/Checkbox';
import Dissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import Satisfied from 'material-ui/svg-icons/social/sentiment-satisfied';
import SelectField from 'material-ui/SelectField';
import axios from 'axios';

const Preferences = React.createClass({
  getInitialState() {
    return {
      preferences: {
        categories: [],
        disabled: [],
        minRating: 1,
        searchRadius: 2
      }
    };
  },

  componentWillMount() {
    axios.get('/api/users')
    .then((res) => {
      this.setState({ preferences: res.data });
    })
    .catch((err) => {
      this.props.setToast(
        true,
        `Whoops! ${err}.`
      );
    });
  },

  handleRatingChange(event, index, value) {
    const nextPref = Object.assign({}, this.state.preferences, {
      minRating: value
    });

    this.setState({ preferences: nextPref });
  },

  handleRadiusChange(event, index, value) {
    const nextPref = Object.assign({}, this.state.preferences, {
      searchRadius: value
    });

    this.setState({ preferences: nextPref });
  },

  handleCheck(num) {
    const newDisabled = this.state.preferences.disabled.concat();
    const index = newDisabled.indexOf(num);

    if (index >= 0) {
      newDisabled.splice(index, 1);
    }
    else {
      newDisabled.push(num);
    }
    const newPreferences = Object.assign(
      {},
      this.state.preferences,
      { disabled: newDisabled }
    );

    this.setState({ preferences: newPreferences });
  },

  handleSave() {
    axios.patch('/api/users', this.state.preferences)
    .then(() => {
      browserHistory.push('/');
      this.props.setToast(true, 'Preferences updated!');
    })
    .catch((err) => {
      this.props.setToast(
        true,
        `Whoops! ${err}.`
      );
    });
  },

  render() {
    const rating = [
      <MenuItem key={1} primaryText="1.0" value={1} />,
      <MenuItem key={2} primaryText="2.0" value={2} />,
      <MenuItem key={3} primaryText="3.0" value={3} />,
      <MenuItem key={4} primaryText="4.0" value={4} />
    ];

    const items = [
      <MenuItem key={1} primaryText="1 mile" value={1} />,
      <MenuItem key={2} primaryText="2 miles" value={2} />,
      <MenuItem key={3} primaryText="3 miles" value={3} />
    ];

    const styleRaisedButton = {
      marginTop: '20px',
      marginLeft: '1rem',
      marginRight: '1rem'
    };

    const styleSelect = {
      customWidth: {
        width: 151
      }
    };

    return <div className="prefContainer">
      <img className="preferences" src="./images/preferences.jpg" />
      <h4
        className="prefSelect"
        style={{
          marginLeft: '10px',
          marginBottom: '5px',
          color: green700,
          textDecoration: 'underline'
        }}
      >Do Not Show Me:
      </h4>
      <div className="container">
        {this.state.preferences.categories.map((element) => {
          return <div className="item" key={element.id}>
            <Checkbox
              checked={this.state.preferences.disabled.includes(element.id)}
              iconStyle={{ borderColor: 'red' }}
              label={element.name.split(' ').join('')}
              onTouchTap={() => this.handleCheck(element.id)}
            />
          </div>;
        })}
      </div>

      <Divider style={{ marginTop: '10px' }} />

      <div style={{ display: 'inline-block', marginTop: '5px' }}>
        <div style={{ display: 'inline-block', marginLeft: '10px' }}>
          <h4
            className="prefSelect"
            style={{
              color: yellow600,
              textDecoration: 'underline',
              textShadow: 'black 0px 0px 0px',
              fontSize: '15px',
              fontWeight: '800',
              letterSpacing: '1px'
            }}
          >Minimum Rating:
          </h4>
          <SelectField
            floatingLabelText="Minimum Yelp Rating"
            name="minRating"
            onChange={this.handleRatingChange}
            style={styleSelect.customWidth}
            value={this.state.preferences.minRating}
          >
            {rating}
          </SelectField>
        </div>
        <div style={{ display: 'inline-block', marginLeft: '55px' }}>
          <h4
            className="prefSelect"
            style={{
              color: brown700,
              textDecoration: 'underline',
              textShadow: 'black 0px 0px 0px',
              fontSize: '15px'
            }}
          >Search Radius:
          </h4>
          <SelectField
            floatingLabelText="Search Radius"
            name="searchRadius"
            onChange={this.handleRadiusChange}
            style={styleSelect.customWidth}
            value={this.state.preferences.searchRadius}
          >
            {items}
          </SelectField>
        </div>
      </div>

      <Divider style={{ marginTop: '10px' }} />

      <div className="raisedBtn">
        <RaisedButton
          icon={<Satisfied />}
          label="Save"
          onTouchTap={this.handleSave}
          style={styleRaisedButton}
        />

        <RaisedButton
          icon={<Dissatisfied />}
          label="Cancel"
          onTouchTap={() => browserHistory.push('/')}
          style={styleRaisedButton}
        />
      </div>
    </div>;
  }
});

export default withRouter(Preferences);
