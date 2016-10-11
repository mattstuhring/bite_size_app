import { fullWhite, red700 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import React from 'react';

const ResultModal = React.createClass({
  handleClose() {
    this.props.closeModal();
  },

  render() {
    const restaurant = this.props.modalData.restaurant;
    const styleDialog = {
      width: '100%',
      maxWidth: 'none'
    };

    const styleBody = {
      padding: '20px'
    };

    const actions =
      <div>
        <FlatButton
          label="Close"
          onTouchTap={this.handleClose}
          style={{
            backgroundColor: red700,
            display: 'inline-block',
            marginBottom: '5px',
            color: fullWhite
          }}
        />
        <div style={{ display: 'inline-block' }}>
          <a href={restaurant.url}>
            <img src="./images/yelp.jpg" style={{ width: '75px' }} />
          </a>
          <p
            style={{
              marginLeft: '80px',
              marginTop: '0px',
              marginBottom: '0px'
            }}
          >
            Rating: {restaurant.rating} / Reviews: {restaurant.reviewCount}
          </p>

        </div>
      </div>;

    return (
      <div>
        <Dialog
          actions={actions}
          bodyStyle={styleBody}
          contentStyle={styleDialog}
          modal={false}
          onRequestClose={this.handleClose}
          open={this.props.modalData.open}
        >
          <div>
            <Paper
              style={{
                display: 'inline-block',
                width: '130px',
                height: '130px'
              }}
            >
              <img
                src={restaurant.imageUrl}
                style={{ width: '130px', height: '130px' }}
              />
            </Paper>

            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
              <div className="resultLink">
                <a href={restaurant.url}>{restaurant.name}</a>
              </div>
              {restaurant.location ? restaurant.location.map(
                (element, index) => {
                  return <h5 className="resultForm" key={index}>
                  {restaurant.location[index]}
                  </h5>;
                }) : <h5 />}
              <h6 className="resultPhone">{restaurant.displayPhone}</h6>
            </div>
          </div>
          <p style={{ fontStyle: 'italic' }}>{restaurant.snippetText}</p>
        </Dialog>
      </div>
    );
  }
});

export default ResultModal;
