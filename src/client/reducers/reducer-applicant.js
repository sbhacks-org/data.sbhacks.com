const initialState = {
	"id":null,
	"phone_number":null,
	"gender":null,
	"major":null,
	"graduation_year":null,
	"level_of_study":"",
	"transportation":null,
	"github":null,
	"linkedin":null,
	"shirt_size":null,
	"dietary_restrictions":null,
	"checked_in":null,
	"rsvp":null,
	"accepted":null,
	"rating":null,
	"createdAt":null,
	"updatedAt":null,
	"school_id":null,
	"user_id":null,
	"essay_answer":null,
	"first_name":null,
	"last_name":null,
	"email":null,
	"password":null,
	"passwordResetToken":null,
	"passwordResetTokenExpires":null,
	"school_name":null,
	"application_id":null
};

const reducer_applicant= (state = initialState, action) =>
{	
	return state;
	
	switch(action.type)
	{
		case "APPLICANT_RATING_CHANGED": {
			return { ...state, rating: action.payload };
		}
		default:
			return state;
	}
};

export default reducer_applicant;