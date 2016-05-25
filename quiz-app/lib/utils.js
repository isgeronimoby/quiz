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


// Returns next *active* draw item after selected item: [a]
//  - if selected is the last active, then the first (active) item in list (loop). [b]
//  - if selected is the only active, then next item (despite it is inactive). [c]
//  - if selected is inactive, then first item. [d]
//
export function getNextDrawItem(drawList, selectedDrawId) {
	const selectedItem = drawList.find(({ drawId }) => drawId === selectedDrawId);
	const nextItem = drawList[drawList.indexOf(selectedItem) + 1];
	const firstItem = drawList[0];

	if (!nextItem.isDrawn) {
		return nextItem; //a
	} else if (firstItem === selectedItem) {
		return nextItem; //c
	} else {
		return firstItem; //b, d
	}
}


export function findPublicPath() {
	const appScript = document.getElementById('entry');
	if (appScript) {
		return appScript.src.substring(appScript.src.indexOf('/'), appScript.src.lastIndexOf('/') + 1);
	} else {
		return './';
	}
}
