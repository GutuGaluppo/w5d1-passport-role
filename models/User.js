const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: String, // This is part of the credentials
  password: String, // This is part of the credentials
  role: {
    type: String,
    enum : ['GUEST', 'ADMIN'],
    default : 'GUEST'
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
