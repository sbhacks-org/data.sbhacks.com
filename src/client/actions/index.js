export const setRating = (user_id, rating) => {
	console.log("Set rating of " + user_id + " to " + rating);
	/*
	return {
		type: 'APPLICANT_RATING_CHANGED',
		payload: rating
	};
	*/
	return function(dispatch, getState) {
		console.log('in return func');

		var xhttp = new XMLHttpRequest();

		xhttp.addEventListener("load", () => {
			console.log('in xhttp');
			console.log(xhttp.responseText);
			let response = JSON.parse(xhttp.responseText);
			console.log(response);
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