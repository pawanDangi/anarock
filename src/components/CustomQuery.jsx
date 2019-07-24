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

export default function CustomQuery() {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const getData = async () => {
    setDisabled(true);
    const res = await fetchData(value);
    setData(res || []);
    setDisabled(false);
  };

  const handleChange = e => setValue(e.target.value);

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-multiline-static"
        value={value}
        label="Query"
        fullWidth
        multiline
        rows="10"
        margin="normal"
        variant="outlined"
        onChange={handleChange}
      />
      <div className={classes.button}>
        <Button
          variant="contained"
          color="primary"
          onClick={getData}
          disabled={disabled}
        >
          Run
        </Button>
      </div>
      <div>
        <TableView data={data} />
      </div>
    </div>
  );
}
