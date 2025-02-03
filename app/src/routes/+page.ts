import { browser } from '$app/environment';
import type { PageLoad } from './$types';
import type { GetNewDeckResponse } from '$lib/types';

export const load: PageLoad = async () => {
	let error = false;
	let responsePending = true;

	if (browser && !localStorage.getItem('deckId')) {
		try {
			const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6');

			if (!response.ok) {
				throw new Error();
			}

			const deck: GetNewDeckResponse = await response.json();

			if (deck.success && deck.deck_id) {
				localStorage.setItem('deckId', deck.deck_id);
			}
		} catch (err) {
			console.error('fetchDeck', err);
			error = true;
		} finally {
			responsePending = false;
		}
	} else if (browser) {
		try {
			const response = await fetch(
				`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckId')}/shuffle/`
			);

			if (!response.ok) {
				throw new Error();
			}
		} catch (err) {
			console.error('shuffleDeck', err);
			error = true;
		} finally {
			responsePending = false;
		}
	}

	return {
		error,
		responsePending
	};
};
