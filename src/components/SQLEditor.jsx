import React, { useState } from 'react';
import AceEditor from 'react-ace';
import { makeStyles } from '@material-ui/core/styles';

import 'brace/mode/mysql';
import 'brace/theme/monokai';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '20px 0'
  }
}));

export default function SQLEditor({ getValue }) {
  const classes = useStyles();
  const [value, setValue] = useState('');
  function onChange(newValue) {
    setValue(newValue);
    getValue(newValue);
  }
  return (
    <div className={classes.root}>
      <AceEditor
        placeholder="Query"
        width="100%"
        height="250px"
        mode="mysql"
        theme="monokai"
        name="blah2"
        onChange={onChange}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={value}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2
        }}
      />
    </div>
  );
}
