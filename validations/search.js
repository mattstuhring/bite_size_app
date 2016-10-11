'use strict';

const Joi = require('joi');

module.exports.get = {
  query: {
    location: Joi.alternatives()
    .try(
      Joi.string().required(), Joi.number().required()
    ),
    term: Joi.string()
      .allow('')
      .max(255),
    displayNumber: Joi.number()
      .required()
      .min(1)
      .max(4)
  }
};
