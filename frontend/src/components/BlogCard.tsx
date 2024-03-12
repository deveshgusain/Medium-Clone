import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}
export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate,
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="border-b border-slate-200 pt-2">
                <div className="flex items-center pb-1 ">
                    <Avatar name={authorName} />
                    <div className="pl-1 text-xs">{authorName}</div>
                    <div className="pl-1 pr-1">&#183;</div>
                    <div className="text-xs text-slate-400">
                        {publishedDate}
                    </div>
                </div>
                <div className="font-semibold text-xl">{title}</div>
                <div className="text-md font-thin">
                    {content.slice(0, 200) + "..."}
                </div>
                <div className="text-slate-400 text-sm font-thin pt-3 pb-3">{`${Math.ceil(
                    content.length / 100
                )} min read`}</div>
            </div>
        </Link>
    );
};
