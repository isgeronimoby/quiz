import React, { Component, PropTypes } from 'react';

class Tabs extends Component {

	static propTypes = {
		items: PropTypes.array.isRequired,
		selectedItemId: PropTypes.string.isRequired,
		onSelect: PropTypes.func.isRequired,
	};

	render() {
		const { items, selectedItemId, onSelect } = this.props;
		const tabItems = items.map(({ tabId, label }, i) => {
			const selectedClass = (tabId === selectedItemId) ? 'selected' : '';
			const onClick = () => onSelect(tabId);

			return (
				<div key={`tab-${i}`} className={"tab-item " + selectedClass} onClick={ (onClick)}>
					{ label }
				</div>
			);
		});

		return (
			<ul className="tabs">
				{ tabItems }
			</ul>
		);
	}

}

export default Tabs;
