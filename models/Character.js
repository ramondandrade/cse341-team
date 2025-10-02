const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Character schema
const characterSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Character name is required'],
    trim: true,
    maxlength: [100, 'Character name cannot exceed 100 characters']
  },
  userId: {
    type: String,
    required: [true, 'User ID is required'],
    trim: true
  },
  class: {
    type: String,
    required: [true, 'Character class is required'],
    trim: true,
    maxlength: [50, 'Character class cannot exceed 50 characters']
  },
  race: {
    type: String,
    required: [true, 'Character race is required'],
    trim: true,
    maxlength: [50, 'Character race cannot exceed 50 characters']
  },
  level: {
    type: Number,
    required: [true, 'Character level is required'],
    min: [1, 'Character level must be at least 1'],
    max: [20, 'Character level cannot exceed 20'],
    default: 1
  },
  hitPoints: {
    type: Number,
    required: [true, 'Hit points are required'],
    min: [1, 'Hit points must be at least 1'],
    default: 10
  },
  armorClass: {
    type: Number,
    required: [true, 'Armor class is required'],
    min: [1, 'Armor class must be at least 1'],
    default: 10
  },
  strength: {
    type: Number,
    required: [true, 'Strength is required'],
    min: [1, 'Strength must be at least 1'],
    max: [30, 'Strength cannot exceed 30'],
    default: 10
  },
  dexterity: {
    type: Number,
    required: [true, 'Dexterity is required'],
    min: [1, 'Dexterity must be at least 1'],
    max: [30, 'Dexterity cannot exceed 30'],
    default: 10
  },
  constitution: {
    type: Number,
    required: [true, 'Constitution is required'],
    min: [1, 'Constitution must be at least 1'],
    max: [30, 'Constitution cannot exceed 30'],
    default: 10
  },
  intelligence: {
    type: Number,
    required: [true, 'Intelligence is required'],
    min: [1, 'Intelligence must be at least 1'],
    max: [30, 'Intelligence cannot exceed 30'],
    default: 10
  },
  wisdom: {
    type: Number,
    required: [true, 'Wisdom is required'],
    min: [1, 'Wisdom must be at least 1'],
    max: [30, 'Wisdom cannot exceed 30'],
    default: 10
  },
  charisma: {
    type: Number,
    required: [true, 'Charisma is required'],
    min: [1, 'Charisma must be at least 1'],
    max: [30, 'Charisma cannot exceed 30'],
    default: 10
  },
  background: {
    type: String,
    trim: true,
    maxlength: [200, 'Background cannot exceed 200 characters']
  },
  alignment: {
    type: String,
    trim: true,
    maxlength: [50, 'Alignment cannot exceed 50 characters']
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create and export the Character model
const Character = mongoose.model('Character', characterSchema);

module.exports = Character;