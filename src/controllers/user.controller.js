const User = require('../models/user.model')
const HttpStatus = require('http-status-codes');

exports.getAll = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    return res.status(HttpStatus.OK).send(users);
  } catch (error) {
    throw boom.boomify(error)
  }
}

exports.getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    return res.status(HttpStatus.OK).send(user);
  } catch (error) {
    throw boom.boomify(error);
  }
}

exports.create = async (req, res) => {
  try {
    const result = await User.findOne({
      email: req.body.email
    }).select('-password');

    if (result) return res.send('User already exists');

    const user = new User(req.body);
    await user.save();
    delete user.password
    return res.status(HttpStatus.CREATED).send(user);
  } catch (error) {
    return res.status(HttpStatus.CONFLICT).send(error);
  }
}

exports.update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }).select('-password');
    console.log
    return res.status(HttpStatus.OK).send(user);
  } catch (error) {
    throw boom.boomify(error);
  }
}

exports.delete = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id).select('-password');
    return res.status(HttpStatus.ACCEPTED).send(user);
  } catch (error) {
    throw boom.boomify(error);
  }
}