var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CapsuleSchema = new Schema({
    email: String,
    password: String,
    date: Date
});

// Add schema to db
mongoose.model('capsules', CapsuleSchema, 'capsules');