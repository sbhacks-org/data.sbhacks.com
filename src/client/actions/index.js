export const setRating = (user_id, rating) => {
	console.log("Set rating of " + user_id + " to " + rating);
	return {
		type: 'APPLICANT_RATING_CHANGED',
		payload: rating
	};
}; 