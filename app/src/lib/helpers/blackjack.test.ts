import { describe, it, expect } from 'vitest';
import type { Card } from '$lib/types';
import { addUpCards, calculateResult } from './blackjack';

describe('addUpCards', () => {
	it('should return 0 if no cards are provided', () => {
		expect(addUpCards()).toBe(0);
	});

	it('should return 0 if provided cards have no value', () => {
		expect(addUpCards([{ code: '4H' }, { code: 'AS' }])).toBe(0);
	});

	it('should correctly sum the values of number cards', () => {
		const cards: Card[] = [{ value: '2' }, { value: '3' }, { value: '4' }];
		expect(addUpCards(cards)).toBe(9);
	});

	it('should correctly sum the values of face cards', () => {
		const cards: Card[] = [{ value: 'QUEEN' }, { value: 'JACK' }, { value: 'KING' }];
		expect(addUpCards(cards)).toBe(30);
	});

	it('should correctly sum the values of aces as 11', () => {
		const cards: Card[] = [{ value: 'ACE' }, { value: 'ACE' }];
		expect(addUpCards(cards)).toBe(12);
	});

	it('should correctly adjust the value of aces if the total exceeds 21', () => {
		const cards: Card[] = [{ value: 'ACE' }, { value: '9' }, { value: 'ACE' }];
		expect(addUpCards(cards)).toBe(21);
	});

	it('should correctly handle a mix of card values', () => {
		const cards: Card[] = [{ value: '2' }, { value: '3' }, { value: 'ACE' }, { value: 'KING' }];
		expect(addUpCards(cards)).toBe(16);
	});

	it('should correctly handle multiple aces and adjust their values', () => {
		const cards: Card[] = [{ value: 'ACE' }, { value: 'ACE' }, { value: '9' }, { value: 'ACE' }];
		expect(addUpCards(cards)).toBe(12);
	});
});

describe('calculateResult', () => {
	it('should return 0 if player busts', () => {
		expect(calculateResult(100, 22, 18)).toBe(0);
	});

	it('should return 0 if dealer wins', () => {
		expect(calculateResult(100, 18, 19)).toBe(0);
		expect(calculateResult(100, 18, 21)).toBe(0);
	});

	it('should return the bet if it is a tie', () => {
		expect(calculateResult(100, 20, 20)).toBe(100);
	});

	it('should return double the bet if player wins', () => {
		expect(calculateResult(100, 21, 20)).toBe(200);
		expect(calculateResult(100, 19, 18)).toBe(200);
		expect(calculateResult(100, 21, 22)).toBe(200);
	});
});
