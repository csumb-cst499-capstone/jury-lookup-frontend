const apiBaseUrl = new URL(process.env.NEXT_PUBLIC_API_URL);

// Create separate instances of URL for each endpoint
const helloUrl = new URL(apiBaseUrl);
helloUrl.pathname = "api/hello";

const loginUrl = new URL(apiBaseUrl);
loginUrl.pathname = "api/login";

const summonUrl = new URL(apiBaseUrl);
summonUrl.pathname = "api/summon";

const editSummonsUrl = new URL(apiBaseUrl);
editSummonsUrl.pathname = "api/editSummons";

const reportingLocationsUrl = new URL(apiBaseUrl);
reportingLocationsUrl.pathname = "api/getReportingLocations";

const editJurorUrl = (jurorId) => {
  const url = new URL(apiBaseUrl);
  url.pathname = `api/admin/juror/edit/${jurorId}`;
  return url;
};

const searchUrl = (query) => {
  const url = new URL(apiBaseUrl);
  url.pathname = "api/admin/search";
  url.searchParams.append("query", query);
  return url;
};

// Define the API object with the separate URL instances
export const API = {
  apiBaseUrl,
  hello: helloUrl,
  login: loginUrl,
  summon_details: summonUrl,
  postpone: editSummonsUrl,
  locations: reportingLocationsUrl,
  editJuror: editJurorUrl,
  search: searchUrl,
};

export default API;
