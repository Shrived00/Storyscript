import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";

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
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { createBlog } from "../state/blog/blogSlice";
import { RootState, AppDispatch } from "../state/store";
import { Card } from "../components/ui/card";
import toast from "react-hot-toast";

interface BlogRequest {
  title: string;
  caption: string;
  desc: string;
  pic: string;
  category: string;
  authorName: string;
}

const PostScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [picMessage, setPicMessage] = useState<string | null>(null);

  const { loading, error } = useSelector(
    (state: RootState) => state.blog || {}
  );

  const postDetails = (file: File) => {
    if (!file) return;

    if (
      ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type)
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
          if (data && data.secure_url) {
            setPic(data.secure_url);
            setPicMessage(null);
          } else {
            setPicMessage("Upload failed. Invalid response from server.");
          }
        })
        .catch((err) => {
          console.error("Upload error:", err);
          setPicMessage("Upload failed.");
        });
    } else {
      setPicMessage("Please select a valid image (jpeg, png, jpg, webp).");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !caption || !desc || !category) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const blogData: BlogRequest = {
      title,
      caption,
      desc,
      pic,
      category,
      authorName: JSON.parse(localStorage.getItem("userInfo") || "UnknownUser")
        .name,
    };

    try {
      await dispatch(createBlog(blogData));
      toast.success("Blog created successfully!");
      navigate("/main");
    } catch (err) {
      console.error("Blog creation failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5D04E]/10 py-10 px-4 font-['Figtree_Variable',sans-serif]">
      <div className="container mx-auto max-w-2xl">
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
              <h1 className="text-2xl font-[800]">Edit Post</h1>
              <p className="text-neutral-500 text-sm mt-1">
                Post your New blog
              </p>
            </div>

            {loading && <Loading />}
            {error && <ErrorMessage message={error} />}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="font-[600] text-sm">
                  Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-lg border-gray-300 focus:border-black focus:ring-black"
                  placeholder="Enter post title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="caption" className="font-[600] text-sm">
                  Caption
                </Label>
                <Input
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="rounded-lg border-gray-300 focus:border-black focus:ring-black"
                  placeholder="Enter caption"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="desc" className="font-[600] text-sm">
                  Description
                </Label>
                <Textarea
                  id="desc"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="rounded-lg border-gray-300 focus:border-black focus:ring-black"
                  placeholder="Enter description"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-[600] text-sm">Category</Label>
                <Select
                  onValueChange={(value) => setCategory(value)}
                  value={category || undefined}
                >
                  <SelectTrigger className="rounded-lg border-gray-300 focus:border-black focus:ring-black">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="Inspiration">Inspiration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="font-[600] text-sm">Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files[0]) {
                      postDetails(e.target.files[0]);
                    }
                  }}
                  className="rounded-lg border-gray-300 focus:border-black focus:ring-black"
                />
                {picMessage && (
                  <p className="text-sm text-red-500 mt-1">{picMessage}</p>
                )}
                {pic && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-black w-full">
                    <img
                      src={pic}
                      alt="preview"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <Button
                  type="submit"
                  className="bg-black hover:bg-gray-800 text-white font-[700] py-2 rounded-lg transition-colors"
                >
                  Post
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PostScreen;
