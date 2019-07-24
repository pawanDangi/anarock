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

export default function LeadsByCity() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const getData = async () => {
    setDisabled(true);
    const res = await fetchData(
      `select q.name, count(*) as leads from (SELECT d.id, d.name FROM cities d INNER JOIN leads e ON d.id = e.city_id) q group by q.name`
    );
    setData(res || []);
    setDisabled(false);
  };

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-multiline-static"
        value={`select q.name, count(*) as leads from (SELECT d.id, d.name FROM cities d INNER JOIN leads e ON d.id = e.city_id) q group by q.name`}
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
