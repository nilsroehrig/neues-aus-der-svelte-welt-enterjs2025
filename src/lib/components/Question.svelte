<script lang="ts">
  import type { Question } from "../data-sources/quiz.svelte";
  import Answer from "./Answer.svelte";
  import shuffle from "just-shuffle";

  let { question, onAnswered }: {
    question: Question,
    onAnswered: (answer: string) => void,
  } = $props();

  let possibleAnswers = $derived(shuffle([...question.incorrectAnswers, question.correctAnswer]));

  function onChosen(answer: string) {
    onAnswered(answer);

    if (answer === question.correctAnswer) {
      return "correct";
    } else {
      return "incorrect";
    }
  }
</script>

<p>{@html question.question}</p>
<div class="answers">
  {#each possibleAnswers as answer (answer)}
    <Answer
      text={answer}
      {onChosen}
    />
  {/each}
</div>