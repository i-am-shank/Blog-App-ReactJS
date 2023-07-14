import { createContext, useState } from "react";

import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";



// 1. Context creation -----------------

export const AppContext = createContext();


// 2. Provider creation -----------------

export default function AppContextProvider({children}) {
    // {children}  ==>  data between AppContextProvider opening & closing HTML tags.

    // All dynamic data will be created here, whose context is needed :-

    const [loading, setLoading] = useState(false);

    const [posts, setPosts] = useState([]);

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(null);

    const navigate = useNavigate();


    // Now, first we need to find these data :-
    //    (from API..)

    async function fetchBlogPosts(page=1, tag=null, category) {
        setLoading(true);

        // Updated URL for this case (more complex than previous one).
        let url = `${baseUrl}?page=${page}`;

        if(tag) {
            url += `&tag=${tag}`;
        }
        if(category) {
            url += `&category=${category}`;
        }
        // Either of the 3 cases will be there, no-additional-query .. tag .. category
        // So, routes also needed for tag, category..

        console.log("Api URL :-");
        console.log(url);

        try{
            console.log("Successful API call----------");
            const result = await fetch(url);
            const data = await result.json();
            // console.log(data);

            if(!data.posts || data.posts.length===0) {
                throw new Error("Something went wrong");
            }

            // console.log("Api response :-");
            // console.log(data);

            // Now set the data, from result recieved from API-call
            setPage(data.page);
            setPosts(data.posts);
            setTotalPages(data.totalPages);
        }
        catch(error) {
            console.log("API call failed--------------");
            
            // Also setting data to default values :-
            setPage(1);
            setPosts([]);
            setTotalPages(null);
        }

        setLoading(false);
    }


    // Also writing a handler for Prev & Next buttons :-

    function handlePageChange(page) {
        // Page no. changing.. which is also visible in url now !
        navigate( {search: `?page=${page}`});
        setPage(page);
        // And now, URL change will trigger the page change in itself !!
        //    ..as per useEffect written in App.js (which have dependencies).
    }



    // All required-data (context) will be sent in the following object :-
    //      .... (Almost nothing else needed to handle dynamic data)

    const value = {
        posts,
        setPosts,
        loading,
        setLoading,
        page,
        setPage,
        totalPages,
        setTotalPages,
        fetchBlogPosts,
        handlePageChange
    };


    // Return Provider -------------

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>

    // The {value} is provided to {children}, which previously existed in AppContext.
}


// The centralized data returned by provider  -->  can be consumed using useContext() hook.