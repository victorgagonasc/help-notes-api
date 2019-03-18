const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
}, {
  versionKey: false
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) this.password = this._hashPassword(this.password)
  next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return bcrypt.hashSync(password)
  },
  authenticateUser(password) {
    return bcrypt.compareSync(password, this.password)
  }
}
module.exports = mongoose.model('User', UserSchema);