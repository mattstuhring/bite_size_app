/* eslint-disable react/jsx-no-bind*/
import { BottomNavigation, BottomNavigationItem }
from 'material-ui/BottomNavigation';
import { browserHistory, withRouter } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Help from 'material-ui/svg-icons/action/help';
import LocalDining from 'material-ui/svg-icons/maps/restaurant';
import Paper from 'material-ui/Paper';
import Person from 'material-ui/svg-icons/action/account-circle';
import PersonAdd from 'material-ui/svg-icons/content/add-circle';
import PowerSettings from 'material-ui/svg-icons/action/power-settings-new';
import React from 'react';
import ResultModal from 'components/ResultModal';
import Settings from 'material-ui/svg-icons/action/settings';
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios';
import { green800 } from 'material-ui/styles/colors';

const App = React.createClass({
  getInitialState() {
    return {
      restaurants: [],
      position: {
        start: 0,
        end: 4
      },
      modal: {
        open: false,
        restaurant: {}
      },
      toast: {
        open: false,
        message: ''
      }
    };
  },

  componentWillMount() {
    if (window.localStorage.restaurants) {
      const savedRestaurants = JSON.parse(window.localStorage.restaurants);

      this.setState({ restaurants: savedRestaurants });
    }
  },

  setModal(restaurant) {
    const newModal = Object.assign(
      {},
      this.state.modal,
      { open: true, restaurant }
    );

    this.setState({ modal: newModal });
  },

  closeModal() {
    const newModal = Object.assign(
      {},
      this.state.modal,
      { open: false, restaurant: {}}
    );

    this.setState({ modal: newModal });
  },

  setToast(state, message) {
    const newToast = Object.assign(
      {},
      this.state.toast,
      { open: state, message });

    this.setState({ toast: newToast });
  },

  searchRestaurants(location, term, displayNumber) {
    const search = { location, term, displayNumber };

    axios.get('/api/search', { params: search })
    .then((res) => {
      this.setState({
        restaurants: res.data.restaurants,
        position: { start: 0, end: 4 }
      });
      window.localStorage.restaurants = JSON.stringify(res.data.restaurants);
      browserHistory.push('/results');
    })
    .catch((err) => {
      this.setToast(
        true,
        `Whoops! ${err.response.data}`
      );
    });
  },

  nextRestaurants() {
    let newStart = this.state.position.start;
    let newEnd = this.state.position.end;
    const resArr = this.state.restaurants;

    if (newEnd > resArr.length - 1) {
      newStart = 0;
      newEnd = 4;
    }
    else if (newEnd + 4 > resArr.length - 1) {
      newEnd = resArr.length;
      newStart += 4;
    }
    else {
      newStart += 4;
      newEnd += 4;
    }

    const newPostion = Object.assign(
      {},
      this.state.position,
      { start: newStart, end: newEnd }
    );

    this.setState({ position: newPostion });
  },

  handleLogOut() {
    axios.delete('api/token')
    .then(() => {
      browserHistory.push('/');
      this.setToast(true, 'Logged out!');
    })
    .catch((err) => {
      this.props.setToast(
        true,
        `Whoops! ${err}.`
      );
    });
  },

  render() {
    const styleBottomNav = {
      position: 'fixed',
      bottom: 0,
      zIndex: 999
    };

    const styleBottonIcon = {
      margin: '0 auto'
    };

    const pathLoc = (this.props.routes[1].path || '');

    const navArray = [
      <BottomNavigationItem
        icon={<Person
          color={pathLoc === '/login' ? green800 : ''}
          style={styleBottonIcon}
        />}
        key="login"
        label="Login"
        onTouchTap={() => browserHistory.push('/login')}
      />,
      <BottomNavigationItem
        icon={<PersonAdd
          color={pathLoc === '/registration' ? green800 : ''}
          style={styleBottonIcon}
        />}
        key="new"
        label="New User"
        onTouchTap={() => browserHistory.push('/registration')}
      />,
      <BottomNavigationItem
        icon={<Help
          color={pathLoc === '/about' ? green800 : ''}
          style={styleBottonIcon}
        />}
        key="about"
        label="About"
        onTouchTap={() => browserHistory.push('/about')}
      />,
      <BottomNavigationItem
        icon={<LocalDining
          color={pathLoc === '' ? green800 : ''}
          style={styleBottonIcon}
        />}
        key="search"
        label="Hungry!"
        onTouchTap={() => browserHistory.push('/')}
      />
    ];

    if (document.cookie) {
      navArray.splice(0, 2,
        <BottomNavigationItem
          icon={<PowerSettings style={styleBottonIcon} />}
          key="logout"
          label="Log Out"
          onTouchTap={this.handleLogOut}
        />,
        <BottomNavigationItem
          icon={
            <Settings
              color={pathLoc === '/preferences' ? green800 : ''}
              style={styleBottonIcon}
            />}
          key="pref"
          label="Preferences"
          onTouchTap={() => browserHistory.push('/preferences')}
        />
      );
    }

    return <div>
      <AppBar
        className="appBarBun"
        showMenuIconButton={false}
      >
        <img className="logo" src="./images/logo.png" />
      </AppBar>
      <div className="mainContainer">
        {React.cloneElement(this.props.children, {
          searchRestaurants: this.searchRestaurants,
          restaurants: this.state.restaurants,
          nextRestaurants: this.nextRestaurants,
          setToast: this.setToast,
          setModal: this.setModal,
          position: this.state.position
        })}
      </div>
      <Paper style={{ marginTop: '56px' }} zDepth={2}>
        <BottomNavigation className="bottomNav" style={styleBottomNav} >
          {navArray}
        </BottomNavigation>
      </Paper>
      <ResultModal
        closeModal={this.closeModal}
        modalData={this.state.modal}
      />
      <Snackbar
        autoHideDuration={2500}
        message={this.state.toast.message}
        onRequestClose={() => this.setToast(false, '')}
        onTouchTap={() => this.setToast(false, '')}
        open={this.state.toast.open}
      />
    </div>;
  }
});

export default withRouter(App);
