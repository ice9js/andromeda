/**
 * External dependencies
 */
import React from 'react';
import { decode } from 'he';

/**
 * Internal dependencies
 */
import Icon from 'components/icon';
import ShareButton from 'components/share-button';
import { formatDate } from 'lib/date';
import { facebookShareUrl, pinterestShareUrl, twitterShareUrl } from 'lib/social';

const PostHeader = ({ post }) => (
	<div className="post-header">
		<h2 className="post-header__title">
			<a className="post-header__link" href={`/${post.slug}`}>
				{decode(post.title)}
			</a>
		</h2>

		<div className="post-header__meta">
			<ShareButton
				compact
				className={'facebook'}
				icon={<Icon icon={['fab', 'facebook-f']} />}
				label={'Share'}
				url={facebookShareUrl(post.url)}
			/>
			<ShareButton
				compact
				className={'twitter'}
				icon={<Icon icon={['fab', 'twitter']} />}
				label={'Tweet'}
				url={twitterShareUrl(post.url, decode(post.title))}
			/>
			<ShareButton
				compact
				className={'pinterest'}
				icon={<Icon icon={['fab', 'pinterest']} />}
				label={'Pin'}
				url={pinterestShareUrl(post.url, decode(post.title), post.feature_image)}
			/>

			<span className="post-header__date">{formatDate(post.published_at)}</span>
		</div>
	</div>
);

export default PostHeader;
