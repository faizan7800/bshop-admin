import Collection from "@/lib/models/Collection";
import { connectDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { ImageError } from "next/dist/server/image-optimizer";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest)=>{
    try {
        const {userId} = auth();
        
        if(!userId){
            return new NextResponse("UnAuthorized", {status: 403})
        }
        await connectDB()

        const {title, description, image} = await req.json();

        const existingCollection = await Collection.findOne({title})

        if(existingCollection){
            return new NextResponse("Collection already exists", {status: 400})
        }

        if(!title || !image){
            return new NextResponse("Title and image should not be empty", {status: 400})
        }

        const newCollection = await Collection.create({
            title,
            description,
            image
        })
        await newCollection.save()
        
        return NextResponse.json(newCollection, {status: 200})
    } catch (err) {
        console.log("[collection_POST]", err)
        return new NextResponse("Internal server error", {status: 500})
    }
}