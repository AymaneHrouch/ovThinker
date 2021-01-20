import http from "./httpService";

const apiEndpoint = `/journals`;

function journalUrl(journalId) {
  return `${apiEndpoint}/${journalId}`;
}

export function getJournals(
  pageNumber,
  pageSize,
  start = 0,
  end = 0,
) {
  return http.get(
    `${apiEndpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}&start=${start}&end=${end}`
  );
}

export function getStarredJournals(pageNumber, pageSize) {
  return http.get(
    `${apiEndpoint}/starred?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
}

export function getLockedJournals(pageNumber, pageSize) {
  return http.get(
    `${apiEndpoint}/locked?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
}

export function getJournal(journalId) {
  return http.get(`${apiEndpoint}/${journalId}`);
}

export function getRandomJournal() {
  return http.get(`${apiEndpoint}/random`);
}

export function saveJournal(journal) {
  if (journal._id) {
    const body = { ...journal };
    delete body._id;
    return http.put(journalUrl(journal._id), body);
  }

  return http.post(apiEndpoint, journal);
}

export function deleteJournal(journalId) {
  return http.delete(`${apiEndpoint}/${journalId}`);
}