import axios from "axios";
import { AppBar } from "../components/AppBar";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Publish() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    return (
        <div>
            <AppBar />
            <div className="flex justify-center pt-8">
                <div className="max-w-screen-lg w-full">
                    <input
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        type="text"
                        className=" w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        placeholder="Title"
                    />
                    <TextEditor
                        title={title}
                        content={content}
                        setContent={setContent}
                    />
                    <button
                        type="submit"
                        onClick={async () => {
                           const response =  await axios.post(
                                `${BACKEND_URL}/api/v1/blog`,
                                {
                                    title,
                                    content,
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem(
                                            "token"
                                        )}`,
                                    },
                                }
                            );
                            navigate(`/blog/${response.data.id}`)
                        }}
                        className=" mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                    >
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    );
}

function TextEditor({
    content,
    setContent,
}: {
    title: string;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <div className="pt-4">
            <div className="w-full  border border-gray-200 rounded-lg bg-gray-50">
                <div className="  bg-white rounded-lg">
                    <textarea
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                        rows={8}
                        className="block w-full text-sm text-gray-800 bg-white border-0"
                        placeholder="Write an article..."
                        required
                    />
                </div>
            </div>
        </div>
    );
}
