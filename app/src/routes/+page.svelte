<script lang="ts">
	import '../app.css';
	import Hand from '$lib/components/Hand/Hand.svelte';
	import BettingFlow from '$lib/components/BettingFlow/BettingFlow.svelte';
	import type { Card, DrawCardsResponse } from '$lib/types';
	import { addUpCards, calculateResult } from '$lib/helpers/blackjack';

	let { data } = $props();

	let bet = $state(0);
	let balance = $state(1000);
	let playerCards = $state<Card[]>();
	let dealerCards = $state<Card[]>();
	let activeHand = $state(false);
	let showDealer = $state(false);
	let message = $state('Place your bet to start the game');

	async function drawCards(number: number) {
		if (data.responsePending) return;

		try {
			data.responsePending = true;
			const response = await fetch(
				`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckId')}/draw/?count=${number}`
			);

			if (!response.ok) {
				throw new Error();
			}

			return response.json() as DrawCardsResponse;
		} catch (err) {
			console.error('fetchDeck', err);
		} finally {
			data.responsePending = false;
		}
	}

	async function startDealer() {
		if (!activeHand) return;

		showDealer = true;
		if (
			addUpCards(dealerCards) >= 17 ||
			addUpCards(dealerCards) > addUpCards(playerCards) ||
			addUpCards(playerCards) > 21
		) {
			const result = calculateResult(bet, addUpCards(playerCards), addUpCards(dealerCards));

			if (result > bet) message = `You won € ${bet}!`;
			else if (result === bet) message = `You tied!`;
			else message = `You lost € ${bet}!`;

			balance += result;
			activeHand = false;

			return;
		}

		setTimeout(async () => {
			const cardsResponse = await drawCards(1);

			dealerCards?.push(...(cardsResponse?.cards ?? []));

			startDealer();
		}, 1000);
	}

	async function drawPlayerCard() {
		if (showDealer || addUpCards(playerCards) >= 21) return;

		const cardsResponse = await drawCards(1);

		playerCards?.push(...(cardsResponse?.cards ?? []));

		if (addUpCards(playerCards) >= 21) startDealer();
	}

	async function placeBet(value: number) {
		bet = value;
		balance -= value;
		showDealer = false;
		activeHand = true;
		message = 'Choose to hit or stand';

		const cardsResponse = await drawCards(4);
		playerCards = cardsResponse?.cards?.splice(0, 2);
		dealerCards = cardsResponse?.cards?.splice(0, 2);

		if (addUpCards(playerCards) === 21) {
			balance += bet * 4;
			showDealer = true;
			activeHand = false;
			message = `You won € ${bet}!`;
		}
	}
</script>

{#if data.error}
	<section class="error">
		Something went wrong while loading the application. Please try refreshing your page.
	</section>
{:else if !data.responsePending}
	<section class="game">
		<BettingFlow {activeHand} {placeBet} stand={startDealer} hit={drawPlayerCard} />

		<span class="message">{message}</span>

		<section class="hands">
			{#if dealerCards?.length}
				<Hand title="dealer" cards={dealerCards} show={showDealer} />
			{/if}

			{#if playerCards?.length}
				<Hand title="You" cards={playerCards} show />
			{/if}
		</section>

		<section class="box">
			<h2 class="balance">balance: € {balance}</h2>
			<h2 class="balance">current bet: € {bet}</h2>
		</section>
	</section>
{/if}

<style scoped>
	.error {
		font-weight: bold;
		font-size: 1.5em;
		text-align: center;
		margin-top: 10em;
		background: white;
		padding: 0.5em;
	}

	.game {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.message {
		font-family: JqkasWild;
		color: gold;
		font-weight: bold;
		font-size: 1.8em;
	}

	.hands {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2em;
		margin-top: 2em;
	}

	.box {
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		gap: 0.5em;
		border: 3px solid gold;
		bottom: 0;
		right: 0%;
		margin: 2em;
		padding: 2em;
		position: absolute;
	}

	.balance {
		font-family: JqkasWild;
		color: gold;
		font-size: 2em;
		margin: 0;
	}
</style>
