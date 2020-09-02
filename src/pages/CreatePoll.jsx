import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, withStyles, } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import {myFirestore} from '../firebase.js'
import {
    Formik
  } from 'formik';
  import * as Yup from 'yup';
const ColorButton = withStyles((theme) => ({
    root: {
        color: 'white',

        backgroundColor: '#FF8E53',
        '&:hover': {
            backgroundColor: '#fd5f1f',
            color: 'white'
        },
        margin: theme.spacing(1),

    },
}))(Button);

const useStyles = makeStyles({
    mainCard: {
        marginTop: 60,
        minWidth: 250,
        padding: 15,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    form: {
        '& .MuiTextField-root': {

            minWidth: '100%',
            marginTop: 15,
        },

        '&.Mui-focused fieldset': {
            borderColor: 'green',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
    },
    pos: {
        marginBottom: 12,
    },
});
export default function CreatePoll() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Card className={classes.mainCard}>
                    <CardContent>
                        <Typography className={classes.title} variant="h4" component="h2"  >
                            Create Poll
                        </Typography>

                        <FormCreate />

                    </CardContent>



                </Card>
            </Container>
        </React.Fragment>
    );
}
function FormCreate() {
    
    const classes = useStyles();
    const defaultOptions = [{option:'',votes:0},{option:'',votes:0}];
    const [options,setOptions] = React.useState(defaultOptions)
  
    const removeOptions = () => {
        if (options.length > 2) {
            // var newArr = options.slice(0, -1); 
            setOptions(options.slice(0, -1));
        }
    };
    const handleOptions = idx => evt => {
        const newShareholders = options.map((shareholder, sidx) => {
          if (idx !== sidx) return shareholder;
          return { ...shareholder, option: evt.target.value };
        });
    
        setOptions(newShareholders)
      };
    
    const addOptions = () => {
        if (options.length < 10) {
            setOptions([ ...options,{option:'',votes:0}]);
        }
    };
    return (
    <Formik
                initialValues={{ title: '', description: ''}}
                onSubmit={(values) => {
                   console.table(values);
                   console.table(options);

                   myFirestore.collection("poll").add({
                    title:values.title,
                    description:values.description,
                    options:options

                })
                .then(function(doc) {
                    console.log("Document successfully written!"+doc.id);
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
                
                   
                  
                }}

                validationSchema={Yup.object().shape({
                  title: Yup.string()
                    
                    .required('Title is Required'),
                  description: Yup.string(),

                  
                   
                  
                })}
              >
                {(props) => {
                  const {
                    
                    touched,
                    errors,
                    
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    
                  } = props;
    return (
        
        <form className={classes.form} onSubmit={handleSubmit}  >


            <div>
                <TextField

                    
                    label="Title*"
                    
                    name="title"
                    style={{ marginTop: 60 }}
                    variant="outlined"
                    placeholder="Enter the Question here.."
                    
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={(errors.title && touched.title) && errors.title}
                    error={errors.title && touched.title}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}

                />
            </div>
            <div>
                <TextField
                    id="outlined-error"
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Enter the Description here.."
                    margin="normal"
                    
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={(errors.description && touched.description) && errors.description}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>





                            Add Options


            <IconButton aria-label="remove" onClick={() => { removeOptions() }}>
                <RemoveIcon />
            </IconButton>
            <IconButton aria-label="add" onClick={() => { addOptions() }}>

                <AddIcon />
            </IconButton>


            <div>

                {options.map(
                    function (item,index) {
                       return <TextField

                       required
                            label="Option"
                            name='optionsAns'
                            variant="outlined"
                            placeholder="Enter the option here.."
                            onChange={handleOptions(index)}
                            
                            // helperText={(errors.optionsAns && touched.optionsAns) && errors.optionsAns}
                            // error={errors.optionsAns && touched.optionsAns}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    }
                )}
            </div>
            <ColorButton size="large" type="submit">Create Poll</ColorButton>


        </form>
        );
    }}
  </Formik>
    );
        
    
}