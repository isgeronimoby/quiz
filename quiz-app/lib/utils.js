// Wrapper for window.open()
//
export class Window {
	windowRef = null;
	windowTimer = null;

	open({url, title}, onClose) {
		let {windowRef, windowTimer} = this;

		if (windowRef == null || windowRef.closed) {
			windowRef = window.open(url, title, 'resizable=yes,scrollbars=yes,status=yes');
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


