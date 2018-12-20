const initialState = {
	id:null,
	rating:null
};

const reducer_applicant= (state = initialState, action) =>
{	
	switch(action.type)
	{
		case "APPLICANT_RATING_CHANGED": {
			console.log("in rating changed");
			return { ...state, rating: action.payload };
		}
		case "FETCH_APPLICANT_RATING": {
			return { ...state, id: action.payload.application_id, rating: action.payload.rating };
		}
		default: {
			console.log("in default");
			return state;
		}
	}
};

export default reducer_applicant;