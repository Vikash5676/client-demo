import Item from "@models/data";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const items = await Item.find({}).populate('creator')
        return new Response(JSON.stringify(items), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all items", { status: 500 })
    }
} 