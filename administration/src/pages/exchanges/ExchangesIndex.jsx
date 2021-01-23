import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Table,
  TableContainer, TablePagination,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import ExchangeEnhancedTableHead from '../../components/ExchangeEnhancedTableHead';
import ExchangeEnhancedTableToolbar from '../../components/ExchangeEnhancedTableToolbar';
import useStyles from '../../styles/Exchange';
import ExchangeTableBody from '../../components/ExchangeTableBody';

const ExchangesIndex = ({ locale }) => {
  const rows = useSelector((state) => state.exchanges);
  const labels = useSelector((state) => state.i18n.exchanges.index);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('created_at');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
              rowCount={rows.length}
              headCells={labels.head_cells}
            />
            <ExchangeTableBody
              rows={rows}
              page={page}
              rowsPerPage={rowsPerPage}
              order={order}
              orderBy={orderBy}
              selected={selected}
              setSelected={setSelected}
              locale={locale}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

ExchangesIndex.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default ExchangesIndex;
