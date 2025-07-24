"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifySMSOTPAction } from "@/actions/OTP/validateOtp";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

interface InputOTPFormProps {
  phoneNumber: string;
}
const FormSchema = z.object({
  otp: z.string().min(4, {
    message: "Invalid OTP",
  }),
});
export function InputOTPForm({ phoneNumber }: InputOTPFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });
  const router = useRouter();
  const { isError, isPending } = useMutation({ mutationFn: onSubmit });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const isVerified = await verifySMSOTPAction(data.otp, phoneNumber);

      if (!isVerified.verified) {
        toast.error("Invalid OTP");
        return;
      }

      const res = await signIn("credentials", {
        redirect: false,
        phoneNumber,
        isVerified: isVerified.verified,
      });

      if (isVerified.verified && res?.ok) {
        toast.success("User created successfully!");
        router.push("/");
      } else {
        toast.error("Error while creating user!");
      }
    } catch (error) {
      const isVerified = await verifySMSOTPAction(data.otp, phoneNumber);

      if (!isVerified.verified) {
        toast.error("Invalid OTP");
        return;
      }

      const res = await signIn("credentials", {
        redirect: false,
        phoneNumber,
        isVerified: isVerified.verified,
      });

      if (isVerified.verified && res?.ok) {
        toast.success("User created successfully!");
        router.push("/");
      } else {
        toast.error("Error while creating user!");
      }
    }
  }

  if (isError) {
    toast.error(
      "We're sorry for the inconvenience. Please report this issue to our support team!"
    );
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-center items-center"
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="border ml-1 border-slate-500"/>
                    <InputOTPSlot index={1} className="border ml-1 border-slate-500"/>
                    <InputOTPSlot index={2} className="border ml-1 border-slate-500"/>
                    <InputOTPSlot index={3} className="border ml-1 border-slate-500"/>
                    <InputOTPSlot index={4} className="border ml-1 border-slate-500"/>
                    <InputOTPSlot index={5} className="border ml-1 border-slate-500"/>
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-3 bg-black text-white" disabled={isPending}>
          {!isPending ? "Submit" : <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
