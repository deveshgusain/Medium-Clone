import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";

export default function Blog() {
    const { id } = useParams();
    const { loading, blog } = useBlog({ id: id || "1" });
    return loading ? (
        <div>
            <BlogSkeleton />
        </div>
    ) : (
        <div>
            <FullBlog
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.createdAt.slice(0, 10)}
            />
        </div>
    );
}
