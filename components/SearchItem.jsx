"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SearchItem = () =>{

    const router = useRouter()
    const [searchVal, setSearchval] = useState("")
    const handleSearch = async() =>{
        try{
            console.log(searchVal);
            router.push(`/medicine/${searchVal}`)
        }catch{

        }
    }

    
    return(
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 text-foreground">
         <form action="" className="w-full my-10 mx-16">
                                <div className="relative flex p-1 rounded-full bg-white border border-yellow-200 shadow-md md:p-2">
                                    <div className="hidden p-3 rounded-full bg-transparent md:block md:p-4 text-black" name="domain" id="domain">
                                        Medicine
                                    </div>
                                    <input placeholder="Your Care" className="w-full p-4 rounded-full text-black" type="text" value={searchVal} onChange={(e)=>{setSearchval(e.target.value)}}/>
                                    <button type="button" title="Start buying" className="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-12" onClick={handleSearch}>
                                        <span className="hidden text-yellow-900 font-semibold md:block">
                                            Search
                                        </span>
                                    </button>
                                </div>
                            </form>
    </div>        
)
}