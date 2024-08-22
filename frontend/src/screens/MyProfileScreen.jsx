import React, { useEffect, useState } from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from "../actions/profileActions";
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';


const MyProfileScreen = () => {

    const dispatch = useDispatch();
    const profileGet = useSelector((state) => state.profileGet);
    const { loading, error, profile_data } = profileGet;

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    // Check if profile_data exists and has at least one item
    if (!profile_data || profile_data.length === 0) {
        return <div>No profile data found.</div>;
    }

    const profileItem = profile_data[0]; // Accessing the first item from the array


    return (
        <>



            <div className="min-h-screen flex flex-col m-5
justify-center  px-[9rem]">
                <Stack direction="row" className="mb-5" spacing={1}>
                    <Link to='/main'>
                        <Chip label="Back" />
                    </Link>
                </Stack>
                <div className="flex flex-col md:flex-row">
                    <div className="border rounded-md p-1 mb-5 md:mr-5" style={{ width: "200px", height: "200px" }}>
                        <img
                            src={profileItem.prof_pic}
                            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "5%" }}
                            alt="Profile"
                        />
                    </div>
                    <div className=" md:text-left">
                        <div className="mb-3 text-5xl">Hi There, I'm {profileItem.name}</div>
                        <div className="text-4xl uppercase">{profileItem.career} </div>
                    </div>
                </div>
                <div>
                    <div className=" md:text-left my-5">
                        <div className="text-xl">Bio</div>
                        <p>{profileItem.bio}</p>
                    </div>
                    <div className=" md:text-left my-5">
                        <div className="text-xl">Work Experience</div>
                        <p>{profileItem.work}</p>
                    </div>
                    <div className=" md:text-left my-5">
                        <div className="text-xl">Education</div>
                        <p>{profileItem.education}</p>
                    </div>
                    <div className=" md:text-left my-5">
                        <div className="text-xl">Skills</div>
                        <p>{profileItem.skill}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyProfileScreen;
