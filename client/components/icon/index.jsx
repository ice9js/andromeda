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
	faAnglesLeft,
	faAnglesRight,
	faBars,
	faEllipsisH,
	faMagnifyingGlass,
	faRss,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';

// Add chosen icons to the library
library.add(
	faArrowLeft,
	faArrowRight,
	faAnglesLeft,
	faAnglesRight,
	faBars,
	faEllipsisH,
	faFacebookF,
	faDiscord,
	faInstagram,
	faMagnifyingGlass,
	faPinterest,
	faRss,
	faTimes,
	faTwitter,
);

export const getIconsCss = dom.css;

const Icon = ( props ) => <FontAwesomeIcon { ...props } />;

export default Icon;
