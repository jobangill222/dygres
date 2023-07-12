import { compose, withState, withHandlers } from "recompose";

export default function provideExampleValue(value) {
  return compose(
    withState("value", "setValue", value),
    withHandlers({
      onChange:
        ({ setValue }) =>
        (ev, newValue) =>
          setValue(newValue),
      onAdd:
        () =>
        (...args) =>
          console.log("Added a new mention", ...args),
    })
  );
}
