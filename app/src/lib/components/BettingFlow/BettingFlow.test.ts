import { describe, test, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import BettingFlow from './BettingFlow.svelte';

const hitMock = vi.fn();
const standMock = vi.fn();
const placeBetMock = vi.fn();

describe('BettingFlow Component', () => {
	test('renders hit and stand buttons when activeHand is true', () => {
		const { getByText } = render(BettingFlow, {
			props: { hit: hitMock, stand: standMock, placeBet: placeBetMock, activeHand: true }
		});

		expect(getByText('Hit')).toBeInTheDocument();
		expect(getByText('Stand')).toBeInTheDocument();
	});

	test('renders input and place bet button when activeHand is false', () => {
		const { getByText, getByRole } = render(BettingFlow, {
			props: { hit: hitMock, stand: standMock, placeBet: placeBetMock, activeHand: false }
		});

		expect(getByRole('spinbutton')).toBeInTheDocument();
		expect(getByText('place Bet')).toBeInTheDocument();
	});

	test('calls hit function when hit button is clicked', async () => {
		const { getByText } = render(BettingFlow, {
			props: { hit: hitMock, stand: standMock, placeBet: placeBetMock, activeHand: true }
		});

		const hitButton = getByText('Hit');
		await fireEvent.click(hitButton);

		expect(hitMock).toHaveBeenCalled();
	});

	test('calls stand function when stand button is clicked', async () => {
		const { getByText } = render(BettingFlow, {
			props: { hit: hitMock, stand: standMock, placeBet: placeBetMock, activeHand: true }
		});

		const standButton = getByText('Stand');
		await fireEvent.click(standButton);

		expect(standMock).toHaveBeenCalled();
	});

	test('calls placeBet function with correct amount when place bet button is clicked', async () => {
		const { getByText, getByRole } = render(BettingFlow, {
			props: { hit: hitMock, stand: standMock, placeBet: placeBetMock, activeHand: false }
		});

		const placeBetButton = getByText('place Bet');
		await fireEvent.click(placeBetButton);

		expect(placeBetMock).toHaveBeenCalledTimes(0);

		const input = getByRole('spinbutton');
		await fireEvent.input(input, { target: { value: '-50' } });
		await fireEvent.click(placeBetButton);

		expect(placeBetMock).toHaveBeenCalledTimes(0);

		await fireEvent.input(input, { target: { value: '50' } });
		await fireEvent.click(placeBetButton);

		expect(placeBetMock).toHaveBeenCalledWith(50);
	});
});
