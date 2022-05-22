// bring in express framework
const express = require('express');
// bring in bodyParser
const bodyParser = require('body-parser');
// instantiate the application server
const app = express();
// Port the express application is listening on
const port = process.env.PORT || 4000;
// bring in users array from state.js
const { users } = require('./state');
// count is equal to length of users array in state.js
let counter = users.length;
// use body parser to read the body data from the request
app.use(bodyParser.json());
/* BEGIN - create routes here */

//=============================================================================
//Part 1 - Basic Routes

/**
 * GET /users
 * Return a list of all users from the users array in state.js
 */

app.get('/users', (req, res) => {
	console.log('GET /users');
	// respond with a list of all users in the users array
	res.json(users);
});

/**
 * GET /users/1
 * Return the first user from the users array in state.js
 */

app.get('/users/:id', (req, res) => {
	console.log('GET /users/1');
	// respond with a list of the first user in the users array
	res.json(users[0]);
});

/**
 * POST /users
 * Return a hard coded new user to the end of the users array in state.js.
 * New user has all of the details as the other users.(id, name, occupation, avatar)
 */

app.post('/users', (req, res) => {
	console.log('POST /users');
	// increment counter by one.  Used to set the new id for a new user created
	counter++;
	// Create a new user
	const newUser = {
		_id: counter,
		name: 'Han Solo',
		occupation: 'Smuggler',
		avatar: 'http://',
	};
	// Push new user to end of users array
	users.push(newUser);
	// res.json(newUser)
	// Respond with the last user in the users array
	res.json(users[users.length - 1]);
});

/**
 * PUT /users/1
 * Update the name and occupation of an item by id.  If the user id
 * is not found, it will display a 404 status and send a message.
 */

app.put('/users/:id', (req, res) => {
	console.log('PUT /users/:id', req.body);
	//create a variable that finds the user we want to update
	const user = users.find((user) => user._id === parseInt(req.params.id));
	//If user id does not exist, respond with a 404 status and message
	if (!user) {
		res.status(404).send('The user with the given id was not found');
	}
	// read name and occupation from the request body
	user.name = req.body.name;
	user.occupation = req.body.occupation;
	// Respond with the updated version of the user
	res.json(user);
});

/**
 * DELETE /users/1
 * Delete the item by id
 */

app.delete('/users/:id', (req, res) => {
	console.log('DELETE /users/:id', req.params.id);
	//create a variable that finds the user we want to delete
	const user = users.find((user) => user._id === parseInt(req.params.id));
	//If user id does not exist, respond with a 404 status and message
	if (!user) {
		res.status(404).send('The user with the given id was not found');
	}
	// determine index of user
	const index = users.indexOf(user);
	// Use splice to remove the user at the found index
	users.splice(index, 1);
	// Create a response message
	let message = 'deleted';
	// Respond with the message
	res.send(message);
});

//=============================================================================
// //Part 2 - Body-parser module

app.post('/users', (req, res) => {
	console.log('POST /users');
	console.log('body = ', req.body);
	// counter incremented by one which represents the
	// current users array length plus one
	counter++;
	// create a new user object
	let newUser = {};
	// new user id is set by counter
	newUser._id = counter;
	// read the name, occupation and avatar from the request body
	newUser.name = req.body.name;
	newUser.occupation = req.body.occupation;
	newUser.avatar = req.body.avatar;
	// add the new user to the users array
	users.push(newUser);
	// respond with the new user
	res.json(newUser);
});

//=============================================================================
// //Part 3. Use Path Variables

// /**
//  * GET /users/:userId
//  */

app.get('/users/:userId', (req, res) => {
	console.log('GET /users/:userId');
	//create a variable that finds the user we want to delete
	const user = users.find((user) => user._id === parseInt(req.params.userId));
	//If user id does not exist, respond with a 404 status and message
	if (!user) {
		res.status(404).send('The user with the given id was not found');
	}
	// respond with the user
	res.json(user);
});

// /**
//  * PUT /users/:userId
//  */

app.put('/users/:userId', (req, res) => {
	console.log('PUT /users/userId');
	//create a variable that finds the user we want to delete
	let user = users.find((user) => user._id === parseInt(req.params.userId));
	//If user id does not exist, respond with a 404 status and message
	if (!user) {
		res.status(404).send('The user with the given id was not found');
	}
	// read the name, occupation and avatar from the request body
	user.name = req.body.name;
	user.occupation = req.body.occupation;
	user.avatar = req.body.avatar;
	// respond with the new version of the user back
	res.json(user);
});

// /**
//  * DELETE /users/:userId
//  */

app.delete('/users/:userId', (req, res) => {
	console.log('GET /users/:userId');
	//create a variable that finds the user we want to delete
	let user = users.find((user) => user._id === parseInt(req.params.userId));
	//If user id does not exist, respond with a 404 status and message
	if (!user) {
		res.status(404).send('The user with the given id was not found');
	}
	// add a new object key to the user body
	user.isActive = 'false';
	let message = 'deleted';
	//respond with the deleted message
	res.send(message);
});

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
