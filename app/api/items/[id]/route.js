import Item from "@models/data";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const items = await Item.findById(params.id).populate("creator")
        if (!items) return new Response("Item Not Found", { status: 404 });

        return new Response(JSON.stringify(items), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { item } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingItem = await Item.findById(params.id);

        if (!existingItem) {
            return new Response("Item not found", { status: 404 });
        }

        // Update the prompt with new data
        existingItem.item = item;

        await existingItem.save();

        return new Response("Successfully updated the Items", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Items", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Item.findByIdAndRemove(params.id);

        return new Response("Item deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting Item", { status: 500 });
    }
};
