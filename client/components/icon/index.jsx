/**
 * External dependencies
 */
import React from 'react';
import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebookF,
	faDiscord,
	faInstagram,
	faPinterest,
	faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
	faArrowLeft,
	faArrowRight,
	faAngleDoubleLeft,
	faAngleDoubleRight,
	faBars,
	faEllipsisH,
	faRss,
	faSearch,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';

// Add chosen icons to the library
library.add(
	faArrowLeft,
	faArrowRight,
	faAngleDoubleLeft,
	faAngleDoubleRight,
	faBars,
	faEllipsisH,
	faFacebookF,
	faDiscord,
	faInstagram,
	faPinterest,
	faRss,
	faSearch,
	faTimes,
	faTwitter,
);

export const getIconsCss = dom.css;

const Icon = ( props ) => <FontAwesomeIcon { ...props } />;

export default Icon;
