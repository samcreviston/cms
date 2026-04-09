var Sequence = require('../models/sequence');

var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;

function SequenceGenerator() {
  Sequence.findOne().exec(function (err, sequence) {
    if (err || !sequence) {
      console.log('Sequence initialization error = ' + err);
      return;
    }

    sequenceId = sequence._id;
    maxDocumentId = parseInt(sequence.maxDocumentId, 10) || 0;
    maxMessageId = parseInt(sequence.maxMessageId, 10) || 0;
    maxContactId = parseInt(sequence.maxContactId, 10) || 0;
  });
}

SequenceGenerator.prototype.nextId = function (collectionType) {
  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'documents':
      maxDocumentId++;
      updateObject = { maxDocumentId: maxDocumentId };
      nextId = maxDocumentId;
      break;
    case 'messages':
      maxMessageId++;
      updateObject = { maxMessageId: maxMessageId };
      nextId = maxMessageId;
      break;
    case 'contacts':
      maxContactId++;
      updateObject = { maxContactId: maxContactId };
      nextId = maxContactId;
      break;
    default:
      return -1;
  }

  Sequence.updateOne({ _id: sequenceId }, { $set: updateObject }, function (err) {
    if (err) {
      console.log('nextId error = ' + err);
      return null;
    }
  });

  return nextId.toString();
};

module.exports = new SequenceGenerator();
