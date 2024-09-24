"use client";
import HeroGif from "@/assets/hero.gif"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const Hero = () =>{
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
        <div className="relative w-full">
            <div className="relative bg-yellow-50">
                <div className="container m-auto px-6 pt-32 md:px-12 lg:pt-[4.8rem] lg:px-20">
                    <div className="flex items-center flex-wrap px-2 md:px-0">
                        <div className="relative lg:w-6/12 lg:py-24 xl:pb-32 xl:pt-16">
                            <h1 className="font-bold text-4xl text-yellow-900 md:text-5xl lg:w-10/12">All your medical needs, right at your door</h1>
                            <form action="" className="w-full mt-12">
                                <div className="relative flex p-1 rounded-full bg-white border border-yellow-200 shadow-md md:p-2">
                                    <select className="hidden p-3 rounded-full bg-transparent md:block md:p-4 text-black" name="domain" id="domain">
                                        <option value="design">Medicine</option>
                                        <option value="development">Pharmacy</option>
                                    </select>
                                    <input placeholder="Your Care" className="w-full p-4 rounded-full text-black" type="text" value={searchVal} onChange={(e)=>{setSearchval(e.target.value)}}/>
                                    <button type="button" title="Start buying" className="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-12" onClick={handleSearch}>
                                        <span className="hidden text-yellow-900 font-semibold md:block">
                                            Search
                                        </span>
                                    </button>
                                </div>
                            </form>
                            <p className="mt-8 text-gray-700 lg:w-10/12">Search for your favorite  <a href="/medicine" className="text-yellow-700">medications</a> and wellness products. Enjoy seamless access to quality healthcare right from the comfort of your home. Experience prompt delivery and dedicated service tailored to your health needs..</p>
                        </div>
                        <div className="ml-auto -mb-24 lg:-mb-56 lg:w-6/12">
                            <Image src={HeroGif} className="relative" alt="food illustration" loading="lazy" width="4500" height="4500"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}