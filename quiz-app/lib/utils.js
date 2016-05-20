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
