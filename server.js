require("dotenv").config();

const bodyParser = require('body-parser');
const NodeCache = require("node-cache");
const { Client } = require("pg");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
var path = require('path');

const school_cache = new NodeCache({ stdTTL: 60 * 5 });

let client = new Client({
	user: "sbhacksv",
	password: "1234",
	host: "localhost",
	database: "sbhacksv_development",
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
	`SELECT applications.*, users.*, schools.name as school_name, applications.id as application_id
	FROM schools
	JOIN applications ON applications.school_id = schools.id
	JOIN users ON applications.user_id = users.id
	${school_id ? `WHERE schools.id = ${parseInt(school_id) || 0}` : ""}
	ORDER BY applications."createdAt", applications."updatedAt";`;

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

const getAllApplicationsNoCache = () => {
	let applications_from_school_query = 
	`SELECT applications.*, users.*, schools.name as school_name, applications.id as application_id
	FROM schools
	JOIN applications ON applications.school_id = schools.id
	JOIN users ON applications.user_id = users.id
	ORDER BY accepted DESC, first_name, last_name;`;

	return new Promise((resolve, reject) => {
		client.query(applications_from_school_query, (err, res) => {
			if(err) console.log(err);
			resolve(res.rows);
		});
	});
};

const getApplicationsCheckedInCountNoCache = () => {
	let applications_checked_in_count_query = 
	`SELECT COUNT(*) FROM applications WHERE checked_in=true;`;

	return new Promise((resolve, reject) => {
		client.query(applications_checked_in_count_query, (err, res) => {
			if(err) console.log(err);
			resolve(res.rows);
		});
	});
};


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "src/static")));

app.use((req, res, next) => {
	res.locals.s3_url = process.env["S3_URL"] || "";
	res.locals.token = process.env["TOKEN"];

	next();
});

app.get("/", (req, res) => {
	getSchoolCount()
	.then((schools) => {
		res.locals.schools = schools;
		res.render("index");
	});
});

app.get(`/${process.env["TOKEN"]}/app-review`, (req, res) => {
	console.log(req.query);
	var start = req.query.start || 0;
	var end = req.query.end || 2000;
	getAllApplicationsNoCache()
	.then((applications) => {
		var filteredApps = applications.filter((application) => {
			
			return (application.application_id>=start && application.application_id<=end);
			
		});
		var apps = {applicants: filteredApps};
		res.render("review", {applications: apps});
	});
});

app.get(`/${process.env["TOKEN"]}/applications/:school_id?`, (req, res) => {
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


app.put('/update-rating', (req, res) => {
	if(isNaN(req.body.id)) return res.json("Nope");
	var rating = null;
	if (req.body.rating!=='')
	{
		rating = req.body.rating;
	}
	client.query(`UPDATE applications SET rating=${rating} WHERE id=${req.body.id};`, (err, response) => {
		if(err) throw err;
		res.json({id: req.body.id, rating: rating});
	});
	
});


app.post(`/${process.env["TOKEN"]}/checkin`, (req, res) => {
	if(isNaN(req.query.application_id)) return res.json("Nope");

	client.query(`UPDATE applications SET checked_in=true WHERE id=${req.query.application_id};`, (err, response) => {
		if(err) throw err;
		res.redirect(`/${process.env["TOKEN"]}/checkin`);
	});
});

app.get(`/${process.env["TOKEN"]}/checkin`, (req, res) => {
	getApplicationsCheckedInCountNoCache()
	.then((applications_checked_in_count) => {
		res.locals.applications_checked_in_count = applications_checked_in_count[0]["count"];
		getAllApplicationsNoCache()
		.then((applications) => {
			res.locals.applications = applications;
			res.locals.token = process.env["TOKEN"];
			res.render("checkin");
		});
	})
});


app.post(`/${process.env["TOKEN"]}/undo_checkin`, (req, res) => {
	if(isNaN(req.query.application_id)) return res.json("Nope");

	client.query(`UPDATE applications SET checked_in=NULL WHERE id=${req.query.application_id};`, (err, response) => {
		if(err) throw err;
		res.redirect(`/${process.env["TOKEN"]}/checkin`);
	});
});

app.listen(port, () => console.log("Server listening in on port", port));