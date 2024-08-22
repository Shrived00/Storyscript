import { Box, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const SinglePostScreen = () => {
    const { id } = useParams();
    const [blogData, setBlogData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            try {
                console.log('Fetching blog data for ID:', id);
                const response = await axios.get(`${API_BASE_URL}/api/blogs/global/${id}`, config);

                setBlogData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <Header />
            {blogData ? (
                <Container className="mt-4 mb-5">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
                            <div className="flex flex-col gap-6 lg:w-2/4">
                                <img
                                    src={blogData.pic}
                                    alt=".."
                                    className="w-150 h-full aspect-square object-cover rounded-xl"
                                />
                            </div>
                            {/* ABOUT */}
                            <div className="flex flex-col gap-4 lg:w-2/4">
                                <div className="text-violet-600 text-4xl md:text-6xl font-bold underline">
                                    {blogData.title}
                                </div>
                                <div className="text-violet-600 text-4xl md:text-4xl font-bold underline">
                                    {blogData.caption}
                                </div>
                                <p className="text-gray-700">
                                    {blogData.desc}
                                </p>

                            </div>
                        </div>

                    </Box>
                </Container>
            ) : (
                <p>Loading...</p>
            )}
        </>

    );
};

export default SinglePostScreen;
