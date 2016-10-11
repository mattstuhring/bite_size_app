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
      .required()
  }
};
