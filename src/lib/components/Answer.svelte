<script lang="ts">
  let { text, onChosen }: {
    text: string,
    onChosen: (answer: string) => "correct" | "incorrect",
  } = $props();

  let answerCorrectness: "correct" | "incorrect" | "undecided" = $state("undecided");
  let buttonRef: HTMLButtonElement;
</script>

<button
  class="outline"
  bind:this={buttonRef}
  class:correct={answerCorrectness === "correct"}
  class:incorrect={answerCorrectness === "incorrect"}
  onclick={() => {
    answerCorrectness = onChosen(text);
    buttonRef.blur();
  }}
>
  {@html text}
</button>

<style>
  .correct {
    --pico-border-color: var(--pico-color-green-500);
    --pico-color: var(--pico-color-green-500);
    --pico-primary-hover: var(--pico-color-green-500);
    --pico-primary-hover-border: var(--pico-color-green-500);
  }

  .incorrect, .incorrect:hover {
    --pico-border-color: var(--pico-color-red-500);
    --pico-color: var(--pico-color-red-500);
    --pico-primary-hover: var(--pico-color-red-500);
    --pico-primary-hover-border: var(--pico-color-red-500);
  }
</style>