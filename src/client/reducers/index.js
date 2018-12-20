import { combineReducers} from "redux";

import ApplicantsReducer from "./reducer-applicants";

module.exports = combineReducers(
	{
		applicants: ApplicantsReducer
	}
);