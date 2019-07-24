import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import TableView from './TableView';
import { fetchData } from '../api/data';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  button: {
    textAlign: 'right'
  }
}));

export default function MonthlyLeads() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const getData = async () => {
    setDisabled(true);
    const res = await fetchData(
      `select extract(year from created_at) as year, to_char(created_at, 'Mon') as month, count(id) from leads GROUP BY year, month`
    );
    setData(res || []);
    setDisabled(false);
  };

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-multiline-static"
        value={`select extract(year from created_at) as year, to_char(created_at, 'Mon') as month, count(id) from leads GROUP BY year, month`}
        label="Query"
        fullWidth
        disabled
        rows="10"
        margin="normal"
        variant="outlined"
      />
      <div className={classes.button}>
        <Button
          variant="contained"
          color="primary"
          onClick={getData}
          disabled={disabled}
        >
          Get Data
        </Button>
      </div>
      <div>
        <TableView data={data} />
      </div>
    </div>
  );
}
