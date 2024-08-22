import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add'; import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { createProfile } from '../actions/profileActions';



const PostProflieScreen = () => {
    const navigate = useNavigate();


    const [name, setName] = useState();
    const [career, setCareer] = useState();
    const [bio, setBio] = useState();
    const [work, setWork] = useState();
    const [education, setEducation] = useState();
    const [skill, setSkill] = useState();

    const [picMessage, setPicMessage] = useState(null);

    const [imgUrl, setImgUrl] = useState("");

    const [prof_pic, setProf_pic] = useState(

        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"

    );
    const postDetails = (pics) => {

        if (
            pics ===
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        ) {
            return setPicMessage("Please Select an Image");
        }
        setPicMessage(null);

        if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg" || pics.type === 'image/webp') {

            const data = new FormData();

            data.append("file", pics);

            data.append("upload_preset", "notezipper");

            data.append("cloud_name", "dmbsjdf33");

            fetch("https://api.cloudinary.com/v1_1/dmbsjdf33/image/upload", {

                method: "post",

                body: data,

            })

                .then((res) => res.json())

                .then((data) => {

                    setImgUrl(data.url.toString());

                    setProf_pic(data.secure_url);

                })

                .catch((err) => {

                    console.log(err);

                });

        } else {

            return setPicMessage("Please Select an Image");

        }

    };


    const dispatch = useDispatch();
    const profileCreate = useSelector((state) => state.profileCreate);
    const { loading, error, profile } = profileCreate;

    const submitHandler = (e) => {
        e.preventDefault();
        if (!name || !career || !bio || !work || !education || !skill) return;
        dispatch(createProfile(name, career, bio, work, education, skill, prof_pic))

        navigate("/main");
    }
    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     console.log(name, career, bio, work, education, skill, prof_pic);
    // }

    return (
        <div>




            <Container component="main" maxWidth="xs">
                {loading && <Loading />}
                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Edit Post
                    </Typography>
                    <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth

                                    label="Name"

                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Career"

                                    value={career}
                                    onChange={(e) => setCareer(e.target.value)} />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    autoFocus
                                    label="Bio"

                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    autoFocus
                                    label="Work Experience"

                                    value={work}
                                    onChange={(e) => setWork(e.target.value)} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    autoFocus
                                    label="Education"

                                    value={education}
                                    onChange={(e) => setEducation(e.target.value)} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    autoFocus
                                    label="Skill"

                                    value={skill}
                                    onChange={(e) => setSkill(e.target.value)} />
                            </Grid>


                            <Grid item xs={12} >
                                <input type="file" accept="image/*"
                                    onChange={(e) => postDetails(e.target.files[0])} />
                            </Grid>


                        </Grid>
                        <Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >Update
                            </Button> <Button
                                // onClick={deleteHandler}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >Delete
                            </Button>
                        </Grid>

                    </Box>
                </Box>
            </Container >




        </div>



    )
}

export default PostProflieScreen
