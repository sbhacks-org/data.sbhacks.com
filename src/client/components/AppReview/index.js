import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Applicant from './Applicant';

import { setRating } from '../../actions';
import { updateApplicants } from '../../actions';

class AppReview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			applicants: this.props.applicants
		}
		console.log(this.props);
	} 

	handleChange(e) {

	}

	render () {
		const applicantList = this.props.applicants.map((applicant) => 
			<Applicant application = {applicant} setRating = {this.props.setRating} />
		);
		
		const thinCol = {
			width: '100px'
		};

		return(
			
			<table>
				<tr>
					<th>Name</th>
					<th>School</th>
					<th>Major</th>
					<th>Grad Year</th>
					<th>Level of Study</th>
					<th style = {thinCol}>Github</th>
					<th style = {thinCol}> Linkedin</th>
					<th>Essay</th>
					<th>Resume</th>
					<th>Rating</th>
				</tr>
				<tbody>
					{applicantList}
				</tbody>
			</table>
		);
	}
}


const mapStateToProps=(state) => {
	return {
		applicants: state.applicants	
	}
};

const mapDispatchToProps=(dispatch) => {
	return bindActionCreators({setRating: setRating}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(AppReview);