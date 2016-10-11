/* eslint-disable max-len */
import Paper from 'material-ui/Paper';
import React from 'react';

const About = React.createClass({
  render() {
    const stylePaper = {
      marginLeft: '3%',
      marginRight: '3%',
      padding: '1%'
    };

    return <div className="mainContainer">
      <img className="about" src="./images/about.png" />
      <Paper className="aboutPaper" style={stylePaper} zDepth={2}>
        <p className="aboutblock">We've all been there. Whether you're somewhere new and unfamiliar or just can't put your finger on which local eatery you're craving, biteSize is here to help.</p>
        <p className="aboutblock">Put in a location, a search term (if you feel like it), and we'll give you a list just short enough to avoid the analysis paralysis that comes with a having huge pile of options to sort through.</p>
        <p className="aboutblock">If you're feeling a little more picky, register for an account to fine-tune your search results by radius, rating, and category!</p>
        <p className="aboutblock">Here's to good food and short hunts!</p>
      </Paper>
    </div>;
  }
});

export default About;
