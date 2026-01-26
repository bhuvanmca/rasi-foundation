import mongoose from 'mongoose';

const AchievementSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['milestone', 'success_story', 'stat', 'recognition', 'placement'],
        required: [true, 'Please provide achievement type'],
    },
    title: {
        type: String,
        required: [true, 'Please provide title'],
        maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    description: {
        type: String,
        maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    year: {
        type: String,
        maxlength: [10, 'Year cannot be more than 10 characters'],
    },
    name: {
        type: String,
        maxlength: [200, 'Name cannot be more than 200 characters'],
    },
    achievement: {
        type: String,
        maxlength: [500, 'Achievement detail cannot be more than 500 characters'],
    },
    quote: {
        type: String,
        maxlength: [1000, 'Quote cannot be more than 1000 characters'],
    },
    image: {
        type: String, // Initials or URL
        maxlength: [500, 'Image URL cannot be more than 500 characters'],
    },
    course: {
        type: String,
        maxlength: [100, 'Course cannot be more than 100 characters'],
    },
    value: {
        type: String, // For stats like '5000+'
        maxlength: [50, 'Value cannot be more than 50 characters'],
    },
    icon: {
        type: String, // String identifier for the icon
        maxlength: [100, 'Icon identifier cannot be more than 100 characters'],
    },
    color: {
        type: String,
        default: 'blue',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    order: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

AchievementSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.models.Achievement || mongoose.model('Achievement', AchievementSchema);
