'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    email: Joi.string()
      .label('Email')
      .email()
      .required()
      .trim(),
    password: Joi.string()
      .alphanum()
      .label('Password')
      .trim()
      .required(),
    minRating: Joi.number()
      .label('Minimum Rating')
      .min(1)
      .max(4)
      .required(),
    searchRadius: Joi.number()
      .label('Search Radius')
      .min(1)
      .max(3)
      .required()
  }
};

module.exports.patch = {
  body: {
    minRating: Joi.number()
      .label('Minimum Rating')
      .min(1)
      .max(4)
      .required(),
    searchRadius: Joi.number()
      .label('Search Radius')
      .min(1)
      .max(3)
      .required(),
    disabled: Joi.array()
      .items(Joi.number())
  }
};
