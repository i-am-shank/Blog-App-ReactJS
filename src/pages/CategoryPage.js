import { useLocation, useNavigate, NavLink } from "react-router-dom";
import Header from "../components/Header";
import Blogs from "../components/Blogs";
import Pagination from "../components/Pagination";


export default function CategoryPage() {

    const navigate = useNavigate();

    const location = useLocation();
    const category = location.pathname.split("/").at(-1);

    return (
        <div className="w-full h-full flex flex-col gap-y-1 justify-center items-center">
            <Header/>

            <div className="w-11/12 max-w-[740px] py-3 flex flex-col mt-[5.5rem] items-center">
                <div className="-mb-[4.75rem] flex gap-2 items-center">
                    <button onClick={() => navigate(-1)} className="rounded-md border-2 border-gray-300 px-4 py-1">
                        Back
                    </button>
                    <h2 className="font-bold text-xl">
                        Blogs On <NavLink to={`/categories/${category.replaceAll(" ","-")}`} className="underline cursor-pointer">{category.replaceAll("-", " ")}</NavLink>
                    </h2>
                </div>

                <Blogs/>
            </div>
            
            <Pagination/>
        </div>
    );
}