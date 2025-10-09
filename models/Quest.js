const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Quest schema
const questSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Quest title is required'],
    trim: true,
    maxlength: [100, 'Quest title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Quest description is required'],
    trim: true,
    maxlength: [1000, 'Quest description cannot exceed 1000 characters']
  },
  difficulty: {
    type: String,
    required: [true, 'Quest difficulty is required'],
    enum: {
      values: ['easy', 'medium', 'hard', 'legendary'],
      message: 'Quest difficulty must be one of: easy, medium, hard, legendary'
    }
  },
  experienceReward: {
    type: Number,
    required: [true, 'Experience reward is required'],
    min: [0, 'Experience reward cannot be negative'],
    default: 0
  },
  goldReward: {
    type: Number,
    required: [true, 'Gold reward is required'],
    min: [0, 'Gold reward cannot be negative'],
    default: 0
  },
  itemReward: {
    type: String,
    trim: true,
    default: null
  },
  questGiver: {
    type: String,
    required: [true, 'Quest giver is required'],
    trim: true,
    maxlength: [100, 'Quest giver name cannot exceed 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Quest location is required'],
    trim: true,
    maxlength: [100, 'Quest location cannot exceed 100 characters']
  },
  requirements: {
    type: [String],
    default: []
  },
  objectives: {
    type: [{
      description: {
        type: String,
        required: true,
        trim: true,
        maxlength: [200, 'Objective description cannot exceed 200 characters']
      },
      completed: {
        type: Boolean,
        default: false
      }
    }],
    default: []
  },
  status: {
    type: String,
    required: [true, 'Quest status is required'],
    enum: {
      values: ['available', 'in-progress', 'completed', 'failed', 'locked'],
      message: 'Quest status must be one of: available, in-progress, completed, failed, locked'
    },
    default: 'available'
  },
  estimatedDuration: {
    type: String,
    trim: true,
    maxlength: [50, 'Estimated duration cannot exceed 50 characters']
  },
  questType: {
    type: String,
    required: [true, 'Quest type is required'],
    enum: {
      values: ['main', 'side', 'daily', 'weekly', 'event'],
      message: 'Quest type must be one of: main, side, daily, weekly, event'
    },
    default: 'main'
  },
  isRepeatable: {
    type: Boolean,
    default: false
  },
  minimumLevel: {
    type: Number,
    required: [true, 'Minimum level is required'],
    min: [1, 'Minimum level must be at least 1'],
    max: [20, 'Minimum level cannot exceed 20'],
    default: 1
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Add indexes for better query performance
questSchema.index({ difficulty: 1 });
questSchema.index({ questType: 1 });
questSchema.index({ status: 1 });
questSchema.index({ minimumLevel: 1 });

// Static method to find quests by difficulty
questSchema.statics.findByDifficulty = function(difficulty) {
  return this.find({ difficulty: difficulty });
};

// Static method to find quests by type
questSchema.statics.findByType = function(questType) {
  return this.find({ questType: questType });
};

// Static method to find available quests for a minimum level
questSchema.statics.findAvailableForLevel = function(minLevel) {
  return this.find({ 
    status: 'available',
    minimumLevel: { $lte: minLevel }
  });
};

// Instance method to mark quest as completed
questSchema.methods.markCompleted = function() {
  this.status = 'completed';
  return this.save();
};

// Instance method to mark quest as in progress
questSchema.methods.markInProgress = function() {
  this.status = 'in-progress';
  return this.save();
};

// Create and export the Quest model
const Quest = mongoose.model('Quest', questSchema);

module.exports = Quest;