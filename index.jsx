import { createEffect } from "solid-js";
import { render } from "solid-js/web";
import { createMachine, assign } from "xstate";
import { useMachine } from "./useMachine";

const toggleMachine = createMachine({
  id: "toggle",
  initial: "inactive",
  context: {
    count: 0,
    disabledCount: 0
  },
  states: {
    inactive: {
      entry: assign({ disabledCount: (ctx) => ctx.disabledCount + 1 }),
      on: { TOGGLE: "active" }
    },
    active: {
      entry: assign({ count: (ctx) => ctx.count + 1 }),
      on: { TOGGLE: "inactive" }
    }
  }
});

function App() {
  console.log("Create");
  const [state, send] = useMachine(toggleMachine);

  createEffect(() => {
    // This illustrates how machine updates
    // without triggering other parts of context
    console.log("Off", state.context.disabledCount);
  });

  return (
    <main>
      <h1>XState Solid Example</h1>
      <h2>Granular State Machine</h2>
      <button onClick={() => send("TOGGLE")}>
        Click me ({state.matches("active") ? "✅" : "❌"})
      </button>{" "}
      <code>
        Toggled <strong>{state.context.count}</strong> times
      </code>
    </main>
  );
}

render(App, document.getElementById("app"));
