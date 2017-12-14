require("dotenv").config();

const NodeCache = require("node-cache");
const { Client } = require("pg");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const school_cache = new NodeCache({ stdTTL: 60 * 5 });

let client = new Client({
	user: "sbhacksiv",
	password: "1234",
	host: "localhost",
	database: "sbhacksiv_development",
	port: 5432
});

if(process.env.NODE_ENV === "production") {
	client = new Client({
		connectionString: process.env.DB_URL
	});
}

client.connect();

const getSchoolCount = () => {
	let school_count_query = 
	`SELECT schools.id, schools.name, COUNT(*)
	FROM schools
	JOIN applications ON applications.school_id = schools.id
	GROUP BY schools.name, schools.id
	ORDER BY count DESC;`;

	return new Promise((resolve, reject) => {
		school_cache.get("count", (err, cached_rows) => {
			if(cached_rows) return resolve(cached_rows);

			console.log("querying..");
			client.query(school_count_query, (err, res) => {
				school_cache.set("count", res.rows, (err, success) => {
					resolve(res.rows);
				});
			});
		})
	});
}

const getApplications = (school_id) => {
	let applications_from_school_query = 
	`SELECT applications.*, users.*, schools.name as school_name
	FROM schools
	JOIN applications ON applications.school_id = schools.id
	JOIN users ON applications.user_id = users.id
	${school_id ? `WHERE schools.id = ${parseInt(school_id) || 0}` : ""};`;

	return new Promise((resolve, reject) => {
		school_cache.get(`apps-${school_id}`, (err, cached_rows) => {
			if(cached_rows) return resolve(cached_rows);

			console.log("Querying applications..");
			client.query(applications_from_school_query, (err, res) => {
				if(err) console.log(err);
				school_cache.set(`apps-${school_id}`, res.rows, (err, success) => {
					resolve(res.rows);
				});
			});
		})
	});
};

app.set("view engine", "ejs");

app.use((req, res, next) => {
	res.locals.s3_url = process.env["S3_URL"] || "";
	next();
});

app.get("/", (req, res) => {
	getSchoolCount()
	.then((schools) => {
		res.locals.schools = schools;
		res.render("index");
	});
});

app.get("/applications/:school_id?", (req, res) => {
	getSchoolCount()
	.then((schools) => {
		res.locals.schools = schools;
		res.locals.params = req.params;
		getApplications(req.params["school_id"])
		.then((applications) => {
			res.locals.applications = applications;
			res.render("applications");
		});
		
	});
});

app.listen(port, () => console.log("Server listening in on port", port));