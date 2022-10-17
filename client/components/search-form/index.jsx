/**
 * External dependencies
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

/**
 * Internal dependencies
 */
import Icon from 'components/icon';

const SearchForm = ( { defaultQuery } ) => {
	const [ query, setQuery ] = useState(defaultQuery || '');

	const navigate = useNavigate();

	const updateQuery = ( event ) => setQuery( event.target.value );

	const handleSubmit = ( event ) => {
		event.preventDefault();
		query && navigate( `/search?q=${ encodeURIComponent( query ) }` );
	};

	return (
		<form
			className="search-form"
			autoComplete="off"
			action="/search"
			method="get"
			onSubmit={ handleSubmit }
		>
			<input
				className="search-form__input"
				name="q"
				placeholder="Search..."
				value={ query }
				onChange={ updateQuery } />
			<button className="search-form__button" type="submit" title="Search">
				<Icon icon="magnifying-glass" />
			</button>
		</form>
	);
};

SearchForm.propTypes = {
	defaultQuery: PropTypes.string,
};

export default SearchForm;
