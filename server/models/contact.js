const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const contactSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  imageUrl: { type: String },
  group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }],
});

contactSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Contact', contactSchema);
