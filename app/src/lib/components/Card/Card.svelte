<script lang="ts">
	interface Props {
		flipped?: boolean;
		imageUrl: string;
		cardCode: string;
	}

	let { flipped, imageUrl, cardCode }: Props = $props();
</script>

<section class="container">
	<section class={['card', { flipped }]}>
		{#if flipped}
			<section class="front">
				<img src={imageUrl} alt={cardCode} height="160" />
			</section>
		{:else}
			<section class="back">
				<div class="pattern"></div>
			</section>
		{/if}
	</section>
</section>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		gap: 1em;
		height: 100%;
		align-items: center;
		justify-content: center;
		perspective: 100vh;
		margin: -2em;
	}

	.card {
		position: relative;
		aspect-ratio: 2.5 / 3.5;
		font-size: min(1vh, 0.25rem);
		height: 40em;
		background: white;
		border-radius: 2em;
		transform: rotateY(180deg);
		transition: transform 0.4s;
		transform-style: preserve-3d;
		padding: 0;
		user-select: none;
	}

	.card.flipped {
		transform: rotateY(0);
	}

	.front,
	.back {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		backface-visibility: hidden;
		border-radius: 2em;
		box-sizing: border-box;
		padding: 2em;
	}

	.back {
		transform: rotateY(180deg);
	}

	.pattern {
		width: 100%;
		height: 100%;
		background-color: lightblue;
		/* pattern from https://projects.verou.me/css3patterns/#marrakesh */
		background-image: radial-gradient(blue 0.6em, transparent 0.4em),
			repeating-radial-gradient(
				blue 0.3em,
				blue 0.4em,
				transparent 0.6em,
				transparent 1.5em,
				blue 1em,
				blue 1em,
				transparent 1.9em,
				transparent 2em
			);
		background-size:
			3.9em 4.3em,
			7.8em 8.7em;
		background-position: 0 0;
		border-radius: 1em;
	}
</style>
