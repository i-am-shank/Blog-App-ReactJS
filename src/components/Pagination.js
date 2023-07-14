import { useContext } from "react";
import { AppContext } from "../context/AppContext";



export default function Pagination() {

    const {page, handlePageChange, totalPages} = useContext(AppContext);

    return (
        <div className="w-full flex justify-center py-2 border-t-2 border-gray-300 fixed bottom-0 bg-white">
            <div className="w-11/12 max-w-[672px] flex justify-between items-center">
                <div>
                    {
                        page > 1 &&
                        <button onClick={() => handlePageChange(page-1)} className="rounded-md border-2 border-gray-300 px-4 py-1 mr-3">
                            Previous
                        </button>
                    }


                    {
                        page < totalPages && 
                        <button onClick={() => handlePageChange(page+1)} className="rounded-md border-2 border-gray-300 px-4 py-1">
                            Next
                        </button>
                    }
                </div>

                <p className="font-semibold text-sm">
                    Page {page} of {totalPages}
                </p>
            </div>
        </div>
    );
}