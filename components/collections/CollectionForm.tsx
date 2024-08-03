"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { Separator } from "../ui/separator"
import UploadImage from "../custom ui/UploadImage"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

const formSchema = z.object({
  title: z.string().min(2).max(30),
  description: z.string().min(2).max(500),
  image: z.string(),
})
const CollectionForm = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const res = await fetch("/api/collections", {
        method: "POST",
        body: JSON.stringify(values)
      })
      if(res.ok){
        setLoading(false)
        toast.success("Collection created successfully!")
        router.push("/collections")
      }
    } catch (error) {
      console.log("[collection_POST]", error)
      toast.error("something went wrong...")
    }

  }
  return (
    <div className="p-10">
      <p className="text-heading2-bold">Create Collection</p>
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block mb-1">Image</FormLabel>
                <FormControl>
                 <UploadImage value={field.value ? [field.value] : []} onChange={(url) => field.onChange(url)} onRemove={()=> field.onChange("")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
          <Button className="bg-blue-1 p-4 text-body-medium text-white" type="submit">Submit</Button>
          <Button className="bg-red-1 p-4 text-body-medium text-white" type="button" onClick={()=> router.push('/collections')}>Discard</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CollectionForm