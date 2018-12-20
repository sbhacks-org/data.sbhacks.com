import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Applicant from './Applicant';

import { updateApplicants } from '../../actions';

class AppReview extends React.Component {
	constructor(props) {
		super(props);
	} 

	render () {
		const applicantList = this.props.applicants.map((applicant) => 
			<Applicant application = {applicant} setRating = {this.props.setRating} />
		);
		

		return(
			
			<table>
				<tr>
					<th>Name</th>
					<th>School</th>
					<th>Major</th>
					<th>Grad Year</th>
					<th>Level of Study</th>
					<th>Github</th>
					<th>Linkedin</th>
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
	return bindActionCreators({updateApplicants: updateApplicants}, dispatch);
}


export default connect(mapStateToProps)(AppReview);