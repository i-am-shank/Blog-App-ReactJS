import { useContext } from "react";
import { AppContext } from "../context/AppContext";

import Spinner from "./Spinner";
import BlogDetails from "./BlogDetails";



export default function Blogs() {

    // consume
    //    (data of a component at any other component..)
    const {posts, loading} = useContext(AppContext);

    return (
        <div className="w-11/12 max-w-[672px] py-3 flex flex-col gap-y-10 mt-[5.5rem] mb-[5.5rem]">
            {
                loading ? 
                (<Spinner />) :
                (
                    posts.length=== 0 ?
                    (<div>
                        <p>No Post Found</p>
                    </div>) :
                    (posts.map( (post) => (
                        <BlogDetails key={post.id} post={post} />
                    )))
                )
            }
        </div>
    );
}