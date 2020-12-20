export const journals = [
  {
    _id: "5fd000356d5df538d0338db4",
    comment: "hahahaha",
    date: "2020-12-08T22:37:41.740Z",
  },
  {
    _id: "5fd0003e6d5df538d0338db6",
    comment: "how you doing!!",
    date: "2020-12-08T22:37:50.271Z",
  },
  {
    _id: "5fd000476d5df538d0338dba",
    comment: "ok sorry",
    date: "2020-12-08T22:37:59.128Z",
  },
  {
    _id: "5fd000476d5df538d0338dba",
    comment: "another entry in february",
    date: "2020-02-08T22:37:59.128Z",
  },
  {
    _id: "5fd000476d5df538d0338dba",
    comment: "hi there",
    date: "2020-02-08T22:37:59.128Z",
  },
  {
    _id: "5fd000476d5df538d0338dba",
    comment: "my birthday",
    date: "2020-02-25T22:37:59.128Z",
  },
  {
    _id: "5fd000476d5df538d0338dba",
    comment: "my birthday",
    date: "2020-02-25T22:37:59.128Z",
  },
  {
    _id: "5fd000476d5df538d0338dba",
    comment: "my birthday",
    date: "2020-02-25T22:37:59.128Z",
  },
  {
    _id: "5fd000476d5df538d0338dba",
    comment: "my birthday",
    date: "2020-02-25T22:37:59.128Z",
  },
  {
    _id: "5fd000476d5df538d0338dba",
    comment: "my birthday",
    date: "2020-02-25T22:37:59.128Z",
  },
  {
    _id: "5fd000476d5df538d0338dba",
    comment: "my birthday",
    date: "2020-02-25T22:37:59.128Z",
  },
  {
    _id: "5fd000476d5df538d0338dba",
    comment: "my birthday",
    date: "2020-02-25T22:37:59.128Z",
  },
  {
    _id: "5fd000476d5df538d0338dba",
    comment: "my birthday",
    date: "2020-02-25T22:37:59.128Z",
  },
  {
    _id: "5fd000476d5df538d0338dba",
    comment: "my birthday",
    date: "2020-02-25T22:37:59.128Z",
  },
  {
    _id: "5fd000476d5df538d0338dba",
    comment: "my birthday",
    date: "2020-02-25T22:37:59.128Z",
  },
];

export function getJournals() {
  return journals.filter(g => g);
}

export function getJournal(id) {
  return journals.find(j => j._id === id);
}
