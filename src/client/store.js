import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import reducers from "./reducers";

let applications = window.APPLICATIONS || undefined;

delete window.APPLICATIONS;

let middleware = [thunk];

if(process.env.NODE_ENV !== "production") {
	middleware = [...middleware, logger]
}

module.exports = createStore(reducers, applications, applyMiddleware(...middleware));
