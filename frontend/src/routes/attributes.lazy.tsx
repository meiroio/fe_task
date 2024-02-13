import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/attributes")({
  component: Attributes,
});

function Attributes() {
  return <div className="p-2">Hello from attributes!</div>;
}
