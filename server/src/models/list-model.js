import mongoose from 'mongoose';

const { Schema } = mongoose;

const listSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    maxLength: 120
  },
  desc: {
    type: String,
    maxLength: 500
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  wishes: [{
    type: Schema.Types.ObjectId,
    ref: 'Wish',
  }]
}, {
  timestamps: true
});

export default mongoose.model('List', listSchema);
