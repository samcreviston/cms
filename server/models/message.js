const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const messageSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  subject: { type: String },
  msgText: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
});

messageSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Message', messageSchema);
