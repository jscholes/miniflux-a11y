const UNREAD_PATH = '/unread';

let globalIDCounter = 0;

function init() {
	if (window.location.pathname === UNREAD_PATH) {
		// Create some hidden text nodes to hold labelling parts.
		const colonNode = makeHiddenTextNode('a11y-colon', ':');
		const semicolonNode = makeHiddenTextNode('a11y-semicolon', ';');
		const fromNode = makeHiddenTextNode('a11y-from', 'from');
		const inNode = makeHiddenTextNode('a11y-in', 'in');

		const itemsContainer = document.querySelector('div.items');

		// Make this a focusable list so screen readers switch modes.
		itemsContainer.role = 'list';
		itemsContainer.tabIndex = '-1';
		itemsContainer.setAttribute('aria-labelledby', 'page-header-title');

		// Give all items a list item role, and make their accessible names more descriptive.
		itemsContainer.querySelectorAll('article').forEach(item => {
			item.role = 'listitem';

			let labelledBy = item.getAttribute('aria-labelledby');
			labelledBy = `${labelledBy} ${colonNode.id}`;

			const relativeTimeID = assignAutoID(item.querySelector('time'));
			labelledBy = `${labelledBy} ${relativeTimeID}`;

			const categoryID = assignAutoID(item.querySelector('.category > a'));
			labelledBy = `${labelledBy} ${inNode.id} ${categoryID}`;

			const feedTitleID = assignAutoID(item.querySelector('.item-meta-info-title > a'));
			labelledBy = `${labelledBy} ${semicolonNode.id} ${feedTitleID}`;

			item.setAttribute('aria-labelledby', labelledBy);
		});

		// Focus the first unread item.
		const firstItem = itemsContainer.querySelector('article')
		firstItem.classList.add('current-item');
		firstItem.focus();
	}
}

function makeHiddenTextNode(id, text) {
	const node = document.createElement('span');

	node.setAttribute('id', id);
	node.hidden = true;
	node.textContent = text;

	document.body.appendChild(node);

	return node;
}

function assignAutoID(element) {
	const newID = `a11y-auto-${globalIDCounter}`;
	element.setAttribute('id', newID);
	globalIDCounter++;
	return newID;
}

window.addEventListener('load', init);