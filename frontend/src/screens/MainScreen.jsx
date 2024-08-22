import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux';
import { listBlog } from '../actions/blogActions';
import { Avatar, Box, Chip, Container, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { green } from '@mui/material/colors';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import PostProflieScreen from './PostProflieScreen';
import MyProfileScreen from './MyProfileScreen';



const MainScreen = () => {


    const dispatch = useDispatch();

    const blogList = useSelector((state) => state.blogList);
    const { loading, error, blogs } = blogList;

    const blogCreate = useSelector((state) => state.blogCreate);
    const { success: successCreate } = blogCreate;

    const blogUpdate = useSelector((state) => state.blogUpdate);

    const { success: successUpdate } = blogUpdate;

    const blogDelete = useSelector((state) => state.blogDelete);
    const { success: successDelete } = blogDelete;

    const profileGet = useSelector((state) => state.profileGet);
    const { profile_data } = profileGet;

    const profileCreate = useSelector((state) => state.profileCreate);
    const { sucess: successProfile } = profileCreate;


    useEffect(() => {
        dispatch(listBlog())
    }, [dispatch, successCreate, successUpdate, successDelete, successProfile])



    return (
        <div>
            <Header />

            <Container className='mt-3 '>
                <div className='border-b-4 border-t-4 border-gray-500 m-1 p-2'>Your Blogs</div>
                <div className='m-2 p-2 underline' >
                    <Link to='/post'>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ bgcolor: green[500] }}>
                                <AssignmentIcon className='hover:animate-bounce' />
                            </Avatar>
                            <Typography variant="body1" sx={{ marginLeft: 1 }}>
                                Create New Blog
                            </Typography>
                        </Box>
                    </Link>
                </div>
                <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                    {loading && <Loading />}
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {
                        blogs && blogs.reverse().map((c) => (
                            <Grid item xs={2} sm={4} md={4} key={c._id} >

                                <Card className='relative rounded-full' sx={{ maxWidth: 345 }}>


                                    <Link to={`/edit/${c._id}`}>
                                        <div className='absolute top-0 right-0  rounded-full '>

                                            <Avatar sx={{ bgcolor: green[500], borderBottomLeftRadius: '50%' }} variant="rounded">
                                                <EditIcon />
                                            </Avatar>
                                        </div>
                                    </Link>
                                    <CardMedia
                                        component="img"
                                        image={c.pic}
                                        alt="alt pic"
                                        style={{ height: 250 }}
                                    />
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {c.title}
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {c.caption}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {c.desc.split(' ').slice(0, 50).join(' ')}
                                                {c.desc.split(' ').length > 50 ? '...' : ''}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <Chip label={c.category} className='m-2' />
                                    <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                                        <Link to={`/${c._id}`}>
                                            <Button size="small" color="primary">
                                                More...
                                            </Button>
                                        </Link>

                                        <Typography className='text-xs'>{c.createdAt.substring(0, 10)}</Typography>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }





                </Grid>
            </Container>

        </div >
    )
}


export default MainScreen

