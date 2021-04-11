import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme)=>({
    root:{
           '& .MuiTextField-root': {
               margin: theme.spacing(1),
       }
       },
   form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        },
    paper:{
        marginTop:'15px',
        padding: theme.spacing(3),
        backgroundColor:'#64b5f6',
        borderRadius:'25px;'
    },  
    TypeField:{
        backgroundColor:'#e1f5fe',
        borderRadius:'20px',

    },
    text:{
        fontFamily:'bold',
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
      },
    buttonSubmit: {
        marginBottom: 10,
      },
}));