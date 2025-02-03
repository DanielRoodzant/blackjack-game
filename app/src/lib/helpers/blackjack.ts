import type { Card } from '$lib/types';

export function addUpCards(cards?: Card[]) {
	if (!cards?.length) return 0;

	let count = 0;

	cards.forEach((card) => {
		if (!card.value) return;

		if (card.value === 'QUEEN' || card.value === 'JACK' || card.value === 'KING') {
			count += 10;
		} else if (card.value === 'ACE') {
			count += 11;
		} else if (+card.value) {
			count += +card.value;
		}
	});

	cards.forEach((card) => {
		if (count > 21 && card.value === 'ACE') {
			count -= 10;
		}
	});

	return count;
}

export function calculateResult(bet: number, player: number, dealer: number) {
	if (player > 21 || (dealer > player && dealer <= 21)) return 0;
	else if (player === dealer) return bet;
	else return bet * 2;
}
