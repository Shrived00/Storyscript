"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../state/store";
import { getProfile } from "../state/profile/profileSlice";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ArrowLeft, Briefcase, GraduationCap, Code, User } from "lucide-react";
import Loading from "../components/Loading";

const MyProfileScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { loading, error, profile } = useSelector(
    (state: RootState) => state.profile
  );
  const { userInfo } = useSelector((state: RootState) => state.user); // assuming `auth` slice

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    // If there's an error and the user is viewing *their own* profile
    if (error && userInfo?._id === userId) {
      navigate("/myprofile/create");
    }
  }, [error, userInfo, userId, navigate]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    // Show error only if it's not the logged-in user's profile
    return (
      <div className="min-h-screen bg-[#F5D04E]/10 flex items-center justify-center font-['Figtree_Variable',sans-serif]">
        <Card className="p-6 rounded-2xl border border-black shadow-[0.4rem_0.4rem_0_0_#000] max-w-md">
          <h2 className="text-xl font-[800] mb-4">Error</h2>
          <p className="text-neutral-600">Profile doesn't exist</p>
          <Link
            to="/main"
            className="mt-4 inline-flex items-center text-sm font-[700] text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to blogs
          </Link>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return null; // edge case
  }

  return (
    <div className="min-h-screen bg-[#F5D04E]/10 py-10 px-4 font-['Figtree_Variable',sans-serif]">
      <div className="container mx-auto max-w-4xl">
        <Link
          to="/main"
          className="inline-flex items-center mb-6 text-sm font-[700] text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to blogs
        </Link>

        <Card className="rounded-2xl border border-black shadow-[0.4rem_0.4rem_0_0_#000] overflow-hidden bg-white">
          <div className="p-6 md:p-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
              <div className="relative">
                <div className="w-[200px] h-[200px] rounded-2xl overflow-hidden border-2 border-black">
                  <img
                    src={
                      profile.prof_pic ||
                      "/placeholder.svg?height=200&width=200"
                    }
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-[#F5D04E] rounded-full p-2 border border-black">
                  <User className="h-5 w-5" />
                </div>
              </div>

              <div className="text-center md:text-left flex-1">
                <div className="inline-block bg-[#F5D04E] px-3 py-1 rounded-full text-sm font-[700] mb-3 shadow-[1px_1px_1px_0_rgba(0,0,0,.2)]">
                  My Profile
                </div>
                <h1 className="text-3xl md:text-4xl font-[800] mb-2">
                  Hi There, I'm {profile.name}
                </h1>
                <h2 className="text-xl md:text-2xl font-[700] text-neutral-600 uppercase">
                  {profile.career}
                </h2>
              </div>
            </div>

            {/* Bio Section */}
            <Section title="Bio" icon={<User className="h-4 w-4" />}>
              {profile.bio}
            </Section>

            {/* Work Experience */}
            <Section
              title="Work Experience"
              icon={<Briefcase className="h-4 w-4" />}
            >
              {profile.work}
            </Section>

            {/* Education */}
            <Section
              title="Education"
              icon={<GraduationCap className="h-4 w-4" />}
            >
              {profile.education}
            </Section>

            {/* Skills */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-[#F5D04E] p-1 rounded">
                  <Code className="h-4 w-4" />
                </div>
                <h3 className="text-xl font-[800]">Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.skill.split(",").map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm font-[600] border border-gray-200"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Edit Button */}
            <div className="mt-8 flex justify-center md:justify-end">
              <Link to="/edit-profile">
                <Button className="bg-black hover:bg-gray-800 text-white font-[700] py-2 px-4 rounded-lg transition-colors">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const Section = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 mb-3">
      <div className="bg-[#F5D04E] p-1 rounded">{icon}</div>
      <h3 className="text-xl font-[800]">{title}</h3>
    </div>
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <p className="text-neutral-700 whitespace-pre-line">{children}</p>
    </div>
  </div>
);

export default MyProfileScreen;
