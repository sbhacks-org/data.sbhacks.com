import React from 'react';

import RatingSelect from './RatingSelect'

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { setRating } from '../../actions';
import { fetchRating } from '../../actions';


class Applicant extends React.Component {
	constructor(props) {
		super(props);

		var rating = "/";
		if (this.props.application.rating)
		{
			rating = this.props.application.rating;
		}
		this.state = {
			id: this.props.application.application_id,
			rating: rating
		};
	}

	handleChange(e) {
		this.setState({rating: e.target.value});
		console.log("in applicant", this.state);
		this.props.setRating(this.props.application.application_id, e.target.value);
		console.log(this.state);
	}

	render () {
		const application = this.props.application;
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
	return bindActionCreators({setRating: setRating, fetchRating: fetchRating}, dispatch);
};

export default connect(null, mapDispatchToProps)(Applicant);