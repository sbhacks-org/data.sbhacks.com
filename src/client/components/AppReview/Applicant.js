import React from 'react';

const Applicant = ({application}) => {
	var school_name = application.school_name.substr(0, 50);
	var github = application.github || "N/A";
	var linkedin = application.linkedin || "N/A";
	var url = process.env["S3_URL"]+'/'+application.id+'.pdf';
	
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
			</tr>
	);
};

export default Applicant;