export const project = {
  name: "Trehan Vista",
  tagline: "A Better Address for Modern Family Living",
  type: "Premium residential apartments",
  location: {
    sector: "Sector 54",
    road: "SH-25, Alwar-Bhiwadi Highway",
    landmark: "Near Euro International School",
    city: "Bhiwadi",
    state: "Rajasthan",
    postalCode: "301019",
    fullAddress:
      "Trehan Vista, Sector 54, SH-25, Alwar-Bhiwadi Highway, near Euro International School, Bhiwadi, Rajasthan 301019",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Trehan%20Vista%20Sector%2054%20Bhiwadi%20Rajasthan",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3518.105932297894!2d76.80905659999999!3d28.1432632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d496cf0331b63%3A0xfe2340d3db1122b1!2sTrehan%20Vista!5e0!3m2!1sen!2sin!4v1785410313629!5m2!1sen!2sin",
    landmarks: [
      "Located on the Alwar-Bhiwadi Highway",
      "Near Euro International School",
      "Convenient access to established Bhiwadi areas",
      "Connected to everyday social infrastructure",
    ],
    verifiedDistances: [] as string[],
  },
  contact: {
    phone: "+919983171117",
    displayPhone: "+91 99831 71117",
    whatsapp: "+919983171117",
    email: "contact@trehanvistagroup.com",
  },
  pricing: {
    startingPrice: 2425000,
    displayStartingPrice: "₹24.25 Lakh*",
    displayStartingPriceLower: "₹24.25 lakh*",
    priceDisclaimer:
      "Prices, availability, applicable charges and offers are subject to change and final confirmation by the authorised project sales team.",
    detailedDisclaimer:
      "Prices are indicative starting prices and may vary according to apartment type, floor, location, availability, applicable charges and current offers. Government taxes, registration expenses, maintenance-related charges and other statutory charges may be payable additionally. Please obtain a current written cost sheet from the authorised sales team before making a purchase decision.",
  },
  configurations: [
    {
      id: "2bhk",
      name: "2 BHK",
      title: "2 BHK Apartment",
      label: "Smart and Efficient",
      area: "735 sq. ft. approx.",
      displayPrice: "₹24.25 Lakh*",
      displayPriceLower: "₹24.25 lakh*",
      priceLabel: "Starting From",
      details: [
        "Approximately 735 sq. ft.",
        "Designed for young families and first-time buyers",
        "Furnished options available",
      ],
      cta: "Get 2 BHK Details",
      preference: "2 BHK",
      image: "/images/trehan-vista/2bhk.webp",
    },
    {
      id: "3bhk",
      name: "3 BHK",
      title: "3 BHK Apartment",
      label: "Room to Grow",
      area: "1,183 sq. ft. approx.",
      displayPrice: "₹34 Lakh*",
      displayPriceLower: "₹34 lakh*",
      priceLabel: "Starting From",
      details: [
        "Approximately 1,183 sq. ft.",
        "Spacious family-focused layout",
        "Furnished options available",
      ],
      cta: "Get 3 BHK Details",
      preference: "3 BHK",
      image: "/images/trehan-vista/3bhk.webp",
    },
    {
      id: "4bhk",
      name: "4 BHK",
      title: "4 BHK Apartment",
      label: "Expansive Family Living",
      area: "1,702 sq. ft. approx.",
      displayPrice: "Price on Request",
      displayPriceLower: "Price on request",
      priceLabel: "",
      details: [
        "Approximately 1,702 sq. ft.",
        "Generous living and bedroom spaces",
        "Furnished options available",
      ],
      cta: "Request 4 BHK Price",
      preference: "4 BHK",
      image: "/images/trehan-vista/4bhk.webp",
    },
  ],
  paymentPlan: {
    title: "10:90 Payment Plan",
    description:
      "Ask the project sales team for the latest payment schedule, booking requirements and applicable terms.",
  },
  loanAssistance: {
    maximumPercentage: 90,
    title: "Up to 90% Loan Assistance",
    description:
      "Home-loan assistance may be available through participating financial institutions, subject to eligibility and lender approval.",
    disclaimer:
      "Loan approval, sanctioned amount, interest rate and repayment terms are determined solely by the respective financial institution.",
  },
  siteVisit: {
    cabAvailable: true,
    label: "Free Site Visit Assistance",
  },
  brochureUrl: "/brochure/trehan-vista-brochure.pdf",
  // Add only after receiving the verified project RERA number.
  reraNumber: "",
  socialLinks: {
    facebook: "",
    instagram: "",
    youtube: "",
  },
  highlights: [
    "2, 3 and 4 BHK Apartments",
    "10:90 Payment Plan",
    "Up to 90% Loan Assistance",
    "Cab Facility for Site Visits",
  ],
  offers: [
    "Homes from ₹24.25 lakh*",
    "2, 3 and 4 BHK options",
    "10:90 payment plan",
    "Furnished-flat options",
    "Site-visit cab facility",
  ],
  overviewFeatures: [
    "Thoughtfully planned family residences",
    "Spacious 2, 3 and 4 BHK configurations",
    "Modern amenities for all age groups",
    "More than 80% open and green space",
    "Furnished-home options",
    "Convenient location on the Alwar-Bhiwadi Highway",
  ],
  amenities: [
    {
      category: "Security and Essentials",
      items: [
        "Gated residential community",
        "24-hour security",
        "Surveillance system",
        "Power backup",
        "Water and electricity supply",
        "Sewage treatment plant",
        "Car parking",
      ],
    },
    {
      category: "Sports and Fitness",
      items: [
        "Gymnasium",
        "Swimming pool",
        "Badminton court",
        "Basketball court",
        "Cricket pitch",
        "Jogging track",
        "Yoga park",
        "Skating rink",
        "Games centre",
      ],
    },
    {
      category: "Family and Community",
      items: [
        "Party and celebration hall",
        "Temple",
        "Children's play area",
        "Central park",
        "Recreational spaces",
      ],
    },
    {
      category: "Green and Open Spaces",
      items: [
        "More than 80% open and green area",
        "Separate green area for each tower",
        "Landscaped gardens",
        "Fountains and water features",
      ],
    },
  ],
  furnishingItems: [
    "Bed",
    "Almirah",
    "Modular kitchen",
    "Five-seater sofa set",
    "Centre table",
    "32-inch LED television",
    "Refrigerator",
    "Chimney",
    "RO water purifier",
    "Curtain rods",
  ],
  furnishingDisclaimer:
    "Furnishing items, specifications, models, brands and availability may vary according to the apartment and applicable offer. Confirm the complete furnishing package before booking.",
  gallery: [
    {
      src: "/images/trehan-vista/hero.webp",
      alt: "Trehan Vista residential entrance in Bhiwadi",
      label: "Residential exterior",
      actual: true,
    },
    {
      src: "/images/trehan-vista/overview.webp",
      alt: "Trehan Vista plotted site plan and green areas",
      label: "Landscaped green area",
      actual: true,
    },
    {
      src: "/images/trehan-vista/living-room.webp",
      alt: "Representative living room for Trehan Vista furnished home",
      label: "Living room",
      actual: false,
    },
    {
      src: "/images/trehan-vista/bedroom.webp",
      alt: "Representative bedroom for Trehan Vista furnished home",
      label: "Bedroom",
      actual: false,
    },
    {
      src: "/images/trehan-vista/kitchen.webp",
      alt: "Representative modular kitchen for Trehan Vista",
      label: "Modular kitchen",
      actual: false,
    },
    {
      src: "/images/trehan-vista/swimming-pool.webp",
      alt: "Representative swimming pool amenity",
      label: "Swimming pool",
      actual: false,
    },
    {
      src: "/images/trehan-vista/gym.webp",
      alt: "Representative gymnasium amenity",
      label: "Gymnasium",
      actual: false,
    },
    {
      src: "/images/trehan-vista/kids-area.webp",
      alt: "Representative children's play area",
      label: "Children's play area",
      actual: false,
    },
    {
      src: "/images/trehan-vista/central-park.webp",
      alt: "Representative central park landscape",
      label: "Central park",
      actual: false,
    },
    {
      src: "/images/trehan-vista/furnished-flat.webp",
      alt: "Representative furnished apartment",
      label: "Furnished apartment",
      actual: false,
    },
  ],
  whatsappMessage:
    "Hello, I am interested in Trehan Vista, Bhiwadi. Please share the latest price list and available apartment details.",
  footerDisclaimer:
    "This website is intended for informational and lead-generation purposes. Images may include artistic impressions or representative visuals. Prices, specifications, amenities, offers, availability and project information are subject to change. Prospective buyers should independently verify all information, approvals and legal documents before making a purchase decision.",
} as const;

export type Project = typeof project;
