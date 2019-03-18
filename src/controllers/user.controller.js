const User = require('../models/user.model');
const HttpStatus = require('http-status-codes');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
    if (!mongoose.Types.ObjectId.isValid(req.userId))
      return res.status(HttpStatus.BAD_REQUEST).send('INVALID_ID');

    const user = await User.findById(req.userId);
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
    return res.status(HttpStatus.CREATED).send({
      ...getToken(user._id),
      username: user.username
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

exports.update = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.userId))
      return res.status(HttpStatus.BAD_REQUEST).send('INVALID_ID');

    const user = await User.findByIdAndUpdate(req.userId, req.body, {
      new: true
    });
    return res.status(HttpStatus.OK).send(user);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

exports.delete = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.userId))
      return res.status(HttpStatus.BAD_REQUEST).send('INVALID_ID');

    const user = await User.findByIdAndRemove(req.userId);
    return res.status(HttpStatus.ACCEPTED).send(user);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    }).select('+password');

    if (!user) return res.status(HttpStatus.NOT_FOUND).send('USER_NOT_FOUND');

    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (!isValid) return res.status(HttpStatus.UNAUTHORIZED).send('INVALID_USER');

    return res.status(HttpStatus.OK).send(getToken(user._id));
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

getToken = (id) => {
  const expiresIn = 604800;
  let token = jwt.sign({
    id
  }, process.env.SECRET, {
    expiresIn
  });

  return {
    token: token,
    expiresIn
  };
}