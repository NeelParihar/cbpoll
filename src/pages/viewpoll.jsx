import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useParams } from "react-router";
import { myFirestore, firebase } from '../firebase'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';

const ColorButton = withStyles((theme) => ({
    root: {
        color: 'white',

        backgroundColor: '#FF8E53',
        '&:hover': {
            backgroundColor: '#fd5f1f',
            color: 'white'
        },
        width: '30vh',
        marginBottom:40,
        margin: theme.spacing(1),

    },
}))(Button);
const useStyles = makeStyles((theme) => ({
    mainCard: {

        marginTop: "10vh",
        minWidth: 100,

        marginBottom:"10vh",

        padding: 10,
    },


    pos: {
        marginBottom: 12,
    },
    subtitle: {
        marginTop: 10,


        color: 'grey',

    },
    desc: {
        margin: 40,
        fontSize: 15,
        alignItems: 'left',
        color: 'grey',
        fontStyle: 'italic'
    },
    share: {
        margin: 10,
        fontSize: 22,
        alignItems: 'left',
        color: '#FF8E53',
        
    },
    link:{
        margin: 5,
        fontSize: '1.5vh',
        color:'grey'
    },
    vote: {

        alignSelf: 'left',
        color: 'grey',
        
    },
    radio: {
        padding: 1,
        width: '45vh',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function LinearProgressWithLabel(props) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function Poll(props) {

    const useStateWithLocalStorage = localStorageKey => {
        const [value, setValue] = React.useState(
            localStorage.getItem(localStorageKey) || ''
        );

        React.useEffect(() => {
            localStorage.setItem(localStorageKey, value);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [value]);

        return [value, setValue];
    };

    const classes = useStyles();
    let { id } = useParams();
    const [poll, setPoll] = useStateWithLocalStorage('localPoll');
    const [pollData, setPollData] = useStateWithLocalStorage({});
    const [loading, setLoading] = React.useState(true);
    // const getdata=()=>{
    //     myFirestore.collection("poll").doc(id)
    //         .onSnapshot(function (doc) {

    //             setPollData(doc.data())
    //         });
    // }
    React.useEffect(() => {
        const getPollData = myFirestore
            .collection('poll')
            .doc(id)
            .onSnapshot(snapshot => {

                if(snapshot.exists)
                {
                setPollData(snapshot.data())
                
                let votes =0;
                for (let index = 0; index < snapshot.data().options.length; index++) {
                    const element = snapshot.data().options[index];
                    
                    votes=votes+element.votes;
                    
                    
                }
                setTotalVotes(votes)
                }
                setLoading(false)
                
            })

            

        return () => {
            getPollData()
            
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firebase])
    

    const [open, setOpen] = React.useState(false);
    
    const [totalvotes,setTotalVotes] = React.useState(0);
    // const [option, setOption] = useStateWithLocalStorage('localOption');

    const [op, setOp] = React.useState(-1);


    const handleClick = () => {
        setOpen(!open);
        
    };
    
    // const handleChange = (event, index) => {

    //     setOp(index);
    //     console.log(op)
    // };
    const onSubmit = () => {
        if(op!==-1)
        {
        setPoll(id);
        // setOption(op);
        console.log(op)
        var sfDocRef = myFirestore.collection("poll").doc(id);
        myFirestore.runTransaction(function(transaction) {
            // This code may get re-run multiple times if there are conflicts.
            return transaction.get(sfDocRef).then(function(sfDoc) {
                
        
                // Add one person to the city population.
                // Note: this could be done without a transaction
                //       by updating the population using FieldValue.increment()
                var newPoll = sfDoc.data().options.map(function(item,index)
                {
                    if(index===op)
                    {
                        item.votes=item.votes+1
                        return item;
                    }
                    else{
                         return item;
                    }
                })
                transaction.update(sfDocRef, { options: newPoll });
            });
        }).then(function() {
            console.log("Transaction successfully committed!");
            
            handleClick();
        }).catch(function(error) {
            console.log("Transaction failed: ", error);
        });
    }
            
        

    };



    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Card className={classes.mainCard}>
                    <CardContent>
                        <Typography className={classes.title} variant="h3" component="h2"  >
                            {pollData&&pollData.title}
                        </Typography>
                        <div className={classes.subtitle}>
                            <Typography variant="caption"  >
                            {pollData.title&&'by Guest'}
                        </Typography>
                            <Typography variant="caption"  >

                            </Typography>
                        </div>
                        <div className={classes.desc}>
                            <Typography className={classes.desc} variant="body2"  >
                                { pollData.description&&pollData.description}
                            </Typography>
                        </div>




                        {pollData.options
                            ?
                            <FormControl component="fieldset" className={classes.radio}>
                                <RadioGroup aria-label="" name="" value={op} >
                                    {pollData.options.map(
                                        function (item, index) {
                                            return (
                                                <>
                                                {}
                                                    <FormControlLabel key={parseInt(index)} value={parseInt(index)}  control={<Radio color="default"  onChange={()=>setOp(index)} />} label={item.option} />
                                                    
                                                        
                                                        { poll === id&& <LinearProgressWithLabel  value={item.votes/totalvotes*100 } />}
                                                    {poll === id&&<Typography variant="caption" className={classes.vote} display="block"  > {item.votes+" votes"}</Typography>}
                                                    
                                                    
                                                </>
                                            )

                                        }
                                    )}
                                </RadioGroup>
                            </FormControl>
                            :
                            <>
                            {(!pollData.title&&!loading)&&<Typography className={classes.title} variant="h4" component="h2"  >
                            This Poll doesn't exists.
                        </Typography> }
                            
                            </>
                        }

                        {/* <FormControlLabel value="male" control={<Radio color="default" />} label="Male" />
                                {poll === id && <LinearProgressWithLabel value={40} />}
                                <FormControlLabel value="other" control={<Radio color="default" />} label="Other" />
                                {poll === id && <LinearProgressWithLabel value={40} />} */}


                        <Backdrop className={classes.backdrop} open={loading} >
                                <CircularProgress color="inherit" />
                            </Backdrop>

                    </CardContent>

                    {pollData.title&&<ColorButton size="large" onClick={onSubmit} disabled={poll === id} >Vote</ColorButton>}
                    <Divider />
                    {pollData.title&&<>
                    <Typography className={classes.share} variant="body2"  >
                                {"Share this Poll"}
                            </Typography>
                            <Typography className={classes.link} variant="body2"  >
                                {"https://cbpoll.netlify.app/poll/"+id}
                            </Typography>
                            </>}
                </Card>

            </Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClick} >
                <Alert severity="success">
                    You have Voted Succesfully.
                </Alert>
            </Snackbar>

        </React.Fragment>
    );
}