import  { connectToDB } from '@utils/database'
import Item from '@models/data';

export const POST =async (req,res)=>{
    const { userId, item} =await req.json();

    try {
        await connectToDB();
        const newItem = new Item({
            creator:userId,
            item,
        })

        await newItem.save();

        return new Response(JSON.stringify(newItem),{
            status:200
        })
    } catch (error) {
        return new Response('Failed to create a new Item',{ staus:500 })
    }
}