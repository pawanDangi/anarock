import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  noData: {
    padding: 30,
    textAlign: 'center'
  }
}));

const getKeys = (data = {}) =>
  Object.keys(data)
    .map(k => k.split('_').map(a => a.charAt(0).toUpperCase() + a.slice(1)))
    .map(k => k.join(' '));

export default function CustomizedTables({ data }) {
  const classes = useStyles();

  const keys = getKeys(data[0]);
  const index = Object.keys(data[0] || {});

  return (
    <Paper className={classes.root}>
      {data && data.length ? (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {(keys || []).map(k => (
                <StyledTableCell key={k}>{k}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <StyledTableRow key={`${i}-${row.id}`}>
                {(index || []).map(k => (
                  <StyledTableCell key={k}>
                    {['updated_at', 'created_at'].indexOf(k) > -1
                      ? moment(row[k]).format('MM/DD/YYYY')
                      : row[k]}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className={classes.noData}>No Data Found</div>
      )}
    </Paper>
  );
}
