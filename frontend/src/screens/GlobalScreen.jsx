import React, { useEffect } from 'react'
import Header from '../components/Header'

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
import { useDispatch, useSelector } from 'react-redux';
import { globalListBlog } from '../actions/globalActions';



const GlobalScreen = () => {
    // const [blogData, setBlogData] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const config = {
    //             headers: {
    //                 "Content-type": "application/json"
    //             }
    //         }
    //         try {
    //             const response = await axios.get('/api/blogs/global', config);
    //             setBlogData(response.data);

    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     fetchData();
    // }, []);
    const dispatch = useDispatch();
    const globalBlogList = useSelector((state) => state.globalBlogList);

    const { loading, error, blogs } = globalBlogList;

    useEffect(() => {
        dispatch(globalListBlog())
    }, [dispatch])

    return (
        <div>
            <Header />
            <Container className='mt-3 '>
                {loading && <Loading />}
                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                    {
                        blogs && blogs.reverse().map((c) => (
                            <Grid item xs={2} sm={4} md={4} key={c.id} >

                                <Card sx={{ maxWidth: 345 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image={c.pic}
                                            alt="alt pic"
                                            style={{ height: 250 }}
                                        />
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

export default GlobalScreen
