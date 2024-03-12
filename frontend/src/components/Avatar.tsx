export function Avatar({
    name,
    size = "small",
}: {
    name: string;
    size?: "small" | "medium";
}) {
    return (
        <div
            className={`relative inline-flex items-center justify-center ${
                size === "small" ? "w-5 h-5" : "w-8 h-8"
            }  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
        >
            <span
                className={` ${
                    size === "small" ? "text-xs font-medium" : "text-lg font-semibold"
                } text-gray-600`}
            >
                {name[0].toUpperCase()}
            </span>
        </div>
    );
}
