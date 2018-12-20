export const setRating = (user_id, rating) => {
	console.log("Set rating of " + user_id + " to " + rating);
	/*
	return {
		type: 'APPLICANT_RATING_CHANGED',
		payload: rating
	};
	*/
	return function(dispatch, getState) {
		let state = getState();

		const { applicant } = state;

		var xhttp = new XMLHttpRequest();

		xhttp.addEventListener("load", () => {
			let response = JSON.parse(xhttp.responseText);
			console.log(response);
			dispatch({
				type: "APPLICANT_RATING_CHANGED",
				payload: response
			});
		});
		xhttp.open("PUT", "/update-rating");
		xhttp.send(JSON.stringify({id: applicant.application_id, rating: applicant.rating}));
	};
	
}; 