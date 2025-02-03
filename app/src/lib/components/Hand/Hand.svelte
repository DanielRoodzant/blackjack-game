<script lang="ts">
	import CardComponent from '$lib/components/Card/Card.svelte';
	import { addUpCards } from '$lib/helpers/blackjack';
	import type { Card } from '$lib/types';

	interface Props {
		title: string;
		cards: Card[];
		show: boolean;
	}

	let { title, cards, show }: Props = $props();
</script>

<section class="hand">
	<section class="hand__right">
		<h1 class="title">{title}{show ? ` - ${addUpCards(cards)}` : ''}</h1>

		<section class="cards">
			{#each cards as card, i (`${i}-${card.code}`)}
				<CardComponent flipped={show} imageUrl={card.image ?? ''} cardCode={card.code ?? ''} />
			{/each}
		</section>
	</section>
</section>

<style scoped>
	.hand {
		display: flex;
		align-items: center;
		gap: 1em;
	}

	.hand__right {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.cards {
		display: flex;
		margin: 2em;
	}

	.title {
		font-family: JqkasWild;
		color: gold;
		font-size: 48px;
	}
</style>
