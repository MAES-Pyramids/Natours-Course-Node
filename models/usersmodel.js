const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
//-------------------Schema----------------//
const userSchema = new mongoose.Schema(
  {
    name: {
      type: 'string',
      required: [true, 'A user must have a name']
    },
    email: {
      type: 'string',
      required: [true, 'A user must have an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: {
      type: 'string',
      default: 'default.jpg'
    },
    password: {
      type: 'string',
      required: [true, 'A user must have a password'],
      minlength: 8,
      select: false
    },
    passwordConfirm: {
      type: 'string',
      required: [true, 'A user must have a password confirmation'],
      // This only works on CREATE and SAVE!!!
      validate: {
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!'
      }
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
//-------------------Instance Methods-------------------//
userSchema.methods.correctPassword = async function(loginPass, userPass) {
  return await bcrypt.compare(loginPass, userPass);
};
//-------------------Managing Password------------------//
// Note: data will get check by validator before it gets to this document middleware
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
});
//-------------------------Model------------------------//
const User = mongoose.model('User', userSchema);
//-------------------------Export-----------------------//
module.exports = User;
