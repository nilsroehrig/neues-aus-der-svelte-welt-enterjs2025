<script lang="ts">
  import Game from "./lib/components/Game.svelte";
  import { createQuizDataSource, type QuizDataSource } from "./lib/data-sources/quiz.svelte";

  let quiz: QuizDataSource | null = null;
</script>

<main>
  <div class="game">
    <article>
      <header
        class:has-score={!!quiz}
      >
        Sveltenstein
        {#if quiz}
          <span>Score: <strong>{quiz.score}</strong></span>
        {/if}
      </header>
      {#if !quiz}
        <ul>
          <li>
            <button onclick={() => {
              quiz = createQuizDataSource();
            }}>New Game
            </button>
          </li>
        </ul>
      {:else}
        <Game
          {quiz}
          onFinish={() => quiz = null}
        />
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

  .has-score {
    display: flex;
    justify-content: space-between;
  }
</style>