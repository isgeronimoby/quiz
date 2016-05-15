// Wrapper for window.open()
//
export class Window {
	windowRef = null;
	windowTimer = null;

	open({url, title, settings}, onClose) {
		let {windowRef, windowTimer} = this;

		if (windowRef == null || windowRef.closed) {
			windowRef = window.open(url, title, settings || 'resizable=yes,scrollbars=yes,status=yes');
			windowRef.focus();
			windowTimer = setInterval(() => {
				if (windowRef.closed) {
					clearInterval(windowTimer);
					windowRef = null;
					onClose();
				}
			}, 500);
		} else {
			windowRef.focus();
		}
	}
}

// Ugly browser-sniff
//
export const isSafari = navigator.userAgent.indexOf("Safari") > -1;


// Assuming the list is sorted by endDate, then return the first one that is not selected,
// so it will be for sure either a) latest live or b) latest drawn.
//
export function getNextDrawItem(drawList, selectedDrawItem = {}) {
	for (let draw of drawList) {
		if (draw.drawId !== selectedDrawItem.drawId) {
			return draw;
		}
	}
	return undefined;
}
