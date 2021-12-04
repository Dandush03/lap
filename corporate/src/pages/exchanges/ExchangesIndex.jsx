import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Matirial UI
import {
  Paper, Table,
  TableContainer, TablePagination,
} from '@material-ui/core';

// Styles
import useStyles from 'styles/Exchange';

// Components
import { getExchangeRates } from 'actions/exchanges';
import ExchangeEnhancedTableHead from './components/ExchangeEnhancedTableHead';
import ExchangeEnhancedTableToolbar from './components/ExchangeEnhancedTableToolbar';
import ExchangeTableBody from './components/ExchangeTableBody';

const ExchangesIndex = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.exchanges.exchangesList);
  const numberOfRows = useSelector((state) => state.exchanges.rowCounter);
  const labels = useSelector((state) => state.i18n.exchanges.index);
  const locale = useSelector((state) => state.locale);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('created_at');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const classes = useStyles();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const sadasdasd = (newPage = '') => dispatch(getExchangeRates(rowsPerPage, newPage));
  const handleChangePage = async (event, newPage) => {
    const teasdasd = await sadasdasd(newPage);
    setPage(teasdasd);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ExchangeEnhancedTableToolbar
          numSelected={selected.length}
          classes={classes}
          title={labels.title}
          selected={labels.selected}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <ExchangeEnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={numberOfRows}
              headCells={labels.head_cells}
            />
            <ExchangeTableBody
              rows={rows}
              locale={locale}
              page={page}
              rowsPerPage={rowsPerPage}
              order={order}
              orderBy={orderBy}
              selected={selected}
              setSelected={setSelected}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={numberOfRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default ExchangesIndex;
