import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useForm  } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';

// import { useState } from 'react';


const schema = yup.object().shape({
    
	username: yup.string().required(),
    password: yup.string().min(8).max(32).required(),
    
});

const API_URL = "http://localhost/PHP_API/login.php"

const config = {
	header: {
		Authorization: `Bearer ${jwt}`,
		"Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json"
	}
}



const Login = () => {

	
	const navigate = useNavigate();	
	// const [errorMessage, setErrorMessage] = useState('')

	const { register, handleSubmit, formState: {errors}, reset } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {
	
		const {username, password} = data
		const udata = {username , password}
		axios.post(API_URL,udata,config)
		.then(response => console.log(response))
		.then(data => {
            if (data.message === 'Login successful') {
                // redirect to landing page
				alert("Login Successful")
                navigate('/layout');
            } else {
                alert(data.message);
            }
        });
			
			// console.log();
			// reset();
		

       
    }

	

    return(

		
       
<div class="h-screen md:flex">
	<div
		class="relative overflow-hidden md:flex w-1/2  bg-gradient-to-r from-purple-900 via-purple-500 to-pink-250 i justify-around items-center hidden">
		<div>
		<img className='' src={process.env.PUBLIC_URL + "default.png"} alt='register img'></img>
		</div>
		{/* <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div> */}
	</div>
        
	<div class="flex md:w-1/2 justify-center py-5 items-center bg-white">
    
      
		<form class="bg-white" onSubmit={handleSubmit(onSubmit)}>

      
       
			<h1 class="text-center text-gray-800 font-bold text-2xl mb-1">Login</h1>
			<p class="text-center text-sm font-normal text-gray-600 mb-7">Welcome Back :)</p>
			
				<div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
						viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
					</svg>
					<input class="pl-2 outline-none border-none" {...register("username", {required: true})} type="text" name="username" id="" placeholder="Username" required  />
      </div>
	  <p>{errors.username?.message}</p>
					
						<div class="flex items-center border-2 py-2 px-3 rounded-2xl">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
								fill="currentColor">
								<path fill-rule="evenodd"
									d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
									clip-rule="evenodd" />
							</svg>
							<input class="pl-2 outline-none border-none"  {...register("password", {required: true})} type="password" name="password" id="" placeholder="Password" required />
      </div>
	  <p>{errors.password?.message}</p>
						<button type="submit" class="block w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
							<span class="text-sm ml-2 hover:text-blue-500 cursor-pointer pr-50">Forgot Password ?</span>
                            <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer"><span><Link to="/Register">Register</Link></span></span>
		</form>
	</div>
</div>
    )
}

export default Login;