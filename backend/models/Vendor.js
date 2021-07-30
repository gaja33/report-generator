const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Vendor = new Schema({
   name: {
      type: String
   },
   email: {
      type: String
   },
   designation: {
      type: String
   },
   phoneNumber: {
      type: Number
   }
}, {
   collection: 'vendor'
})

module.exports = mongoose.model('Vendor', Vendor)