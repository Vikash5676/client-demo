'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const ShowItems = () => {
    const router = useRouter();
    const {data:session} = useSession();
    const [item,setItem] = useState([])

    // console.log("item",item)

const fetchData = async()=>{
        const response = await fetch(`/api/items`)
        const data = await response.json()
        setItem(data)

}

useEffect(()=>{
    fetchData()
},[item])

const handleEdit= (item)=>{
    // console.log("id",item)
    router.push(`/update-items?id=${item}`)
}

const handleDelete= async(item)=>{
    const hasConfirmed = confirm("Are you sure you want to delete this item?")

        if(hasConfirmed){
            try {
                await fetch(`/api/items/${item._id.toString()}`,{
                    method: "DELETE"
                })

                const filterPosts = item.filter((p)=>p._id !== item._id)

                setItem(filterPosts)
            } catch (error) {
                console.log(error)
            }
        }
}

  return (
    <table class="table-auto text-center" style={{width:'100%'}}>
        <thead>
            <tr>
                <th>SL.No</th>
                <th>Item Name</th>
                <th>Update Item</th>
                <th>Delete Item</th>
            </tr>
        </thead>
        <tbody>
            {item?.map((ele,index) => {
                return(
                <>
                <tr key={ele._id}>
                    <td>{index+1}</td>
                    <td>{ele.item}</td>
                    <td><button onClick={()=>handleEdit(ele._id)} className='green_gradient'>Edit</button></td>
                    <td><button onClick={()=>handleDelete(ele)} className='orange_gradient'>Delete</button></td>
                </tr>
                </>
                )
})}
        </tbody>
    </table>
  )
}

export default ShowItems