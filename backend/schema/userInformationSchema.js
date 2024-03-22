
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new mongoose.Schema({
    userName: String,
    phoneNo: Number,
    address: String,
    postalCode: String,
    userId: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
      }],
});
const userInfoSchema = mongoose.model('userInfo', orderSchema);
module.exports = userInfoSchema;