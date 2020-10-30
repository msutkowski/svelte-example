<script lang="ts">
    import { onMount } from 'svelte';

    let count;

    const increaseCount = async () => {
        const res = await fetch('/increase', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 1 }),
        });
        const data = (await res.json()) as { count: number };
        count = data.count;
    };

    const decreaseCount = async () => {
        const res = await fetch('/decrease', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 1 }),
        });

        const data = (await res.json()) as { count: number };
        count = data.count;
    };

    onMount(async () => {
        const res = await fetch('/count');
        const data = (await res.json()) as { count: number };
        count = data.count;
    });
</script>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>

<main>
    <h1>{count}</h1>
    <button on:click={increaseCount}>Increase</button>
    <button on:click={decreaseCount}>Decrease</button>
</main>
