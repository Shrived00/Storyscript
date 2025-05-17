import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { AppDispatch, RootState } from "../state/store";
import { createProfile } from "../state/profile/profileSlice";
import { ArrowLeft, Upload } from "lucide-react";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import toast from "react-hot-toast";

const PostProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [career, setCareer] = useState("");
  const [bio, setBio] = useState("");
  const [work, setWork] = useState("");
  const [education, setEducation] = useState("");
  const [skill, setSkill] = useState("");
  const [picMessage, setPicMessage] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState("");
  console.log(imgUrl);
  const [prof_pic, setProf_pic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );

  const profileCreate = useSelector((state: RootState) => state.profile);
  const { loading } = profileCreate;

  const postDetails = (pics: File) => {
    if (!pics || pics.name === "anonymous-avatar-icon-25.jpg") {
      return setPicMessage("Please Select an Image");
    }

    setPicMessage(null);

    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg" ||
      pics.type === "image/webp"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "dmbsjdf33");

      fetch("https://api.cloudinary.com/v1_1/dmbsjdf33/image/upload", {
        method: "POST",
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
      setPicMessage("Please Select an Image");
    }
  };
  const { userInfo } = useSelector((state: RootState) => state.user);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !career || !bio || !work || !education || !skill) {
      toast.error("Please fill in all fields.");
      return;
    }

    dispatch(
      createProfile({ name, career, bio, work, education, skill, prof_pic })
    );

    toast.success("Profile created successfully!");
    navigate("/profile/" + userInfo?._id);
  };

  return (
    <div className="min-h-screen bg-[#F5D04E]/10 py-10 px-4 font-['Figtree_Variable',sans-serif]">
      <div className="container mx-auto max-w-4xl">
        {loading && <Loading />}

        <Link
          to="/main"
          className="inline-flex items-center mb-6 text-sm font-[700] text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to blogs
        </Link>

        <Card className="rounded-2xl border border-black shadow-[0.4rem_0.4rem_0_0_#000] overflow-hidden bg-white">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-center mb-6 flex-col">
              <div className="bg-[#F5D04E] rounded-full p-3 mb-4">
                <Upload className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-[800]">Edit Profile</h1>
              <p className="text-neutral-500 text-sm mt-1">
                Create your new profile
              </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
              <div className="space-y-2">
                <Label className="font-[600] text-sm">Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-lg border-gray-300 focus:border-black focus:ring-black"
                  placeholder="Name"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-[600] text-sm">Career</Label>
                <Input
                  required
                  value={career}
                  onChange={(e) => setCareer(e.target.value)}
                  className="rounded-lg border-gray-300 focus:border-black focus:ring-black"
                  placeholder="Career"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-[600] text-sm">Bio</Label>
                <Input
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="rounded-lg border-gray-300 focus:border-black focus:ring-black"
                  placeholder="Bio"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-[600] text-sm">Work Experience</Label>
                <Input
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                  className="rounded-lg border-gray-300 focus:border-black focus:ring-black"
                  placeholder="Work Experience"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-[600] text-sm">Education</Label>
                <Input
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="rounded-lg border-gray-300 focus:border-black focus:ring-black"
                  placeholder="Education"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-[600] text-sm">Skill</Label>
                <Input
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  className="rounded-lg border-gray-300 focus:border-black focus:ring-black"
                  placeholder="Skill"
                />
              </div>

              {picMessage && (
                <p className="text-red-500 text-sm">{picMessage}</p>
              )}

              <div className="space-y-2">
                <Label className="font-[600] text-sm">Profile Picture</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && postDetails(e.target.files[0])
                  }
                  className="rounded-lg border-gray-300 focus:border-black focus:ring-black text-sm"
                />
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PostProfileScreen;
