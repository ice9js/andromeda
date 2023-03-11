/**
 * External dependencies
 */
import React from 'react';

import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faPinterest } from '@fortawesome/free-brands-svg-icons/faPinterest';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons/faAnglesLeft';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons/faAnglesRight';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faRss } from '@fortawesome/free-solid-svg-icons/faRss';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

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
