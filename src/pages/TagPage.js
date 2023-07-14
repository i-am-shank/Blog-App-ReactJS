import { useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Blogs from "../components/Blogs";
import Pagination from "../components/Pagination";

// can try to re-use following layout (by building a new component for this) :-
// <Header/>
// <Blogs/>
// <Pagination/>


export default function TagPage() {

    const navigate = useNavigate();

    // Get tag-name from url
    const location = useLocation();
    const tag = location.pathname.split("/").at(-1);

    return (
        <div className="w-full h-full flex flex-col gap-y-1 justify-center items-center">
            <Header/>

            {/* Back-btn + text + tag-name + ....
            All blogs of related tag. */}

            <div className="w-11/12 max-w-[740px] py-3 flex flex-col mt-[5.5rem] items-center">
                <div className="-mb-[4.75rem] flex gap-2 items-center">
                    <button onClick={() => navigate(-1)} className="rounded-md border-2 border-gray-300 px-4 py-1">
                        Back
                    </button>
                    <h2 className="font-bold text-xl">
                        Blogs Tagged <span className="underline text-blue-700">#{tag.replaceAll("-", " ")}</span>
                    </h2>
                </div>

                <Blogs/>
            </div>
            
            <Pagination/>
        </div>
    );
}