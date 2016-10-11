/* eslint-disable react/jsx-no-bind*/
import { fullWhite, green700 }
  from 'material-ui/styles/colors';
import Dissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import React from 'react';
import Redo from 'material-ui/svg-icons/content/redo';
import { withRouter } from 'react-router';

const Results = React.createClass({
  handleTouchTap() {
    this.props.nextRestaurants();
  },

  handleRowTouch(restaurant) {
    this.props.setModal(restaurant);
  },

  render() {
    const styles = {
      largeIcon: {
        width: 100,
        height: 100
      },
      large: {
        width: 100,
        height: 100,
        padding: 0,
        paddingRight: 5
      }
    };

    const { restaurants, position } = this.props;
    const restaurantsView = restaurants.slice(position.start, position.end);

    if (!restaurantsView.length) {
      restaurantsView.push(
        {
          name: 'Nothing Found.',
          rating: <Dissatisfied />,
          reviewCount: <Dissatisfied />,
          categoryList: ['Sorry!'],
          imageUrl: './images/emptyburger.jpg'
        }
      );
    }

    return <div>
      <img className="menu" src="./images/menu.jpg" />
      <Paper
        circle={true}
        onTouchTap={this.handleTouchTap}
        style={{
          display: 'inline-block',
          width: '50px',
          height: '50px',
          backgroundColor: green700
        }}
        zDepth={2}
      >
        <div style={{ marginLeft: '6px' }}>
          <Redo
            style={{
              display: 'block',
              color: fullWhite,
              marginLeft: '5px'
            }}
          />
          <p
            style={{
              display: 'block',
              marginTop: '0px',
              marginBottom: '0px',
              color: fullWhite
            }}
          >
            more
          </p>
        </div>
      </Paper>

      {restaurantsView.map((restaurant, index) => {
        let burger;

        switch (index) {
          case 0:
            burger = './images/cheeseburger2.png';
            break;
          case 1:
            burger = './images/cheeseburger3.png';
            break;
          case 2:
            burger = './images/cheeseburger4.png';
            break;
          case 3:
            burger = './images/cheeseburger5.png';
            break;
          default:
        }

        return <div
          key={index}
          style={{ marginBottom: '10px', marginTop: '10px', width: '375px' }}
        >
          <div className="flexContainer">
            <Paper
              circle={true}
              style={{ marginLeft: '7px', marginBottom: '7px' }}
              zDepth={2}
            >
              <IconButton
                iconStyle={styles.largeIcon}
                onTouchTap={() => this.handleRowTouch(restaurant)}
                style={styles.large}
              >
                <img src={burger} />
              </IconButton>
            </Paper>
            <div className="flexItems">
              <p
                style={{
                  marginBottom: '5px',
                  marginTop: '0px',
                  fontSize: '15px',
                  fontWeight: 'bold'
                }}
              >
                <a href={restaurant.url}
                  style={{
                    textDecoration: 'underline'
                  }}
                >{restaurant.name}
                </a>
              </p>
              <p
                style={{
                  marginBottom: '5px',
                  marginTop: '0px',
                  fontSize: '12px'
                }}
              >{restaurant.categoryList.join(', ')}
              </p>
              <p
                style={{
                  marginBottom: '0px',
                  marginTop: '0px',
                  fontStyle: 'italic',
                  fontSize: '10px'
                }}
              >{restaurant.snippetText}
              </p>
            </div>
          </div>
          <Divider />
        </div>;
      })}
    </div>;
  }
});

export default withRouter(Results);
