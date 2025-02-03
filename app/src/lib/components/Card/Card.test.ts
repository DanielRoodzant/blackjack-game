import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Card from './Card.svelte';

describe('Card Component', () => {
	test('renders front of card when flipped is true', () => {
		const { getByAltText } = render(Card, { flipped: true, imageUrl: 'test.jpg', cardCode: 'AS' });
		const img = getByAltText('AS');
		expect(img).toBeInTheDocument();
	});

	test('renders back of card when flipped is false', () => {
		const { container } = render(Card, { flipped: false, imageUrl: 'test.jpg', cardCode: 'AS' });
		const backSection = container.querySelector('.back');
		expect(backSection).toBeInTheDocument();
	});

	test('toggles between front and back when flipped prop changes', async () => {
		const { rerender, getByAltText, container } = render(Card, {
			flipped: false,
			imageUrl: 'test.jpg',
			cardCode: 'AS'
		});
		const backSection = container.querySelector('.back');
		expect(backSection).toBeInTheDocument();

		await rerender({ flipped: true });
		const img = getByAltText('AS');
		expect(img).toBeInTheDocument();
	});
});
