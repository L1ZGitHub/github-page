import {
  ARXIV_PAPER_ID,
  ORG_ID,
  PERSON_ID,
  SITE_URL,
  WEBSITE_ID,
} from "@/lib/person-id"

export function SchemaOrg() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Hélain Zimmermann",
        givenName: "Hélain",
        familyName: "Zimmermann",
        jobTitle: "Co-Founder & CTO",
        email: "mailto:contact@helain-zimmermann.com",
        image: `${SITE_URL}/images/helain-avatar.webp`,
        url: SITE_URL,
        worksFor: { "@id": ORG_ID },
        alumniOf: [
          {
            "@type": "CollegeOrUniversity",
            name: "KTH Royal Institute of Technology",
            url: "https://www.kth.se/",
          },
          {
            "@type": "CollegeOrUniversity",
            name: "ENSIMAG - Grenoble INP",
            url: "https://ensimag.grenoble-inp.fr/",
          },
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "degree",
            educationalLevel: "Master of Science",
            name: "MSc Machine Learning (in progress)",
            recognizedBy: {
              "@type": "CollegeOrUniversity",
              name: "KTH Royal Institute of Technology",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "degree",
            educationalLevel: "Engineering degree",
            name: "Engineering Degree in Applied Mathematics & Computer Science",
            recognizedBy: {
              "@type": "CollegeOrUniversity",
              name: "ENSIMAG - Grenoble INP",
            },
          },
        ],
        affiliation: {
          "@type": "ResearchOrganization",
          name: "INRIA Grenoble",
          url: "https://www.inria.fr/en/inria-centre-university-grenoble-alpes",
          description:
            "Research intern, privacy-preserving NLP (past affiliation)",
        },
        subjectOf: [
          {
            "@type": "ScholarlyArticle",
            "@id": ARXIV_PAPER_ID,
            name: "Towards the Anonymization of the Language Modeling",
            url: ARXIV_PAPER_ID,
            identifier: "arXiv:2501.02407v2",
            author: { "@id": PERSON_ID },
          },
        ],
        knowsAbout: [
          "Privacy-preserving NLP",
          "Differential Privacy",
          "Retrieval-Augmented Generation",
          "LLM Agents",
          "Machine Learning",
          "Applied Mathematics",
        ],
        sameAs: [
          "https://www.linkedin.com/in/helain-zimmermann/",
          "https://github.com/L1ZGitHub",
          "https://scholar.google.fr/citations?hl=fr&user=MXMobs8AAAAJ",
          "https://dev.to/helain",
          "https://medium.com/@helain.zimmermann",
          "https://arxiv.org/abs/2501.02407",
        ],
      },
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "Ailog",
        url: "https://www.ailog.fr",
        description:
          "AI, automation, and applied mathematics — consulting and SaaS.",
        founder: { "@id": PERSON_ID },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: "Hélain Zimmermann",
        publisher: { "@id": PERSON_ID },
        inLanguage: "en",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
