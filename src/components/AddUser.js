import React, {useState, useEffect} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function AddUser() {
  const classes = useStyles();
  const [newUser, setNewUser] = useState('')
  const [delUser, setDelUser] = useState('')
  const [delUsers, setDelUsers] = useState([])
  const [triggerDel, setTriggerDel] = useState(true)

  function handleSubmit(e) {
    e.preventDefault()
    fetch(`https://tuesdai-server.herokuapp.com/post/user`, {
      method: 'POST',
      body: JSON.stringify({name: newUser}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }  
  })
  .then(res => res.json())
  .then(json => alert(`you added: ${newUser}`))
  .then(setTriggerDel(!triggerDel))
  .catch(err => alert(err))
  setNewUser('')
  
}

function handleDelete(e) {
  e.preventDefault()
    fetch(`https://tuesdai-server.herokuapp.com/delete/user/${delUser}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }  
  })
  .then(res => res.json())
  .then(json => alert(`you deleted: ${delUser}`))
  .catch(err => alert(err))
}

function fetchUsers(url) {
  fetch(url)
  .then(res => res.json())
  .then(data => setDelUsers(data))
}


useEffect(() => {
  fetchUsers('https://tuesdai-server.herokuapp.com/get/users')
}, [triggerDel])

const DisplayUsers = () => {
  if (delUsers.length > 0) {
    return delUsers.map(user => <option value={user.name}>{user.name}</option>
    )
  } else {
    return (
      <option>No one to delete.</option>
    )
  }
}

  return (
    <div className='dataRows'>
      <h1>Team "Firepower"</h1>
        <TextField id="outlined-basic" label="New User" variant="outlined" value={newUser} onChange={(e) => setNewUser(e.target.value)} />
        <Button variant="contained" type='submit' onClick={(e) => {handleSubmit(e)}}>Add</Button>
        <FormControl className={classes.margin}>
        <InputLabel>Delete User</InputLabel>
        <NativeSelect id="demo-customized-select-native" onChange={(e) => setDelUser(e.target.value)} value={delUser}>
          <option value='' selected hidden></option>
          <DisplayUsers/>
        </NativeSelect>
      </FormControl>
      <Button variant="contained" type='submit' onClick={(e) => {handleDelete(e)}}>Delete</Button>
    </div>
    
  )
}

export default AddUser;