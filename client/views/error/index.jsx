/**
 * External dependencies
 */
import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Internal dependencies
 */
import ErrorCode from 'components/error-code';
import { config } from 'config';

const ErrorView = ({ error }) => {
	const status = error.response?.status || 500;
	const message = status === 404 ? `Page doesn't exist` : 'Something went wrong';

	return (
		<>
			<Helmet>
				<title>{`${message} - ${config('app.name')}`}</title>
				<meta name="robots" content="noindex" />
			</Helmet>

			<ErrorCode code={status} />
		</>
	);
};

export default ErrorView;
