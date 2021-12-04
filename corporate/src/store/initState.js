export default {
  locale: null,
  fetching: 0,
  CSRF: { authToken: null, resource: null },
  i18n: null,
  company: { currency: { base: {}, secondary: {} } },
  user: { login: false },
  accountingAccounts: { buy: [], sell: [], inv: [] },
  articlesGroups: { articleGroupList: [], rowCounter: 0 },
  taxes: [],
  articles: { articlesList: [], rowCounter: 0 },
  exchanges: { exchangesList: [], rowCounter: 0 },
  toastMessage: {
    message: '',
    type: null,
  },
};
