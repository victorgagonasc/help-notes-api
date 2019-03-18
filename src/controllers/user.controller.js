const User = require('../models/user.model');
const HttpStatus = require('http-status-codes');
const mongoose = require('mongoose');

exports.getAll = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(HttpStatus.OK).send(users);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

exports.getById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(HttpStatus.BAD_REQUEST).send('INVALID_ID');

    const user = await User.findById(req.params.id);
    return res.status(HttpStatus.OK).send(user);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

exports.create = async (req, res) => {
  try {
    const result = await User.findOne({
      email: req.body.email
    });

    if (result) return res.status(HttpStatus.CONFLICT).send('EMAIL_CONFLICT');

    const user = new User(req.body);
    await user.save();
    return res.status(HttpStatus.CREATED).send(user);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

exports.update = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(HttpStatus.BAD_REQUEST).send('INVALID_ID');

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.status(HttpStatus.OK).send(user);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

exports.delete = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(HttpStatus.BAD_REQUEST).send('INVALID_ID');

    const user = await User.findByIdAndRemove(req.params.id);
    return res.status(HttpStatus.ACCEPTED).send(user);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}