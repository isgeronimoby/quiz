// Wrapper for window.open()
//
export function Window() {
	var W = {};
	var windowRef = null;
	var windowTimer = null;

	W.open = function ({url, settings}, onClose) {
		if (windowRef == null || windowRef.closed) {
			windowTimer = window.setInterval(function () {
				if (!windowRef || windowRef.closed) {
					window.clearInterval(windowTimer);
					windowRef = null;
					onClose();
				}
			}, 500);

			// Note: only '_blank' is supported by old Chrome/iOS
			// See: https://bugs.chromium.org/p/chromium/issues/detail?id=136610#c68
			windowRef = window.open(url, '_blank', settings || 'resizable=yes,scrollbars=yes,status=yes');
			windowRef.focus();
		} else {
			windowRef.focus();
		}
	};

	return W;
}

// is Safari: feature-detect
//
export const isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;


// Return next draw item after selected, if selected is the last, then the first item in list.
// Do not consider items status. For bet-exit this is always the first draw item.
//
export function getNextDrawItem(drawList, selectedDrawId) {
	const selectedDraw = drawList.find(({ drawId }) => drawId === selectedDrawId);
	const selectedDrawIdx = drawList.indexOf(selectedDraw);

	return drawList[selectedDrawIdx + 1]; // first if idx === -1
}
