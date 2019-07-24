import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import SQLEditor from './SQLEditor';
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

  const handleChange = v => setValue(v);

  return (
    <div className={classes.root}>
      <SQLEditor getValue={handleChange} />
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
