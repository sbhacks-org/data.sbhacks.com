var webpack = require('webpack');
var path = require('path');

if(process.env["NODE_ENV"] !== "production") require("dotenv").config();

module.exports = {
	entry: path.join(__dirname, "src/client/index.js"),
	output: {
		path: path.join(__dirname, "src/static/js"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
	                presets: ['es2015', 'react']
	            }
			}
		]
	}
};