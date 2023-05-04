const crypto = require('crypto');
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
    role: {
      type: String,
      enum: ['user', 'guide', 'lead-guide', 'admin'],
      default: 'user'
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
    },
    passwordChangedAt: {
      type: Date,
      select: false
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
//-------------------Instance Methods-------------------//
// Check if the password is correct
userSchema.methods.correctPassword = async function(loginPass, userPass) {
  return await bcrypt.compare(loginPass, userPass);
};
// Check if the password was changed after the token was issued
userSchema.methods.isPasswordChanged = function(JWTtimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTtimeStamp < changedTimeStamp;
  }
  return false;
};
// Create a password reset token and password reset expire at for each user and store it in the database
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
//-------------------Managing Password------------------//
// Encrypt the password before saving it to the database
// Note: data will get check by validator before it gets to this document middleware
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
});
// Set the passwordChangedAt property to the current time before saving the document
userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
// Hide inactive users
userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});
//-------------------------Model------------------------//
const User = mongoose.model('User', userSchema);
//-------------------------Export-----------------------//
module.exports = User;
