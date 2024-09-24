"use client";
import Logo from '@/assets/logo.png'
import Image from 'next/image'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const Login = () =>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault(); // Prevent the default form submission
        console.log('Email:', email);
        console.log('Password:', password);
        try {
            const response = await fetch(`${process.env.BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to login');
            }
    
            const data = await response.json(); // Assuming this returns your JSON token
            // Store the entire JSON object as a string
            localStorage.setItem('authToken', JSON.stringify(data));
            console.log(data)

            // You can redirect or perform other actions after successful login
        } catch (error) {
            console.error('Error during login:', error);
        } finally{
            window.location.href = "/";
        }
        
    };

    return(
    <div>
        <div className="w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
    <div className="px-6 py-4">
        <div className="flex justify-center mx-auto">
            <Image src={Logo} className="w-auto h-10 sm:h-8" alt='logo'/>
        </div>

        <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>

        <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>

        <form>
            <div className="w-full mt-4">
                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" aria-label="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div className="w-full mt-4">
                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <div className="flex items-center justify-between mt-4">
                <a href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forget Password?</a>

                <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-main rounded-lg hover:bg-orange-600 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50" onClick={handleSubmit}>
                    Sign In
                </button>
            </div>
        </form>
    </div>

    <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>

        <a href="#" className="mx-2 text-sm font-bold text-orange-main dark:text-orange-400 hover:underline">Register</a>
    </div>
</div>
    </div>
    )
}