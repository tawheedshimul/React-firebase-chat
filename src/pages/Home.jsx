import React from 'react';
import Sidebar from '../component/Sidebar';
import Chat from '../component/Chat';

const Home = () => {
    return (
        <div className='flex items-center justify-center bg-green-100'>
            <div className='border border-white rounded w-11/12 h-screen flex'>
                <Sidebar/>
                <Chat/>
            </div>
        </div>
    );
};

export default Home;