<script lang="ts">
  import Game from "./lib/components/Game.svelte";

  let currentStage: "menu" | "game" | "scores" = "game";
</script>

<main>
  <div class="game">
    <article>
      <header>Sveltenstein</header>
      {#if currentStage === "menu"}
        <ul>
          <li>
            <button>New Game</button>
          </li>
          <li>
            <button>Scores</button>
          </li>
        </ul>
      {:else if currentStage === "game"}
        <Game/>
      {/if}
    </article>
  </div>
</main>

<style>
    main {
        width: 100%;
        height: 100vh;
        overflow: auto;
        display: grid;
        align-content: center;
    }

    .game {
        width: 20rem;
        margin: auto;
    }

    header {
        text-align: center;
        font-weight: bold;
    }

    ul {
        text-align: center;
        padding: 0;
        margin-bottom: 0;
    }

    li {
        list-style: none;
    }
</style>