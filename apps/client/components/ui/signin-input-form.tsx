"use client"
import React, { useState } from 'react'
import { Form } from './form'
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { sendSMSOTP } from '@/actions/OTP/sendOtp';
import { Input } from './input';
import { Button } from './button';
import { LoaderCircle } from 'lucide-react';
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface SinginFormProps {
    setShowOTP: (value: boolean) => void
    setphonePhone: (value: string) => void
}

const IFormSchema = z.object({
    phoneNumber: z.string().min(10, {
        message: "Invalid phone number"
    })
})
const SigninInputForm = ({ setShowOTP, setphonePhone }: SinginFormProps) => {
    const [phone, setPhone] = useState<string>("");
    const phonePrefix = process.env.NEXT_PUBLIC_PHONE_NO_PREFIX;

    const form = useForm<z.infer<typeof IFormSchema>>({
        resolver: zodResolver(IFormSchema),
        defaultValues: {
            phoneNumber: "",
        }
    })

    const mutation = useMutation({ mutationFn: onSubmit });

    async function onSubmit() {
        if (phone.length !== 10) {
            toast.error("Incorrect Phone!");
            setPhone("");
            return;
        }
        const phoneNo = phonePrefix + phone;
        const sendSmsActionResult = await sendSMSOTP(phoneNo);
        return sendSmsActionResult;
    }

    if (mutation.isError) {
        toast.error("something went wrong, please try again!");
        setShowOTP(false);
    }
    if (mutation.data?.success) {
        setShowOTP(true)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <p className="text-sm text-gray-500 mb-4">
                    {!mutation.data?.success ? "We will send you an OTP" : "Please enter otp to procced"}
                </p>
                <div className="flex mb-4">
                    <Input className="w-16 mr-2" type="text" value="+91" disabled />
                    <Input
                        className="flex-grow"
                        type="tel"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => {
                            const newPhone = e.target.value;
                            setPhone(newPhone);
                            setphonePhone(newPhone);
                        }} />
                </div>
                <Button
                    className="w-full mb-4 bg-black text-white"
                    onClick={() => mutation.mutate()}
                    disabled={mutation.isPending ? true : false}
                >
                    {!mutation.isPending ? (
                        "Get OTP"
                    ) : (
                        <LoaderCircle className="animate-spin" />
                    )}
                </Button>
            </form>
        </Form>
    )
}

export default SigninInputForm
