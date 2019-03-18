const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    minlength: [6, 'Username must be at least 6 characters']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
    select: false,
    minlength: [8, 'Password must be at least 8 characters']
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