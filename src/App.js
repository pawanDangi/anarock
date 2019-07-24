import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Panels from './components/Panels';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    width: '80%',
    margin: 'auto',
    marginTop: '60px'
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Panels />
      </Paper>
    </div>
  );
}
