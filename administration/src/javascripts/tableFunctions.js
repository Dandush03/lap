/* eslint-disable no-extend-native */
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => (order === 'desc'
  ? (a, b) => descendingComparator(a, b, orderBy)
  : (a, b) => -descendingComparator(a, b, orderBy));

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const convertNumberToCurrency = (str) => str.replace(/(\B(?=(\d{3})+(?!\d)\.))/g, ',');

const extendCapitalizeString = () => {
  if (!String.prototype.capitalizeString) {
    Object.defineProperty(String.prototype, 'capitalizeString',
      {
        value() {
          return this.split(' ').map((e) => e.capitalize()).join(' ');
        },
        enumerable: false,
      });
  }
};

const extendCapitalize = () => {
  if (!String.prototype.capitalize) {
    Object.defineProperty(String.prototype, 'capitalize',
      {
        value() {
          const temp = this.replace(/\./g, '').replace(/\s/g, '').toUpperCase();
          if (temp === 'AM' || temp === 'PM') return temp;
          if (this === 'a. m.') return 'AM';
          if (this.length < 3) return this;
          if (this[0] === '(') return `(${this.slice(1, 2).toUpperCase()}${this.slice(2).toLowerCase()}`;
          return `${this.slice(0, 1).toUpperCase()}${this.slice(1).toLowerCase()}`;
        },
        enumerable: false,
      });
  }
};

const extendStringProps = () => {
  extendCapitalize();
  extendCapitalizeString();
};

const dateTimeStringBuilder = (date, locale) => {
  extendStringProps();
  const tempDate = new Date(date);
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZoneName: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };
  const str = new Intl.DateTimeFormat(locale, options).format(tempDate);
  return str.replace('.', '').capitalizeString();
};

export {
  descendingComparator, getComparator, stableSort, convertNumberToCurrency, dateTimeStringBuilder,
};
