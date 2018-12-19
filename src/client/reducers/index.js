import { combineReducers} from "redux";

import ApplicantReducer from "./reducer-applicants";

module.exports = combineReducers(
	{
		applicants: ApplicantReducer
	}
);