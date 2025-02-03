import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Hand from './Hand.svelte';
import type { Card } from '$lib/types';

describe('Hand Component', () => {
	const mockCards: Card[] = [
		{ value: 'ACE', code: 'AS', image: 'path/to/ace_of_spades.png' },
		{ value: '10', code: '10H', image: 'path/to/ten_of_hearts.png' }
	];

	test('renders title correctly', () => {
		const { getByText } = render(Hand, { title: 'Player', cards: mockCards, show: true });
		expect(getByText('Player - 21')).toBeInTheDocument();
	});

	test('renders cards correctly', () => {
		const { getAllByRole } = render(Hand, { title: 'Player', cards: mockCards, show: true });
		const cardImages = getAllByRole('img');
		expect(cardImages).toHaveLength(2);
		expect(cardImages[0]).toHaveAttribute('src', 'path/to/ace_of_spades.png');
		expect(cardImages[1]).toHaveAttribute('src', 'path/to/ten_of_hearts.png');
	});

	test('hides card values when show is false', () => {
		const { getByText } = render(Hand, { title: 'Player', cards: mockCards, show: false });
		expect(getByText('Player')).toBeInTheDocument();
		expect(() => getByText('Player - 21')).toThrow();
	});
});
