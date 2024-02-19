import { createLazyFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Helmet>
        <title>Meiro</title>
      </Helmet>
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    </>
  );
}
