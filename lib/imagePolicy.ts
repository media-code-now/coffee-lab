import policy from "../config/imagePolicy.json";

export const ALLOWED_LICENSES = policy.allowedLicenses;
export const REQUIRE_ATTRIBUTION = new Set(policy.requireAttribution);
export const ALLOWED_SOURCES = policy.allowedSources;
