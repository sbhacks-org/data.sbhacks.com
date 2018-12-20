import React from 'react';

class RatingSelect extends React.Component {
	render () {
		return(
			<select value={this.props.rating} onChange={this.props.handleChange}>
			  <option value="/">/</option>
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