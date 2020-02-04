const express = require('express');
const db = require('./data/db-config.js');
const server = express();

server.use(express.json());

server.post('/api/cars', async (req, res) => {
	try {
		await db('cars').insert(req.body)
		res.status(201).json({ message: "Successfully added car."})
	} catch (err) {
		res.status(500).json({ message: "Failed to add to cars list.", error: err});
	}
});

server.get('/api/cars', async (req, res) => {
	try {
		const cars = await db('cars');
		res.status(200).json(cars);
	} catch (err) {
		res.status(500).json({ message: "Failed to retrieve cars list.", error: err});
	}
});

server.put('/api/cars/:id', async (req, res) => {
	try {
		const cars = await db('cars').where({ id: req.params.id });
		if (cars.length) {
			await db('cars').where({ id: req.params.id }).update(req.body);
			res.status(200).json({ message: "Successfully updated car data"});
		} else {
			res.status(400).json({ message: "There is no car with that id."});
		}
	} catch (err) {
		res.status(500).json({ message: "Failed to update car data.", error: err});
	}
});

server.delete('/api/cars/:id', async (req, res) => {
	try {
		const cars = await db('cars').where({ id: req.params.id });
		if (cars.length) {
			await db('cars').where({id: req.params.id}).del();
			res.status(200).json({ message: "Successfully removed a car from the list."});
		} else {
			res.status(400).json({ message: "There is no car with that id."});
		}
	} catch (err) {
		res.status(500).json({ message: "Failed to remove from cars list.", error: err});
	}
});

module.exports = server;