import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    default: 3,
  },
  progress: {
    type: Number,
    default: 0,
  },
  startDate: {
    type: String,
    default: () => new Date().toISOString().slice(0, 10),
  },
  endDate: {
    type: String,
    default: () => new Date().toISOString().slice(0, 10),
  },
  shared: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
    default: '',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional for now, to support legacy/public projects if any
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

projectSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
