import  React, { useEffect, useState } from 'react';
import { Paper, Typography,TextField, Button } from '@material-ui/core'
import FileBase from 'react-file-base64';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useDispatch,useSelector } from 'react-redux';

import useStyles from './styles';

import {createPost,updatePost} from '../../actions/posts';

 

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    
    const [ postData, setPostData ] = useState({ title:'', message:'', tags:'', selectedFile:'' });

    const post = useSelector((state) => currentId ? state.posts.find((message) => message._id === currentId):null);

    const user = JSON.parse(localStorage.getItem('profile'));


    useEffect(()=>{
        if(post){
            setPostData(post);
        }
    },[post]);

    const clear=()=>{
        setCurrentId(0);
        setPostData({ title:'', message:'', tags:'', selectedFile:'' });
    };

  const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId === 0){
            console.log("create");
            dispatch(createPost({ ...postData, name:user?.result?.name }));
            clear();
        }
        else{
            console.log("Update");
            dispatch(updatePost(currentId,{ ...postData, name:user?.result?.name }));
            clear();
        }

};


    if(!user?.result?.name){
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please sign in for create moment and like other moments
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                
                <Typography variant="h5" className={classes.text}>{currentId ? `Editing "${post.title}"`:"Upload moment"}</Typography>
                
                <TextField name="title" className={classes.TypeField} required label="Title" fullWidth value={postData.title}  variant="outlined" onChange={(e) => setPostData({...postData,title:e.target.value})}/>

                <TextField name="message" className={classes.TypeField} required label="Message" multiline rows={3} fullWidth value={postData.message} variant="outlined" onChange={(e) => setPostData({...postData,message:e.target.value})}/>

                <TextField  name="tags"  className={classes.TypeField} required label="Tag (comma separated)" fullWidth variant="outlined" value={postData.tags} onChange={(e) => setPostData({...postData, tags:e.target.value.split(',') })}/>

                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}/>
                </div>

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" startIcon={<CloudUploadIcon />} type="submit" fullWidth>Upload</Button>

                <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>Clear</Button>

           </form>
        </Paper>
    );
};


export default Form
