import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { AppDispatch, RootState } from "../state/store";
import { createProfile } from "../state/profile/profileSlice";

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
  const { loading, error } = profileCreate;

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

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !career || !bio || !work || !education || !skill) return;

    dispatch(
      createProfile({ name, career, bio, work, education, skill, prof_pic })
    );
    navigate("/main");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded shadow">
        {loading && <Loading />}
        <div className="flex flex-col items-center">
          <div className="bg-purple-500 rounded-full w-12 h-12 flex items-center justify-center text-white text-lg font-bold">
            +
          </div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Edit Post
          </h2>
        </div>
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            required
            placeholder="Career"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Work Experience"
            value={work}
            onChange={(e) => setWork(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {picMessage && <p className="text-red-500 text-sm">{picMessage}</p>}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && postDetails(e.target.files[0])}
            className="w-full text-sm"
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update
            </button>
            <button
              type="button"
              className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostProfileScreen;
