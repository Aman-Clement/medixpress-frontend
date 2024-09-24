"use client";
import Logo from '@/assets/logo.png'
import Image from 'next/image'
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export const Signup = () =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [customerType, setCustomertype] = useState("");
    const [location, setLocation] = useState("");
    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault(); // Prevent the default form submission
        console.log('Email:', email);
        console.log('Password:', password);

        const locationId = Math.floor(Math.random() * 99) + 1;
        
        try {
            localStorage.removeItem('authToken');
            const response = await fetch(`${process.env.BASE_URL}/sign-up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerName: name,
                    customerPhone: phone,
                    locationId,
                    customerEmail: email,
                    customerPassword: password,
                    customerType
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            else{
                console.log(response)
                console.log("wow")
                router.push('/login');
            }
            // You can redirect or perform other actions after successful login
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return(
        <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
      <Image src={Logo} className="w-auto h-10 sm:h-8" alt='logo'/> 
          MediXpress    
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form className="space-y-4 md:space-y-4" action="#">
                  <div>
                      <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name" required="" value={name} onChange={(e)=>setName(e.target.value)}/>
                  </div>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@email.com" required="" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                  </div>
                  <div>
                      <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                      <input type="tel" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxlength="10" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="+91" required="" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                  </div>
                  <div>
                      <label for="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                      <input type="text" name="location" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="xyz Layout" required="" value={location} onChange={(e)=>setLocation(e.target.value)}/>
                  </div>
                  <div>
                <label htmlFor="customerType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Customer Type</label>
                <select 
                    name="customerType" 
                    id="customerType" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                    value={customerType} 
                    onChange={(e) => setCustomertype(e.target.value)} 
                    required
                >
                    <option value="">Select Customer Type</option>
                    <option value="USER">User</option>
                    <option value="PHARMACY">Pharmacy</option>
                </select>
            </div>

                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline " href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-orange-main hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleSubmit}>Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" className="font-medium text-orange-main hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    )
}