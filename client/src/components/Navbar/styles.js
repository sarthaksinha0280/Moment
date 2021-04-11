import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme)=>({
    appBar:{
        borderRadius: 20,
        margin: '10px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
        
    },
    name:{
      marginTop:'70px',
      marginLeft:'4px',
      color:'#bbdefb'
    },
    heading: {
        color: '#ffff00',
        textDecoration: 'none',
        fontSize:'80px',
        fontFamily:'bold'
      },
    image: {
        marginLeft: '-40px',
        borderRadius:'20px'
      },
      toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px',
      },
      profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
      },
      userName: {
        display: 'flex',
        alignItems: 'center',
      },
      brandContainer: {
        display: 'flex',
        alignItems: 'center',
      },
      purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
      },
}));