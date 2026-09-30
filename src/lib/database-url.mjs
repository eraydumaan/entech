const LEGACY_SSL_MODE =
  /([?&])sslmode=(?:prefer|require|verify-ca)(?=&|$)/iu;

export function normalizeDatabaseUrl(value) {
  if (typeof value !== "string") return value;
  return value.replace(LEGACY_SSL_MODE, "$1sslmode=verify-full");
}
