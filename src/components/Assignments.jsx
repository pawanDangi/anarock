import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { fetchData } from '../api/data';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  button: {
    textAlign: 'right'
  }
}));

export default function Assignments() {
  const classes = useStyles();
  const [data, setData] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const getData = async () => {
    setDisabled(true);
    const res = await fetchData(`select count(*) from assignments`);
    if (res && res[0]) {
      setData(res[0].count);
    }
    setDisabled(false);
  };

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-multiline-static"
        value={`select count(*) from assignments`}
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
      <div>No. of assignments: {data}</div>
    </div>
  );
}
