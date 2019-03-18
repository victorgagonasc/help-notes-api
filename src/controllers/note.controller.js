const Note = require('../models/note.model');
const HttpStatus = require('http-status-codes');

exports.getAll = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.userId
    });
    return res.status(HttpStatus.OK).send(notes);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

exports.getById = async (req, res) => {
  try {
    const note = await Note.find({
      _id: req.params.id,
      userId: req.userId
    });
    return res.status(HttpStatus.OK).send(note);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

exports.create = async (req, res) => {
  try {
    const result = await Note.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (result) return res.status(HttpStatus.CONFLICT).send('TITLE_CONFLICT');

    req.body.userId = req.userId;
    const note = new Note(req.body);
    await note.save();
    return res.status(HttpStatus.CREATED).send(note);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

exports.update = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate({
      _id: req.params.id,
      userId: req.userId
    }, req.body, {
      new: true
    });
    return res.status(HttpStatus.OK).send(note);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

exports.delete = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete({
      _id: req.params.id,
      userId: req.userId
    });
    return res.status(HttpStatus.ACCEPTED).send(note);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}