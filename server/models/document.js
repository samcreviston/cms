const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const documentSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
});

documentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Document', documentSchema);
