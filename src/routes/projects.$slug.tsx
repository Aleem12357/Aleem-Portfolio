import { createFileRoute } from "@tanstack/react-router";
import { ProjectDetail } from "./work_.$slug";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectDetail,
});
