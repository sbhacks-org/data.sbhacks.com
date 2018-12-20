import { combineReducers} from "redux";

import ApplicantsReducer from "./reducer-applicants";
import ApplicantReducer from "./reducer-applicant";

module.exports = combineReducers(
	{
		applicants: ApplicantsReducer,
		applicant: ApplicantReducer
	}
);