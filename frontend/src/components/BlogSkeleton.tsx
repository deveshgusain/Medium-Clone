import { AppBar } from "./AppBar";

export const BlogSkeleton = () => {
    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-10 max-w-screen-xl">
                    <div className="col-span-8">
                        <div className="h-4  bg-gray-200 rounded-full w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                    <div className="col-span-4">
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        <div className="flex justify-center pt-2">
                            <div className="flex items-center">
                                <div className="h-4  bg-gray-200 rounded-full w-48 mb-4"></div>
                            </div>
                            <div className="pl-3">
                                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
