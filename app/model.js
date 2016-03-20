var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CapsuleSchema = new Schema({
    email: String,
    password: String,
    date: String
});

// Add schema to db
mongoose.model('capsules', CapsuleSchema, 'capsules');