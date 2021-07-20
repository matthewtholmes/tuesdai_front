import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AddTask from './AddTask';
import AddUser from './AddUser';
import App from '../App.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function RenderData() {
  const [teamData, setTeamData] = useState([])
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  
  useEffect(() => {
    function fetchTeam(url) {
      fetch(url)
      .then(res => res.json())
      .then(data => setTeamData(data))
    }
    fetchTeam('https://tuesdai-server.herokuapp.com/get')
  }, [])
  
  const displayData = () => {
    if (teamData.length > 0) {
      return teamData.map(team => <div className='dataRows'><Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color='textSecondary' gutterBottom>
            {team.task}
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color='textSecondary' gutterBottom>
            {team.name}
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color='textSecondary' gutterBottom>
            {team.status}
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color='textSecondary' gutterBottom>
            {team.priority}
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color='textSecondary' gutterBottom>
            {team.updated_at} Edit
          </Typography>
        </CardContent>
      </Card>
      <Link to={{
        pathname: `/edit/${team.task_id}`,
        data: {
          id: team.task_id,
          user_id: team.user_id,
          task: team.task,
          name: team.name,
          status: team.status,
          priority: team.priority
        }
      }}>
      <Button variant="contained">Edit</Button>
      </Link>
      <Button variant="contained">Delete</Button>
     </div>
      )
    } else {
      return (
        <div>Loading the Information, wait a second or forever.</div>
      )
    }
  }


  return (
    <div className='box'>
      <AddUser />
      <div>{displayData()}</div>
      <AddTask />
    </div>
  );
}

export default RenderData;