const mongoose = require('mongoose');


// Let's start by making a User model for mongodb 
// using the mongoose library. This will be the template 
// used to describe what each individual document will look like in our collection.
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

//In this case, emails need to be unique. It makes sense to have at least one unique value, to avoid errors with authentication later on.

// Here we are using route chaining as a shorthand for the "get", "put", and "delete" routes, since they all use the '/users/:id' endpoint. Remember that in 'users/:id' endpoint, id is a variable which can be accessed in the "req.params".

// Now that we have a model, let's import it and connect to our database. Go to your server.js file and add these lines after all the libraries are imported.

module.exports = mongoose.model('User', UserSchema)