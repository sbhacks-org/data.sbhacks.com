import React from 'react';

class RatingSelect extends React.Component {
	render () {
		var rating = '';
		if (this.props.rating) {
			rating = this.props.rating;
		}
		return(
			<select value={rating} onChange={this.props.handleChange}>
			  <option value=''>/</option>
			  <option value="1">1</option>
			  <option value="2">2</option>
			  <option value="3">3</option>
			  <option value="4">4</option>
			  <option value="5">5</option>
			</select>
		);
	}
}

export default RatingSelect;