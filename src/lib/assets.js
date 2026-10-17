// Files the owner drops into /public (CV, project screenshots, certificate).
// encodeURI keeps names with spaces/parentheses working, BASE_URL keeps sub-path deploys working.
export const pub = (path) => `${import.meta.env.BASE_URL}${encodeURI(path.replace(/^\/+/, ''))}`;
