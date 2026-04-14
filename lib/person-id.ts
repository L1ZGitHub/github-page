/**
 * Canonical @id references for the unified JSON-LD graph.
 * Used across SchemaOrg (site-wide) and per-page schemas (BlogPosting, etc.)
 * so that Google and LLMs resolve all entity mentions to a single node.
 */
export const SITE_URL = "https://helain-zimmermann.com"

export const PERSON_ID = `${SITE_URL}/#helain`
export const ORG_ID = `${SITE_URL}/#ailog`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const ARXIV_PAPER_ID = "https://arxiv.org/abs/2501.02407"
