import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogsSkeleton } from "../components/BlogsSkeleton";

import { useBlogs } from "../hooks";

export default function Blogs() {
    const { loading, blogs } = useBlogs();

    return loading ? (
        <div>
            <AppBar />
            <div className="grid grid-cols-12">
                <div className="col-span-1"></div>
                <div className="col-span-10">
                    <BlogsSkeleton />
                    <BlogsSkeleton />
                    <BlogsSkeleton />
                    <BlogsSkeleton />
                    <BlogsSkeleton />
                    <BlogsSkeleton />
                </div>
                <div className="col-span-1"></div>
            </div>
        </div>
    ) : (
        <div>
            <AppBar />
            <div className="grid grid-cols-12">
                <div className="col-span-1"></div>
                <div className="col-span-10">
                    {blogs.map((blog) => {
                        return (
                            <BlogCard
                                id={blog.id}
                                authorName={blog.author.name || "Anonymous"}
                                content={blog.content}
                                title={blog.title}
                                publishedDate={blog.createdAt.slice(0, 10)}
                            />
                        );
                    })}
                </div>
                <div className="col-span-1"></div>
            </div>
        </div>
    );
}
