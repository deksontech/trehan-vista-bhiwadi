import { project } from "@/data/project";
import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF8] px-4 py-16 text-[#161512]">
      <article className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-semibold text-[#B18A4A]">Back to {project.name}</Link>
        <h1 className="mt-6 font-serif text-5xl">Disclaimer</h1>
        <p className="mt-6 leading-8 text-[#6D6962]">{project.footerDisclaimer}</p>
        <p className="mt-4 leading-8 text-[#6D6962]">{project.pricing.detailedDisclaimer}</p>
        <p className="mt-4 leading-8 text-[#6D6962]">
          Financing and loan assistance information is indicative and subject to applicant
          eligibility and lender approval. No RERA number is displayed until verified project
          details are received.
        </p>
      </article>
    </main>
  );
}
