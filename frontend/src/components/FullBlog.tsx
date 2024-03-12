import { AppBar } from "./AppBar";
import { Avatar } from "./Avatar";

interface FullBogProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const FullBlog = ({
    title,
    content,
    authorName,
    publishedDate,
}: FullBogProps) => {
    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-10 max-w-screen-xl">
                    <div className="col-span-8">
                        <div className="font-bold text-4xl">{title}</div>
                        <div className="text-slate-500 pt-2">{`Posted on ${publishedDate}`}</div>
                        <div className="pt-4">{content}</div>
                    </div>
                    <div className="col-span-4">
                        <div>Author</div>
                        <div className="flex justify-center pt-2">
                            <div className="flex items-center">
                                <Avatar name={authorName} size="medium" />
                            </div>
                            <div className="pl-3">
                                <div className="font-bold  text-xl">
                                    {authorName}
                                </div>
                                <div>
                                    Random catch pharase about the author's
                                    ability to catch user attention
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
