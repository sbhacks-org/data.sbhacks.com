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
	                presets: ['es2015', 'react', 'stage-2']
	            }
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env.S3_URL": JSON.stringify(process.env.S3_URL)
		})
	],
	devtool: process.env.NODE_ENV === "production" ? "none" : "source-map"
};