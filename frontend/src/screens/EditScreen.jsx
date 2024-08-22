import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add'; import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, deleteBlog, updateBlog } from '../actions/blogActions';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import axios from 'axios';


const EditScreen = () => {


    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState();
    const [caption, setCaption] = useState();
    const [desc, setDesc] = useState();




    const [picMessage, setPicMessage] = useState(null);

    const [imgUrl, setImgUrl] = useState("");

    const [pic, setPic] = useState(

        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"

    );

    const [category, setCategory] = useState('');


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

                    setPic(data.secure_url);

                })

                .catch((err) => {

                    console.log(err);

                });

        } else {

            return setPicMessage("Please Select an Image");

        }

    };
    const handleChange = (e) => {
        e.preventDefault();
        setCategory(e.target.value);
    };


    const dispatch = useDispatch();
    const blogUpdate = useSelector((state) => state.blogUpdate);
    const userInfo = useSelector((state) => state.userLogin.userInfo);

    const { loading, error } = blogUpdate;


    const blogDelete = useSelector((state) => state.blogDelete);
    const { loading_del, error_del } = blogDelete;


    useEffect(() => {

        const fetching = async () => {

            const config = {

                headers: {

                    Authorization: `Bearer ${userInfo.token}`,

                },

            }


            const { data } = await axios.get(`/api/blogs/${id}`, config);

            setTitle(data.title);
            setCaption(data.caption);
            setDesc(data.desc);
            setPic(data.pic);
            setCategory(data.category);
            console.log(pic);

        };
        fetching()

    }, [id]);


    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(updateBlog(id, title, caption, desc, pic, category));

        navigate("/main")

    }

    const deleteHandler = (e) => {
        e.preventDefault();
        if (window.confirm("Are you Sure?")) {
            dispatch(deleteBlog(id));
            navigate("/main")

        }
    }
    return (
        <div>




            <Container component="main" maxWidth="xs">
                {loading && <Loading />}
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {loading_del && <Loading />}
                {error_del && <ErrorMessage>{error_del}</ErrorMessage>}
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
                    <Box component="form" noValidate onSubmit={updateHandler} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    autoFocus
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)} />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth

                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)} />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    autoFocus
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)} />
                            </Grid>
                            <Grid item xs={12} >
                                <FormControl sx={{ minWidth: 80 }}>
                                    <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        value={category}
                                        onChange={handleChange}
                                        autoWidth
                                        label="Category"
                                    >
                                        <MenuItem value="Interesting">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"Technology"}>Technology</MenuItem>
                                        <MenuItem value={"Lifestyle"}>Lifestyle</MenuItem>
                                        <MenuItem value={"I'm Feeling Lucky"}>
                                            I'm Feeling Lucky</MenuItem>
                                    </Select>
                                </FormControl>
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
                                onClick={deleteHandler}
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

export default EditScreen


