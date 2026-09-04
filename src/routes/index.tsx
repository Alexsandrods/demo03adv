import { createFileRoute } from "@tanstack/react-router";
import { LawFirmSite } from "@/components/law-firm-site";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nome da Advocacia | Advocacia Estratégica" },
      { name: "description", content: "Advocacia estratégica conduzida com rigor técnico, clareza e precisão." },
      { property: "og:title", content: "Nome da Advocacia | Advocacia Estratégica" },
      { property: "og:description", content: "Rigor técnico, visão estratégica e atenção absoluta a cada decisão." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <LawFirmSite />;
}
