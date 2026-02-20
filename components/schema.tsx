export function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Helain Zimmermann",
    url: "https://helain-zimmermann.com",
    jobTitle: "Co-Founder & CTO",
    worksFor: {
      "@type": "Organization",
      name: "Ailog",
      url: "https://www.ailog.fr",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "KTH Royal Institute of Technology",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "ENSIMAG - Grenoble INP",
      },
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "RAG Systems",
      "Natural Language Processing",
      "Privacy-Preserving AI",
    ],
    sameAs: [
      "https://www.linkedin.com/in/helain-zimmermann/",
      "https://github.com/L1ZGitHub",
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
