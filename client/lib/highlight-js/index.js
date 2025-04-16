/**
 * Tracks the promise to
 *
 * @type {Promise}
 */
let highlightJs = null;

/**
 * Dynamically loads the highlightJS bundle.
 *
 * @return {Promise}
 */
const getHighlightJs = () => {
	if (!highlightJs) {
		highlightJs = import(
			/* webpackChunkName: "highlightjs" */
			/* webpackMode: "lazy" */
			/* webpackExports: ["default", "named"] */
			'highlight.js'
		);

		highlightJs.catch(() => 'Failed to load highlight.js');
	}

	return highlightJs;
};

/**
 * Wrapper for highlightJS.highlightBlock.
 * This will also trigger loading of the highlightJS bundle if necessary.
 *
 * @param  {Element} element element
 */
export const highlightBlock = (element) =>
	getHighlightJs().then(({ default: hljs }) => hljs.highlightBlock(element));
