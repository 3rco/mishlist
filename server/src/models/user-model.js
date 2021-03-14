import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    maxLength: 120
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 120
  },
  password: {
    type: String,
    required: true,
    maxLength: 120
  },
  valid: {
    url: {
      type: String,
      required: true,
    },
    validationCheck: {
      type: Boolean,
      default: false
    }
  },
  role: {
    type: String,
    default: 'user'
  },
  profile: {
    firstName: {
      type: String,
      maxLength: 120,
    },
    lastName: {
      type: String,
      maxLength: 120
    },
    birthday: {
      type: Date
    },
    img: {
      type: String
    },
    location: {
      country: {
        type: String
      },
      city: {
        type: String
      },
      coordinates: [Number]
    },
    address: {
      name: {
        type: String,
        maxLength: 50
      },
      content: {
        type: String,
        maxLength: 500,
      },
      code: {
        type: String,
      }
    },
    wishLists: [{
      type: Schema.Types.ObjectId,
      ref: 'List'
    }]
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);
