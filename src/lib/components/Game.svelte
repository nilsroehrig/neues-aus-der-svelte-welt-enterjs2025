<script lang="ts">
  import { createQuizDataSource } from "../data-sources/quiz.svelte.js";
  import Question from "./Question.svelte";
  import { wait } from "../utils/timers";

  const quiz = createQuizDataSource();
  let isLoadingQuestions = $derived(quiz.status === "pending");

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
{:else}
  <Question
    question={quiz.currentQuestion!}
    onAnswered={onAnswered}
  />
{/if}