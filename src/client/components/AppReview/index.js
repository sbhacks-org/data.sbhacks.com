import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Applicant from 'Applicant';

class AppReview extends React.Component {
	constructor(props) {
		super(props);
	} 

	render () {
		return(
			const { applications } = this.props;
			<table>
				<tr>
					<th>Name</th>
					<th>School</th>
					<th>Major</th>
					<th>Grad Year</th>
					<th>Level of Study</th>
					<th>Github</th>
					<th>Linkedin</th>
					<th>Resume</th>
				</tr>
				<tbody>
					{applications.map(application => {
						<Applicant application = {application} />
					})}
				</tbody>
			</table>
		);
	}
}


const mapStateToProps=(state) => {
	return {
		
	}
}

export default connect(mapStateToProps)(AppReview);