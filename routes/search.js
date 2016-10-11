'use strict';

/* eslint-disable camelcase */
const knex = require('../knex');
const express = require('express');
const ev = require('express-validation');
const validations = require('../validations/search');
const { camelizeKeys } = require('humps');
const OAuth = require('oauth');
const jwt = require('jsonwebtoken');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/search', ev(validations.get), (req, res, next) => {
  const { location, term, displayNumber } = req.query;
  let query = `https://api.yelp.com/v2/search/?category_filter=restaurants&location=${location.trim()}&actionlinks=true&sort=2&limit=20`;
  let id = null;
  let minRating;
  let searchRadius;
  let restaurants;

  if (term) {
    query += `&term=${term.trim()}`;
  }

  if (req.cookies.accessToken) {
    id = jwt.decode(req.cookies.accessToken).userId;
  }

  knex('users')
    .where('id', id)
    .first()
    .then((response) => {
      if (response) {
        minRating = response.min_rating;
        searchRadius = response.search_radius * 1600;
      }
      else {
        minRating = 1;
        searchRadius = 3200;
      }

      query += `&radius_filter=${searchRadius}`;
    })
    .then(() => {
      const oauth = new OAuth.OAuth(
        null,
        null,
        process.env.CONSUMER_KEY,
        process.env.CONSUMER_SECRET,
        '1.0',
        null,
        'HMAC-SHA1'
      );
      const yelp = new Promise((resolve, reject) => {
        oauth.get(
          query,
          process.env.USER_TOKEN,
          process.env.USER_SECRET,
          (error, data, _response) => {
            if (error) {
              reject(error);
            }
            resolve(data);
          });
      });

      return yelp;
    })
    .then((data) => {
      const parsedData = JSON.parse(data);

      restaurants = parsedData.businesses.map((element) => {
        const {
          rating,
          name,
          url,
          categories,
          display_phone,
          snippet_text,
          review_count,
          image_url
        } = element;

        const categoryList = categories.map((item) => {
          return item[0];
        });

        const restaurant = {
          rating,
          name,
          url,
          categoryList,
          display_phone,
          snippet_text,
          review_count,
          image_url
        };

        restaurant.location = element.location.display_address;

        return camelizeKeys(restaurant);
      });
      if (!id) {
        return;
      }

      return knex('users_categories')
      .join('categories', 'categories.id', 'category_id')
      .select('name')
      .where('user_id', id)
      .then((disabled) => {
        const disabledCats = disabled.map((cat) => {
          return cat.name;
        });

        restaurants = restaurants.filter((target) => {
          for (const category of target.categoryList) {
            if (disabledCats.includes(category)) {
              return false;
            }
          }
          if (minRating > target.rating) {
            return false;
          }

          return true;
        });

        return;
      });
    })
    .then(() => {
      const final = { restaurants, displayNumber };

      res.send(final);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
