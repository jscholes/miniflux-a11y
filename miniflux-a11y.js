const UNREAD_PATH = '/unread';

function init() {
	if (window.location.pathname === UNREAD_PATH) {
		const itemsContainer = document.querySelector('div.items');

		// Make this a focusable list so screen readers switch modes.
		itemsContainer.role = 'list';
		itemsContainer.tabIndex = '-1';
		itemsContainer.setAttribute('aria-labelledby', 'page-header-title');

		// Give all items a list item role.
		itemsContainer.querySelectorAll('article').forEach(item => {
			item.role = 'listitem';
		});

		// Focus the first unread item.
		const firstItem = itemsContainer.querySelector('article')
		firstItem.classList.add('current-item');
		firstItem.focus();
	}
}

window.addEventListener('load', init);