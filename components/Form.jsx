'use client'

import React from 'react'
import Link from 'next/link'

const Form = ({type,post,setPost,submitting,handleSubmit}) => {
  return (
    <form 
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Item</span>
        

        <input type='text'
        value={post.item}
        onChange={(e)=> setPost({...post,item: e.target.value})}
        placeholder='Enter Your Item here...'
        required
        className='form_input'
        />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
        <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
  )
}

export default Form