import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import illustrations from '../images/illustrations/Customer-polls.svg'
const ColorButton = withStyles((theme) => ({
    root: {
      color: 'white',
      
      backgroundColor: '#FF8E53',
      '&:hover': {
        backgroundColor: '#fd5f1f',
        color:'white'
      },
      margin: theme.spacing(1),

    },
  }))(Button);
const useStyles = makeStyles({
    mainCard: {
        marginTop:60,
        minWidth: 200,
       padding:15,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    
    pos: {
        marginBottom: 12,
    },
});
export default function Home() {
    const classes = useStyles();
   
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
                <Card className={classes.mainCard}>
                    <CardContent>
                        <Typography className={classes.title}  variant="h4" component="h2"  >
                            Create Poll in Seconds
                        </Typography>
                        <img src={illustrations} style={{height:'30%',width:'90%'}} alt=''/>
                        
                        
                    </CardContent>
                    
                        <ColorButton size="large" href='/create'>Create a Poll</ColorButton>
                   
                </Card>
            </Container>
        </React.Fragment>
    );
}