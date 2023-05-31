'use client'

import React,{useState, useEffect} from 'react'
import { useSession,signIn, getProviders } from 'next-auth/react';
import Link from 'next/link';

const Home = () => {
  const { data: session} = useSession();
  const [providers, setProviders] = useState(null)

  useEffect(()=>{
    const setUpProviders = async ()=>{
      const response = await getProviders();
      console.log(response)
      setProviders(response)
    }

    setUpProviders();
  },[])
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Demo App
            <br/>
            <span className="orange_gradient">
                Powered by Vikash
            </span>
        </h1>
        <p className="desc text-center">
            This app helps to manage stock
        </p>

        {
          session?.user ?(
            <>
              <div className='mt-4'><Link href="/add-items" ><button className='mr-4 green_gradient font-bold '>Add Items</button></Link>
              <Link href="/show-items"  ><button className='green_gradient  font-bold '>Show Items</button></Link></div>
            </>
          ):(
            <>
              {
              providers && 
              Object.values(providers).map((provider)=>(
                <button
                type='button'
                key={provider.name}
                onClick={()=>signIn(provider.id)}
                className='green_gradient font-bold mt-4'>
                  Sign In
                </button>
              ))
            }
            </>
          )
        }

    </section>
  )
}

export default Home