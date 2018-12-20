import React from 'react';
import RatingSelect from './RatingSelect'

class Applicant extends React.Component {
	constructor(props) {
		super(props);
		
		var rating = "/"
		if (this.props.application.rating)
		{
			rating = this.props.application.rating;
		}
		this.state = {
			rating: rating
		}
		console.log(this.state.rating);
		
	}

	
	handleChange(e) {
		this.setState({rating: e.target.value});
		this.props.setRating(this.props.application.id, e.target.value);
	}
	

	render () {
		const application = this.props.application;
		console.log(application);
		var school_name = application.school_name.substr(0, 50);
		var github = application.github || "N/A";
		var linkedin = application.linkedin || "N/A";
		var url = process.env["S3_URL"]+'/'+application.id+'.pdf';
		/*
		var rating = "/"
		if (application.rating)
		{
			rating = application.rating;
		}
		*/

		return(
				<tr>
					<td>{application.first_name} {application.last_name}</td>
					<td>{school_name}</td>
					<td>{application.major}</td>
					<td>{application.graduation_year}</td>
					<td>{application.level_of_study}</td>
					<td>{github}</td>
					<td>{linkedin}</td>
					<td>{application.essay_answer}</td>
					<td><a target="_blank" href={url}>View Resume</a></td>
					<td>
						<RatingSelect rating = {this.state.rating} handleChange={this.handleChange.bind(this)} />
					</td>
				</tr>
		);
	}
}


const mapDispatchToProps=(dispatch) => {
	return bindActionCreators({setRating: setRating}, dispatch);
};

export default connect(mapDispatchToProps)(Applicant);