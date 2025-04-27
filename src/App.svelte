<main>
  <div class="game">
    <article>
      <header>Sveltenstein</header>
      <ul>
        <li>
          <button>New Game</button>
        </li>
        <li>
          <button>Highscore</button>
        </li>
      </ul>
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