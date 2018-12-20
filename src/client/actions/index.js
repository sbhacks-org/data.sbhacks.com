export const setRating = (user_id, rating) => {
	console.log("Setting rating of " + user_id + " to " + rating);
	/*
	return {
		type: 'APPLICANT_RATING_CHANGED',
		payload: rating
	};
	*/
	return function(dispatch, getState) {
		var xhttp = new XMLHttpRequest();

		xhttp.addEventListener("load", () => {
			let response = JSON.parse(xhttp.responseText);
			dispatch({
				type: "APPLICANT_RATING_CHANGED",
				payload: response
			});
		});
		xhttp.open("PUT", "/update-rating");
		xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		var body = {id: user_id, rating: rating};
		xhttp.send(JSON.stringify(body));
	};
	
}; 

export const fetchRating = (application) => {
	console.log('fetching rating');
	return {
		type: "FETCH_APPLICANT_RATING",
		payload: application
	}
}

export const updateApplicants = (applicants) => {
	console.log('updating applicants');
	return {
		type: "UPDATE_APPLICANTS_STATE",
		payload: applicants
	}
}