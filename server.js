require("dotenv").config();

const { Client } = require("pg");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const client = new Client({
	user: "sbhacksiv",
	password: "1234",
	host: "localhost",
	database: "sbhacksiv_development",
	port: 5432
});

if(process.env.NODE_ENV === "production") {

}

client.connect();

const getCount = () => {
	let school_count_query = 
	`SELECT schools.name, COUNT(*)
	FROM schools
	JOIN applications ON applications.school_id = schools.id GROUP BY schools.name;`;

	return new Promise((resolve, reject) => {
		client.query(school_count_query, (err, res) => {
			resolve(res.rows);
		});
	});
}

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	getCount()
	.then((applications) => {
		res.locals.applications = applications;
		res.render("index");
	});
});

app.listen(port, () => console.log("Server listening in on port", port));