import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { DropDown } from "./DropDown";
import { useState } from "react";

export const AppBar = () => {
    const [isClicked, setIsClicked] = useState(false);
    return (
        <div className="flex justify-between border-b border-slate-200 px-4 items-center py-2">
            <Link to={"/blogs"}>
                <div className="font-semibold text-xl">Medium</div>
            </Link>
            <div className="flex ">
                <Link to={"/publish"}>
                    <button
                        type="button"
                        className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3.5 py-2 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        New
                    </button>
                </Link>
                <div onClick={(e) => setIsClicked(!isClicked)} className="cursor-pointer relative">    
                    <Avatar name="Devesh" size="medium" />
                </div>
                {isClicked ? <DropDown /> : null}
            </div>
        </div>
    );
};
