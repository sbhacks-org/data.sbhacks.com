import React from 'react';

class Applicant extends React.Component {
	constructor() {
		super();
	}

	render () {
		const application = this.props.applicant;
		const { setRating } = this.props;
		var school_name = application.school_name.substr(0, 50);
		var github = application.github || "N/A";
		var linkedin = application.linkedin || "N/A";
		var url = process.env["S3_URL"]+'/'+application.id+'.pdf';
		var rating = "/";
		if (application.rating)
			rating = application.rating;

		return(
				<tr>
					<td>{application.first_name} {application.last_name}</td>
					<td>{school_name}</td>
					<td>{application.major}</td>
					<td>{application.graduation_year}</td>
					<td>{application.level_of_study}</td>
					<td>{github}</td>
					<td>{linkedin}</td>
					<td><a target="_blank" href={url}>View Resume</a></td>
					<td>
						<select value={rating}>
						  <option value="/">/</option>
						  <option value="1">1</option>
						  <option value="2">2</option>
						  <option value="3">3</option>
						  <option value="4">4</option>
						  <option value="5">5</option>
						</select>
					</td>
				</tr>
		);
	}
}

export default Applicant;