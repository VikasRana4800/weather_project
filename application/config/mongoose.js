
let mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB, {})

let userSchema = new mongoose.Schema({
    
        userName: {type:String, required: true},
        email:{type:String, required: true},
        password:{type:String, required: true},
    })

let user = mongoose.model( 'users', userSchema);

let eventSchema = new mongoose.Schema({

    title: {type:String, required: true},
    description:{type:String, required: true},
    date:{type:String, required: true},
    time:{type:String, required: true},
    location:{type:String, required: true},

})

let event = mongoose.model( 'events', eventSchema);

module.exports = {user, event };