"use client"

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const loginSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
})

export default function Login() {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            name: '',
            email: '',
        },
    })

    function onSubmit(values: z.infer<typeof loginSchema>) {
        // TODO: Handle form submission
        const { name, email } = values

        fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ name, email }),
        })
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/3 flex flex-col justify-center items-center">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex justify-center items-center flex-col w-2/3">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Please enter your name" {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="flex justify-center items-center flex-col w-2/3">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Please enter your email" {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )

}