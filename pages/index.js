import { useState, useEffect, useReducer } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [user, setUser] = useState({});  
  const [name, setName] = useState('');

  useEffect(() => {
    if (name != '') {
    fetch(`https://api.github.com/users/${name}`)
      .then(res => res.json())
      .then(data => setUser(data));
    }  
  }, [name]);
  
  const handleEnter = (e) => {
    if (e.key === 'Enter')
      handleSubmit();
  }

  const handleSubmit = () => {
    setName(document.getElementById('input-name').value);
  }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <Head>
        <meta charSet='UTF-8' />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Github Profile</title>
      </Head>

      <div className='flex flex-col justify-center items-center'>
        <div className='text-center font-extrabold text-4xl m-5'>Github Profile</div>
        <div>
          <input id='input-name' type='text' placeholder='search...' className='border-2 border-neutral-900 p-2 rounded-md' onKeyDown={handleEnter}></input>
          <input type='submit' className='bg-blue-500 p-2 py-2.5 rounded-md ml-3 cursor-pointer hover:bg-blue-600 duration-300 text-neutral-50' onClick={handleSubmit}></input>
        </div>
        { name == '' ? 
        <div className='mt-5'>Try searching something</div> 
        :
        (
        <div className='mt-5 text-center flex flex-col justify-center items-center duration-300 p-3'>
          {/* <Image src={`${user.avatar_url}`} alt='profile image' layout='fill' className='rounded-full mb-3 scale-75 border-2 border-slate-600' /> */}
          <img src={user.avatar_url} alt='profile image' className='rounded-full mb-3 scale-75 border-2 border-slate-600'/>
          <p className='font-bold text-xl'>{user.name}</p>
          <p className='text-lg font-semibold'>{user.login}</p>
          <p>{user.bio}</p>
          <p><span className='font-semibold'>{user.followers}</span> followers</p>
          <p><span className='font-semibold'>{user.following}</span> following</p>
          <Link href={`${user.html_url}`}><a target='_blank' className='underline hover:text-blue-500'>Visit profile on Github</a></Link>
        </div>
        )
        }
      </div>
    </div>
  )
}
