/**
 * hasScrollbar is a JavaScript function to determine if the current
 * window is scrollable or not, on a given axe or both.
 *
 * @Author: Tyler Cipriani
 * @Resource: https://gist.github.com/numee/1e7a19cd26113323f1ae
 * @Resource: https://tylercipriani.com/blog/2014/07/12/crossbrowser-javascript-scrollbar-detection/
 *
 * @param {optional string} axe - The axe where the scroll is checked. Must be "x" or "y".
 * @return {boolean}
 */
let hasScrollbar = function(axe) {
    let rootElem = document.documentElement || document.body,
        overflowStyle,
        overflowYStyle;
    if (typeof rootElem.currentStyle !== 'undefined') {
        overflowStyle = rootElem.currentStyle.overflow;
        overflowYStyle = rootElem.currentStyle.overflowY;
    }
    overflowStyle = overflowStyle || window.getComputedStyle(rootElem, '').overflow;
    overflowYStyle = overflowYStyle || window.getComputedStyle(rootElem, '').overflowY;

    if (axe === 'x') {
        let contentOverflows = rootElem.scrollWidth > rootElem.clientWidth,
            overflowShown = /^(visible|auto)$/.test(overflowStyle),
            alwaysShowScroll = overflowStyle === 'scroll';
        return (contentOverflows && overflowShown) || (alwaysShowScroll);
    }
    else if (axe === 'y') {
        let contentOverflows = rootElem.scrollHeight > rootElem.clientHeight,
            overflowShown = /^(visible|auto)$/.test(overflowYStyle),
            alwaysShowScroll = overflowYStyle === 'scroll';
        return (contentOverflows && overflowShown) || (alwaysShowScroll);
    }
    else {
        let contentOverflows = rootElem.scrollWidth > rootElem.clientWidth || rootElem.scrollHeight > rootElem.clientHeight,
            overflowShown    = /^(visible|auto)$/.test(overflowStyle) || /^(visible|auto)$/.test(overflowYStyle),
            alwaysShowScroll = overflowStyle === 'scroll' || overflowYStyle === 'scroll';

        return (contentOverflows && overflowShown) || (alwaysShowScroll);
    }
};

export default {
    window: {
        hasScrollbar: hasScrollbar
    }
};