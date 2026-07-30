import { project } from "@/data/project";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF8] px-4 py-16 text-[#161512]">
      <article className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-semibold text-[#B18A4A]">Back to {project.name}</Link>
        <h1 className="mt-6 font-serif text-5xl">Privacy Policy</h1>
        <p className="mt-6 leading-8 text-[#6D6962]">
          This website collects enquiry details such as name, phone number, email, apartment
          preference, enquiry type and message so the authorised project sales team can respond
          to buyer requests. Submitted information may be used for callback, WhatsApp, SMS or
          email communication related to {project.name}.
        </p>
        <p className="mt-4 leading-8 text-[#6D6962]">
          Analytics and advertising integrations may be enabled through environment variables to
          understand campaign performance. No private credentials are exposed in frontend code.
        </p>
        <p className="mt-4 leading-8 text-[#6D6962]">
          To request correction or removal of your enquiry details, contact {project.contact.email}.
        </p>
      </article>
    </main>
  );
}
