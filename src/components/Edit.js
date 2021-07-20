import React, {useState, useEffect} from "react";
import { useParams } from "react-router";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';




function Edit(props) {
  const [id, setId] = useState(props.location.data.id)
  const [task, setTask] = useState(props.location.data.task)
  const [name, setName] = useState(props.location.data.name)
  const [status, setStatus] = useState(props.location.data.status)
  const [priority, setPriority] = useState(props.location.data.priority)
  const [user_id, setUserId] = useState(props.location.data.user_id)


  function getValues() {
    fetch()
    .then(res => res.json())
    .then(data => data)
  }
  
  // id: team.task_id,
  // task: team.task,
  // user_id: team.user_id,
  // status: team.status,
  // priority: team.priority

  function handleSubmit() {
      fetch(`http://localhost:3001/patch/task`, {
        method: 'PATCH',
        body: JSON.stringify(
          {
            id: id,
            task: task,
            user_id: user_id,
            name: name,
            status: status,
            priority: priority
          }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }  
    })
    .then(res => res.json())
    .then(json => alert(`Success`))
    .catch(err => alert(err))
    .then(fetch(`http://localhost:3001/patch/user`, {
      method: 'PATCH',
      body: JSON.stringify(
        {
          id: id,
          name: name,
        }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    } 
    }))
  }
  return (
    <div className='edit'>
       <TextField id="outlined-basic" label="Task" variant="outlined" onChange={(e) => setTask(e.target.value)} value={task} />
       <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} value={name}/>
       <TextField id="outlined-basic" label="Status" variant="outlined" onChange={(e) => setStatus(e.target.value)} value={status}/>
       <TextField id="outlined-basic" label="Priority" variant="outlined" onChange={(e) => setPriority(e.target.value)} value={priority} />
       <Button variant="contained" onClick={handleSubmit}>Submit Changes</Button>
       <div>{`${props.location.data.id}`}</div>
       <div>{console.log(props.location.data)}</div>
    </div>
  )
}


export default Edit;