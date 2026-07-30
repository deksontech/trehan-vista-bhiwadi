import { project } from "./project";

const [twoBhk, threeBhk, fourBhk] = project.configurations;

export const faqs = [
  {
    question: "What apartment configurations are available at Trehan Vista?",
    answer:
      "Trehan Vista offers 2 BHK, 3 BHK and 4 BHK apartments for different family requirements.",
  },
  {
    question: "What is the starting price of a 2 BHK apartment?",
    answer: `The 2 BHK apartment price is ${twoBhk.priceLabel.toLowerCase()} ${twoBhk.displayPriceLower}. ${project.pricing.priceDisclaimer}`,
  },
  {
    question: "What is the starting price of a 3 BHK apartment?",
    answer: `The 3 BHK apartment price is ${threeBhk.priceLabel.toLowerCase()} ${threeBhk.displayPriceLower}. ${project.pricing.priceDisclaimer}`,
  },
  {
    question: "Is a 4 BHK apartment available?",
    answer: `Yes, 4 BHK apartments are listed with an approximate area of ${fourBhk.area}. Pricing is ${fourBhk.displayPriceLower}.`,
  },
  {
    question: "Where is Trehan Vista located?",
    answer: `Trehan Vista is located at ${project.location.fullAddress}.`,
  },
  {
    question: "Are furnished apartments available?",
    answer:
      "Selected offerings include furnished-home options. Furnishing items, specifications and availability should be confirmed with the sales team before booking.",
  },
  {
    question: "What does the 10:90 payment plan mean?",
    answer:
      "The project promotes a 10:90 payment plan. Please ask the project sales team for the current payment schedule, eligibility and applicable terms.",
  },
  {
    question: "Is home-loan assistance available?",
    answer: `${project.loanAssistance.title} may be available, subject to applicant eligibility and lender approval. ${project.loanAssistance.disclaimer}`,
  },
  {
    question: "Can I book a site visit?",
    answer:
      "Yes, you can request a project visit through the enquiry form, WhatsApp or phone.",
  },
  {
    question: "Is a cab facility available for the site visit?",
    answer:
      "Cab facility is promoted for site visits. Availability should be confirmed when scheduling your visit.",
  },
  {
    question: "How can I receive the latest price list?",
    answer:
      "Share your details through the enquiry form and select Latest Price List. The project team can then share current pricing and availability.",
  },
  {
    question: "Are taxes and registration charges included in the displayed price?",
    answer: project.pricing.detailedDisclaimer,
  },
];
