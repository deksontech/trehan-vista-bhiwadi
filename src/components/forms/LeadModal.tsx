"use client";

import { LeadForm } from "@/components/forms/LeadForm";
import { Modal } from "@/components/ui/Modal";
import type { LeadFormValues } from "@/lib/validation";

export function LeadModal({
  open,
  onClose,
  apartment,
  enquiry,
  cta,
}: {
  open: boolean;
  onClose: () => void;
  apartment: LeadFormValues["apartmentPreference"];
  enquiry: LeadFormValues["enquiryType"];
  cta: string;
}) {
  return (
    <Modal open={open} onClose={onClose} title="Get Complete Project Details">
      <LeadForm
        defaultApartment={apartment}
        defaultEnquiry={enquiry}
        ctaClicked={cta}
        source="Lead Modal"
      />
    </Modal>
  );
}
