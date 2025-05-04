<script lang="ts">
  import type { Snippet } from "svelte";

  let { header, children, onCancel, onConfirm, open = $bindable(false) }: {
    header?: Snippet,
    children: Snippet,
    onConfirm: () => void,
    onCancel: () => void,
    open: boolean,
  } = $props();
</script>

<dialog {open}>
  <article>
    {#if header}
      <header>
        {@render header()}
        <button type="button" class="unstyled" onclick={onCancel}>&cross;</button>
      </header>
    {/if}
    {@render children()}
    <footer>
      <button type="button" class="secondary" onclick={onCancel}>
        Cancel
      </button>

      <button type="button" onclick={onConfirm}>
        Confirm
      </button>
    </footer>
  </article>
</dialog>

<style>
  footer button {
    margin-bottom: 0;
  }
</style>