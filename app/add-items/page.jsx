'use client'

import React from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'


const AddItems = () => {

    const router = useRouter();
    const { data:session } = useSession();

    const [submitting , setSubmitting] = useState(false);
    const [post,setPost] = useState({
        item:'',
    })

    const createPrompt = async (e) =>{
        e.preventDefault();

        try {
            const response = await fetch('/api/items/new',{
                method:'POST',
                body: JSON.stringify({
                    item: post.item,
                    userId: session?.user.id,
                })
            })

            if(response.ok){
                router.push('/show-items')
            }
        } catch (error) {
            console.log(error)
        } finally{
            setSubmitting(false)
        }
    }
  return (
    <Form
    type="Add Item"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPrompt}
    />
  )
}

export default AddItems