<script lang="ts">
	let { hit, stand, placeBet, activeHand } = $props();

	let amount = $state<number>();
</script>

<section class="betting-flow">
	{#if activeHand}
		<button class="button" onclick={hit}>Hit</button>

		<button class="button" onclick={stand}>Stand</button>
	{:else}
		<input bind:value={amount} type="number" class="input" />

		<button
			aria-disabled={activeHand}
			class="button"
			onclick={() => (!amount || amount <= 0 ? undefined : placeBet(amount))}
		>
			place Bet
		</button>
	{/if}
</section>

<style>
	.betting-flow {
		display: flex;
		gap: 1em;
		margin: 2em 0;
	}

	.input {
		height: 2em;
	}

	.button {
		height: 2em;
		min-width: 4em;
		background-color: gold;
		border-radius: 16px;
		font-size: medium;
		font-weight: bold;
		cursor: pointer;
	}
</style>
