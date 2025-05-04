<script lang="ts">
  import { type QuizDataSource } from "../data-sources/quiz.svelte.js";
  import Question from "./Question.svelte";
  import { wait } from "../utils/timers";

  const { quiz, onFinish }: { quiz: QuizDataSource, onFinish: () => void } = $props();

  let isLoadingQuestions = $derived(quiz.status === "pending");
  let isGameFinished = $derived(quiz.status === "finished");

  $effect(() => {
    quiz.init();
  });

  async function onAnswered(answer: string) {
    quiz.updateScore(answer);
    await wait(1000);
    quiz.nextQuestion();
  }
</script>

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
{/if}

<style>
  p {
    text-align: center;
  }
</style>