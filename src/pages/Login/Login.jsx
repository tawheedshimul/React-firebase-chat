

import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase.config';

const Login = () => {


    const [err, setErr] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        } catch (error) {
            setErr(true);
            console.error(error);
        }
    };

    return (
        <div>
            <div className="p-10 max-w-md mx-auto bg-white rounded shadow-xl">
                <h1 className="text-3xl font-bold text-center mb-8">TawheedChat</h1>
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleSubmit} action="" className="space-y-4">
                    <label htmlFor="email" className="block">Email:</label>
                    <input type="email" id="email" name="email" className="w-full border rounded py-2 px-3" />

                    <label htmlFor="password" className="block">Password:</label>
                    <input type="password" id="password" name="password" className="w-full border rounded py-2 px-3" />

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">Login</button>
                </form>

                <p className="text-center mt-4">Don't have an account? <Link to='/register' className="text-blue-500">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;
