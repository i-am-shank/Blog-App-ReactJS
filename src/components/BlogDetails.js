import { NavLink } from "react-router-dom";


export default function BlogDetails({post}) {

    return (
        <div>
            <NavLink to={`/blog/${post.id}`} className="font-bold text-lg hover:underline">
                {post.title}
            </NavLink>
            <p className="text-sm mt-1">
                By <span className="italic">{post.author}</span> on <NavLink to={`/categories/${post.category.replaceAll(" ","-")}`} className="underline font-semibold cursor-pointer">{post.category}</NavLink>
            </p>
            <p className="text-sm mt-1">
                Posted On <span>{post.date}</span>
            </p>
            <p className="text-md mt-4">
                {post.content}
            </p>
            <div className="text-xs mt-[0.85rem] text-blue-700 font-semibold">
                {post.tags.map((tag, index) => {
                    return (
                        <NavLink to={`/tags/${tag.replaceAll(" ","-")}`} key={index} className="mr-2 underline cursor-pointer">
                            {
                                `#${tag}`
                            }
                        </NavLink>
                    )
                })}
            </div>
        </div>
    );
}