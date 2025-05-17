"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { deleteBlog, getBlogById, updateBlog } from "../state/blog/blogSlice";
import { AppDispatch, RootState } from "../state/store";
import toast from "react-hot-toast";
import { ArrowLeft, Upload, Trash2 } from "lucide-react";

interface BlogRequest {
  title: string;
  caption: string;
  desc: string;
  pic: string;
  category: string;
}

const EditScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<BlogRequest>({
    title: "",
    caption: "",
    desc: "",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    category: "",
  });

  const [picMessage, setPicMessage] = useState<string | null>(null);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const { userInfo } = useSelector((state: RootState) => state.user);
  const { selectedBlog, loading, error } = useSelector(
    (state: RootState) => state.blog
  );

  const handleInputChange = (field: keyof BlogRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (userInfo?.token && id && selectedBlog?._id !== id) {
      setLoadingLocal(true);
      dispatch(getBlogById(id));
    }
  }, [dispatch, id, userInfo, selectedBlog]);

  useEffect(() => {
    if (!id || !selectedBlog || selectedBlog._id !== id) return;
    const normalizedCategory = (selectedBlog.category || "").trim();
    setFormData({
      title: selectedBlog.title || "",
      caption: selectedBlog.caption || "",
      desc: selectedBlog.desc || "",
      pic:
        selectedBlog.pic ||
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      category: normalizedCategory || "",
    });

    setLoadingLocal(false);
    setFetchError(null);
  }, [selectedBlog, id]);

  useEffect(() => {
    if (error) {
      setFetchError(error);
      setLoadingLocal(false);
    }
  }, [error]);

  const postDetails = async (pics: File) => {
    if (!pics) return setPicMessage("Please select an image");

    if (
      !["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
        pics.type
      )
    ) {
      return setPicMessage("Please select a valid image type");
    }

    setUploadingImage(true);
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "notezipper");
    data.append("cloud_name", "dmbsjdf33");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dmbsjdf33/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await res.json();
      handleInputChange("pic", result.secure_url);
      setUploadingImage(false);
    } catch (err) {
      console.error("Image upload failed", err);
      setUploadingImage(false);
    }
  };

  const updateHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const { title, caption, desc, pic, category } = formData;

    if (
      !title.trim() ||
      !caption.trim() ||
      !desc.trim() ||
      !pic.trim() ||
      !category.trim()
    ) {
      toast.error("Please fill in all fields before updating.");
      return;
    }

    const updatedData: BlogRequest & { id: string } = {
      id,
      ...formData,
    };

    try {
      await dispatch(updateBlog(updatedData));
      toast.success("Post updated successfully!");
      navigate("/main");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const deleteHandler = () => {
    if (!id) return;

    toast(
      (t) => (
        <div className="flex flex-col gap-2 p-2 font-['Figtree_Variable',sans-serif]">
          <span className="font-[700]">
            Are you sure you want to delete this post?
          </span>
          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1 bg-gray-200 rounded font-[600] hover:bg-gray-300 transition-colors"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded font-[600] hover:bg-red-600 transition-colors"
              onClick={async () => {
                await dispatch(deleteBlog(id));
                toast.dismiss(t.id);
                toast.success("Successfully deleted!");
                navigate("/main");
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity, // Keep toast visible until user acts
        position: "top-center",
      }
    );
  };

  if (loading || loadingLocal) {
    return (
      <div className="min-h-screen bg-[#F5D04E]/10 flex items-center justify-center font-['Figtree_Variable',sans-serif]">
        <Loading />
      </div>
    );
  }

  if (error || fetchError) {
    return (
      <div className="min-h-screen bg-[#F5D04E]/10 flex items-center justify-center font-['Figtree_Variable',sans-serif]">
        <Card className="p-6 rounded-2xl border border-black shadow-[0.4rem_0.4rem_0_0_#000] max-w-md">
          <h2 className="text-xl font-[800] mb-4">Error</h2>
          <p className="text-neutral-600">{error ?? fetchError}</p>
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
                Update your blog post details
              </p>
            </div>

            {selectedBlog && selectedBlog._id === id && (
              <form onSubmit={updateHandler} className="space-y-5">
                <div className="space-y-2">
                  <Label className="font-[600] text-sm">Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="rounded-lg border-gray-300 focus:border-black focus:ring-black"
                    placeholder="Enter post title"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-[600] text-sm">Caption</Label>
                  <Input
                    value={formData.caption}
                    onChange={(e) =>
                      handleInputChange("caption", e.target.value)
                    }
                    className="rounded-lg border-gray-300 focus:border-black focus:ring-black"
                    placeholder="Enter a short caption"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-[600] text-sm">Description</Label>
                  <Textarea
                    value={formData.desc}
                    onChange={(e) => handleInputChange("desc", e.target.value)}
                    className="rounded-lg border-gray-300 focus:border-black focus:ring-black min-h-[150px]"
                    placeholder="Write your blog post content here..."
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-[600] text-sm">Category</Label>
                  <Select
                    value={formData.category || undefined}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger className="rounded-lg border-gray-300 focus:border-black focus:ring-black">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="I'm Feeling Lucky">
                        I'm Feeling Lucky
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="font-[600] text-sm">Featured Image</Label>
                  <div className="mt-2 flex items-center justify-center flex-col">
                    {formData.pic && (
                      <div className="mb-4 rounded-xl overflow-hidden border border-black w-full">
                        <img
                          src={formData.pic || "/placeholder.svg"}
                          alt="Featured"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    <div className="relative w-full">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files?.[0])
                            postDetails(e.target.files[0]);
                        }}
                        className="rounded-lg border-gray-300 focus:border-black focus:ring-black"
                      />
                      {uploadingImage && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                          <div className="animate-pulse text-sm font-[700]">
                            Uploading...
                          </div>
                        </div>
                      )}
                    </div>
                    {picMessage && (
                      <p className="text-red-500 text-xs mt-1">{picMessage}</p>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="bg-black hover:bg-gray-800 text-white font-[700] py-2 rounded-lg transition-colors"
                  >
                    Update Post
                  </Button>
                  <Button
                    type="button"
                    onClick={deleteHandler}
                    className="bg-white text-red-500 border border-red-500 hover:bg-red-50 font-[700] py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    variant="outline"
                  >
                    <Trash2 className="h-4 w-4" /> Delete Post
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EditScreen;
