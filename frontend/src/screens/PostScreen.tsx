import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Avatar } from "../components/ui/avatar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { createBlog } from "../state/blog/blogSlice";
import { RootState, AppDispatch } from "../state/store";

interface BlogRequest {
  title: string;
  caption: string;
  desc: string;
  pic: string;
  category: string;
}

const PostScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");
  const [pic, setPic] = useState<string>(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [picMessage, setPicMessage] = useState<string | null>(null);

  const { loading, error } = useSelector(
    (state: RootState) => state.blog || {}
  );
  console.log(imgUrl);

  const postDetails = (file: File) => {
    if (!file) return;

    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/webp"
    ) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "dmbsjdf33");

      fetch("https://api.cloudinary.com/v1_1/dmbsjdf33/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImgUrl(data.url.toString());
          setPic(data.secure_url);
          setPicMessage(null);
        })
        .catch((err) => {
          console.error("Upload error:", err);
          setPicMessage("Upload failed.");
        });
    } else {
      setPicMessage("Please select a valid image (jpeg, png, jpg, webp).");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !caption || !desc || !category) return;

    const blogData: BlogRequest = {
      title,
      caption,
      desc,
      pic,
      category,
    };

    dispatch(createBlog(blogData));
    navigate("/main");
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-lg shadow-md">
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      <div className="flex flex-col items-center mb-6">
        <Avatar className="w-14 h-14 bg-secondary mb-2">
          <Plus className="text-white" />
        </Avatar>
        <h1 className="text-xl font-semibold">New Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="caption">Caption</Label>
          <Input
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="desc">Description</Label>
          <Textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Category</Label>
          <Select
            onValueChange={(value) => setCategory(value)}
            defaultValue={category}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Lifestyle">Lifestyle</SelectItem>
              <SelectItem value="Inspiration">Inspiration</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files[0]) {
                postDetails(e.target.files[0]);
              }
            }}
          />
          {picMessage && (
            <p className="text-sm text-red-500 mt-1">{picMessage}</p>
          )}
          {pic && (
            <img
              src={pic}
              alt="preview"
              className="mt-2 w-full h-48 object-cover rounded-lg"
            />
          )}
        </div>

        <Button type="submit" className="w-full">
          POST
        </Button>
      </form>
    </div>
  );
};

export default PostScreen;
