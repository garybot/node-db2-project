const express = require('express');
const db = require('./data/db-config.js');
const server = express();

server.use(express.json());

server.get('/api/cars', async (req, res) => {
	try {
		const cars = await db('cars');
		res.status(200).json(cars);
	} catch (err) {
		res.status(500).json({ message: "Failed to retrieve cars list.", error: err});
	}
});

server.post('/api/cars', async (req, res) => {
	try {
		await db('cars').insert(req.body)
		res.status(201).json({ message: "Successfully added car."})
	} catch (err) {
		res.status(500).json({ message: "Failed to add to cars list.", error: err});
	}
})



module.exports = server;