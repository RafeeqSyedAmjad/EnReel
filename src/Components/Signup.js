import * as React from 'react';
import { useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Signup.css';
import Instagram from '../Assets/ENREEL.png'
import { createUseStyles } from 'react-jss';
import Alert from '@mui/material/Alert';
// import { border } from '@mui/system';
import TextField from '@mui/material/TextField';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Link, useNavigate } from 'react-router-dom';
// import { ClassNames } from '@emotion/react';
import { AuthContext } from '../Context/AuthContext';
import { database, storage } from '../firebase';

export default function Signup() {
    const useStyles = createUseStyles({
        text1: {
            color: 'gray',
            textAlign: "center"
        },
        card2: {
            height: '6vh',
            marginTop: '2%'
        }
    });
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { signup } = useContext(AuthContext);

    const handleClick = async () => {
        if (file == null) {
            setError("Please upload profile image first");
            setTimeout(() => {
                setError('')
            }, 2000)
            return;
        }
        try {
            setError('')
            setLoading(true)
            // console.log("heelooo")
            let userObj = await signup(email, password)
            let uid = userObj.user.uid
            console.log(uid)
            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
            uploadTask.on('state_changed', fn1, fn2, fn3);
            function fn1(snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress} done.`)
            }
            function fn2(error) {
                setError(error);
                setTimeout(() => {
                    setError('')
                }, 2000);
                setLoading(false)
                return;
            }
            function fn3() {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    console.log(url);
                    database.users.doc(uid).set({
                        email: email,
                        userId: uid,
                        fullname: name,
                        profileUrl: url,
                        createdAt: database.getTimeStamp()
                    })
                })
                setLoading(false);
                navigate("/", { replace: true });
            }
        } catch (err) {
            setError(err.message);
            setTimeout(() => {
                setError('')
            }, 5000)
            setLoading(false);
        }
    }

    return (
        <div className="signupWrapper">
            <div className="signupCard">
                <Card variant='outlined'>
                    <div className="insta-logo">
                        <img src={Instagram} alt="" />
                    </div>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle1">
                            Sign up to see videos from your friends... GoodLuck!!
                        </Typography>
                        {error !== '' && <Alert severity="error">{error}</Alert>}
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size="small" value={name} onChange={(e) => setName(e.target.value)} />
                        <Button color="secondary" fullWidth={true} variant="outlined" margin="dense" startIcon={<FileUploadIcon />} component="label">
                            Upload Profile Image
                            <input type="file" accept="image/*" hidden onChange={(e) => setFile(e.target.files[0])} />
                        </Button>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" fullWidth={true} variant="contained" disabled={loading} onClick={handleClick}>
                            Sign up
                        </Button>
                    </CardActions>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle1">
                            By signing up, you agree to our Terms, Conditions and Cookies policy.
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined" className={classes.card2}>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle1">
                            Having an account ? <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>


    );
}