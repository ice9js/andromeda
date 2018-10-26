/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { tap } from 'lodash';

const disqus_shortname = 'besidesprogramming';

class DisqusThread extends PureComponent {

	static propTypes = {
		id: PropTypes.number.isRequired,
		url: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	};

	componentDidMount() {
		this.loadDisqus();
	}

	componentDidUpdate( prevProps ) {
		if (
			this.props.id === prevProps.id &&
			this.props.url === prevProps.url &&
			this.props.title === prevProps.title
		) {
			return;
		}

		this.loadDisqus();
	}

	loadDisqus() {
		if ( ! window.DISQUS ) {
			return ( document.head || document.body ).appendChild( tap(
				document.createElement( 'script' ),
				( disqus ) => {
					disqus.setAttribute( 'async', true );
					disqus.setAttribute( 'src', `//${ disqus_shortname }.disqus.com/embed.js` );
				}
			) );
		}

		window.DISQUS.reset( { reload: true } );
	}

	render() {
		window.disqus_shortname = disqus_shortname;
		window.disqus_identifier = this.props.id;
		window.disqus_title = this.props.title;
		window.disqus_url = this.props.url;

		return <div id="disqus_thread" className="disqus-thread"></div>;
	}
}

export default DisqusThread;
