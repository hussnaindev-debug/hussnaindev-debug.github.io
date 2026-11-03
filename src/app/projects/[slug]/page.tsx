import { notFound, redirect } from "next/navigation";
import { projects, getProject } from "@/data/projects";

// Case studies open as a popup on the homepage. Old /projects/<slug> links
// land there with that game's popup already open.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();
  redirect(`/?game=${slug}`);
}
