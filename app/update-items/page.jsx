'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@components/Form'


const EditItem = () => {

    const router = useRouter();
    const searchParams = useSearchParams()
    const itemId = searchParams.get('id')
    const [submitting , setSubmitting] = useState(false);
    const [post,setPost] = useState({
        item:'',
    })

    useEffect(() => {
       const getItemDetails =  async ()=>{
        const response = await fetch(`/api/items/${itemId}`)
        const data = await response.json();

        setPost({
            item:data.item,
        })
       }

       if(itemId) getItemDetails()
    }, [itemId]);

    const updateItem = async (e) =>{
        e.preventDefault();

        if(!itemId) return alert('Item ID not found')

        try {
            const response = await fetch(`/api/items/${itemId}`,{
                method:'PATCH',
                body: JSON.stringify({
                    item: post.item,
                })
            })

            if(response.ok){
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally{
            setSubmitting(false)
        }
    }
  return (
    <Form
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updateItem}
    />
  )
}

export default EditItem