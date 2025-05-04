<script lang="ts">
  import { type QuizDataSource } from "../data-sources/quiz.svelte.js";
  import Question from "./Question.svelte";
  import { wait } from "../utils/timers";
  import ConfirmationDialog from "./ConfirmationDialog.svelte";

  const { quiz, onFinish }: { quiz: QuizDataSource, onFinish: () => void } = $props();

  let isLoadingQuestions = $derived(quiz.status === "pending");
  let isGameFinished = $derived(quiz.status === "finished");

  let showConfirmation = $state(false);

  $effect(() => {
    quiz.init();
  });

  async function onAnswered(answer: string) {
    quiz.updateScore(answer);
    await wait(1000);
    quiz.nextQuestion();
  }
</script>

<div class="game">
  {#if isLoadingQuestions}
    <p aria-busy="true">Loading questions...</p>
  {:else if isGameFinished}
    <p>Game over! Your score is {quiz.score}.</p>
    <p>
      <button class="secondary" onclick={onFinish}>Back to Menu</button>
    </p>
  {:else}
    <Question
      question={quiz.currentQuestion!}
      onAnswered={onAnswered}
    />
    <hr>
    <p><button type="button" class="secondary outline" onclick={() => showConfirmation = true}>Cancel Game</button></p>
  {/if}
</div>

<ConfirmationDialog
  open={showConfirmation}
  onConfirm={onFinish}
  onCancel={() => showConfirmation = false}
>
  Do you really want to cancel the game?
</ConfirmationDialog>

<style>
  p {
    text-align: center;
  }

  .game > :last-child, p > :last-child {
    margin-bottom: 0;
  }
</style>