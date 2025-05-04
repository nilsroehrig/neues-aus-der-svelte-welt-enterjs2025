import "@picocss/pico";
import "@picocss/pico/css/pico.colors.css";
import "./app.css";
import { mount } from "svelte";
import App from "./App.svelte";

const app = mount(App, {
  target: document.getElementById("app")!,
});

export default app;
