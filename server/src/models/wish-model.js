import mongoose from 'mongoose';

const { Schema } = mongoose;

const wishSchema = new Schema({
  Owner: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true
  },
  name: {
    type: String,
    required: true,
    maxLength: 120
  },
  url: {
    type: String,
    maxLength: 500,
    required: true
  },
  didItHappen: {
    type: Boolean,
    default: false
  },
  content: {
    desc: {
      type: String,
      maxLength: 5000
    },
    img: {
      type: String,
    }
  }
}, {
  timestamps: true
});

export default mongoose.model('Wish', wishSchema);
