import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export const useBlogs = () => {
    interface blogType {
        id: string;
        title: string;
        content: string;
        author: {
            name: string
        };
        createdAt: string
    }
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<blogType[]>([]);
    useEffect(
        () => {
            async function fetchData() {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setBlogs(response.data);
                setLoading(false)
            }
            fetchData();
        }
        , [])
    return {
        loading,
        blogs
    }
}

export const useBlog = ({ id }: { id: string }) => {
    interface blogType {
        id: string;
        title: string;
        content: string;
        author: {
            name: string
        };
        createdAt: string
    }
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<blogType>({ author: { name: "" }, content: "", createdAt: "", id: "", title: "" });
    useEffect(
        () => {
            async function fetchData() {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setBlog(response.data);
                setLoading(false)
            }
            fetchData();
        }
        , [])
    return {
        loading,
        blog
    }
}