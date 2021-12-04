import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox, TableBody,
  TableCell, TableRow,
} from '@material-ui/core';
import {
  getComparator, stableSort, convertNumberToCurrency, dateTimeStringBuilder,
} from 'javascripts/tableFunctions';

const ExchangeTableBody = ({
  rows, page, rowsPerPage, order, orderBy, selected, setSelected, locale,
}) => {
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (

    <TableBody>
      {stableSort(rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const {
            id, base, secondary, value,
            created_at: date, created_by: owner,
          } = row;

          const isItemSelected = isSelected(id);
          const labelId = `enhanced-table-checkbox-${index}`;
          return (
            <TableRow
              hover
              onClick={(event) => handleClick(event, id)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={id}
              selected={isItemSelected}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isItemSelected}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </TableCell>
              <TableCell component="th" id={labelId} scope="row" padding="none">
                {`${secondary}/${base}`}
              </TableCell>
              <TableCell>{convertNumberToCurrency(parseInt(value, 10).toFixed(2))}</TableCell>
              <TableCell>{owner}</TableCell>
              <TableCell>{dateTimeStringBuilder(date, locale)}</TableCell>
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
      <TableRow style={{ height: 53 * emptyRows }}>
        <TableCell colSpan={6} />
      </TableRow>
      )}
    </TableBody>
  );
};

ExchangeTableBody.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  selected: PropTypes.arrayOf(PropTypes.number).isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default ExchangeTableBody;
