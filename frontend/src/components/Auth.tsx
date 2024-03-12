import { ChangeEvent, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

import { SignupType } from "@devesh_g/common-app";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const [postInputs, setPostInputs] = useState<SignupType>({
        email: "",
        password: "",
        name: "",
    });

    const navigate = useNavigate();

    async function sendRequest() {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${type}`,
                postInputs
            );
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs")
        } catch (error) {
            alert("Error while sigining up")
        }
    }
    return (
        <div>
            <div className="h-screen flex justify-center ">
                <div className=" flex flex-col justify-center ">
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            Create an account
                        </div>
                        <div className="text-slate-400">
                            {type == "signup"
                                ? "Already have and account?"
                                : "Don't have an account?"}
                            <Link
                                className="pl-2 underline"
                                to={type == "signup" ? "/signin" : "/signup"}
                            >
                                {type == "signup" ? "Sign In" : "Sign Up"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-4">
                        {type === "signup" ? (
                            <LabelledInput
                                label="Name"
                                placeholder="Devesh Gusain"
                                onChange={(e) => {
                                    setPostInputs({
                                        ...postInputs,
                                        name: e.target.value,
                                    });
                                }}
                            />
                        ) : null}

                        <LabelledInput
                            label="Email"
                            placeholder="devesh@gmail.com"
                            onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    email: e.target.value,
                                });
                            }}
                        />

                        <LabelledInput
                            label="Password"
                            type={"password"}
                            placeholder="*******"
                            onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    password: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div>
                        <button
                            onClick={sendRequest}
                            type="button"
                            className="w-full text-white mt-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        >
                            {type == "signup" ? "Sign Up" : "Sign In"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({
    label,
    placeholder,
    onChange,
    type,
}: LabelledInputType) {
    return (
        <div className="mt-5">
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
                {label}
            </label>
            <input
                onChange={onChange}
                type={type || "text"}
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
                required
            />
        </div>
    );
}
