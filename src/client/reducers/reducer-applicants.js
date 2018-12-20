const initialState = {
	applicants: null
};



const reducer_applicants = (state = initialState, action) =>
{	
	switch(action.type)
	{
		case "APPLICANT_RATING_CHANGED": {
			const updatedApplicants = state.map(applicant => {
				if (applicant.application_id === action.payload.id) {
					return { ...applicant , rating: action.payload.rating };
				}
				return applicant;
			});
			return updatedApplicants;
		}
		default: {
			return state;
		}
	}
	return state;
};

export default reducer_applicants;