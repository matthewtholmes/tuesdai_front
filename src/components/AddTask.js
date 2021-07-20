import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      minWidth: 275,
      minHeight: 54
    },
  },
}));

function AddTask() {

  const classes = useStyles();
  return (
    <div className='dataRows'>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Task" variant="outlined" />
        <TextField id="outlined-basic" label="Individual Assigned" variant="outlined" />
        <TextField id="outlined-basic" label="Status" variant="outlined" />
        <TextField id="outlined-basic" label="Priority" variant="outlined" />
        <Button variant="contained">Add Task</Button>
      </form>
    </div>
  )
}

export default AddTask;