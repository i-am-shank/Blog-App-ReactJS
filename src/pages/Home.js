import Header from "../components/Header";
import Blogs from "../components/Blogs";
import Pagination from "../components/Pagination";


export default function Home() {
    return (
        <div className="w-full h-full flex flex-col gap-y-1 justify-center items-center">
            <Header />
            <Blogs/>
            <Pagination/>
        </div>
    );
}