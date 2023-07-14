import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

import { baseUrl } from "../baseUrl";

import Header from "../components/Header";
import BlogDetails from "../components/BlogDetails";


export default function BlogPage() {

    const newBaseUrl = "https://codehelp-apis.vercel.app/api/";

    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);

    const location = useLocation();
    const blogId = location.pathname.split("/").at(-1);

    const navigate = useNavigate();

    // Retrieve state values from context :-

    const {setLoading, loading} = useContext(AppContext);


    // Data for particular blog-id isn't fetched till now, so have to do that here !!

    async function fetchRelatedBlogs() {
        setLoading(true);
        let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
        console.log("API URL :-");
        console.log(url);
        try {
            const result = await fetch(url);
            const data = await result.json();
            console.log("API data in JSON :-");
            console.log(data);

            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);
        }
        catch(error) {
            console.log("Error in Blog id API call.");
            // Reset the data to render
            setBlog(null);
            setRelatedBlogs([]);
        }
        setLoading(false);
    }

    // Call below callback-function, whenever blog-id changes (i.e. pathname changes).

    useEffect(() => {
        if(blogId) {
            fetchRelatedBlogs();
        }
    }, [location.pathname] );



    return (
        <div className="w-full h-full flex flex-col gap-y-1 justify-center items-center">
            <Header/>

            <div className="w-11/12 max-w-[672px] py-3 flex flex-col gap-y-10 mt-[5.5rem] mb-[5.5rem]">
                <div className="-mb-4">
                    <button onClick={() => navigate(-1)} className="rounded-md border-2 border-gray-300 px-4 py-1 mr-3">
                        Back
                    </button>
                </div>

                {
                    loading ? 
                    (<div>
                        <p> Loading </p>
                    </div>) : 
                    blog ?
                    (<div>
                        <BlogDetails post={blog} />
                        <h2 className="mt-[3.2rem] font-bold text-3xl mb-8"> Related Blogs </h2>
                        {
                            relatedBlogs.map((post) => (
                                <div key={post.id} className="my-5">
                                    <BlogDetails post={post} />
                                </div>
                            ))
                        }
                    </div>) : 
                    (<div>
                        <p>No Blog Found</p>
                    </div>)
                }
            </div>
            
        </div>
    );
}