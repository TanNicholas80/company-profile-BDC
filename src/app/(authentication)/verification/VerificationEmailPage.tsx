"use client";

import { verifyEmailAction } from "@/app/_actions/email-verification";
import { resendVerificationAction } from "@/app/_actions/resend-email-verification";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/app/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/app/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormInformation = ({
  status,
  message,
}: {
  status: "pending" | "error" | "idle";
  message?: string;
}) => {
  const messageInfo = useMemo(
    () => ({
      pending: "Memverifikasi email Anda...",
      error: message || "Kode verifikasi tidak valid atau sudah kadaluarsa",
    }),
    [message]
  );
  if (status === "idle") return null;

  return (
    <div
      className={cn(
        "flex w-full gap-2 p-2 rounded text-sm items-center",
        status === "pending" && "bg-slate-100",
        status === "error" && "bg-red-500 text-white"
      )}
    >
      {status === "pending" && (
        <LoaderCircle className="animate-spin" size={20} />
      )}
      {status === "error" && <CircleX className="" size={30} />}
      <p>{messageInfo[status]}</p>
    </div>
  );
};

const formSchema = z.object({
  token: z.string().length(4, "Kode verifikasi harus 4 digit"),
});

export function VerificationEmailPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const [formStatus, setFormStatus] = useState<"idle" | "pending" | "error">("idle");
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
    },
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    setTimeout(() => {
      const isAlert = searchParams.get("alert");
      if (isAlert) {
        toast.error("Anda tidak terautentikasi atau sesi Anda telah berakhir!");
      }
    }, 200);
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormStatus("pending");
    const userEmail = searchParams.get("email");
    if (!userEmail) {
      setFormStatus("error");
      return;
    }
    const response = await verifyEmailAction(userEmail, values.token);

    if (!response.success) {
      setFormStatus("error");
      toast.error(response.error?.message || "Terjadi kesalahan saat memverifikasi email");
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    
    const userEmail = searchParams.get("email");
    if (!userEmail) return;

    setIsResending(true);
    try {
      const response = await resendVerificationAction(userEmail);
      if (response.success) {
        toast.success("Kode verifikasi telah dikirim ulang");
        setCountdown(30); // 30 detik cooldown
      } else {
        toast.error(response.error?.message || "Terjadi kesalahan saat mengirim ulang kode");
      }
    } catch {
      toast.error("Terjadi kesalahan saat mengirim ulang kode");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row">
      {/* FORM Email Verification */}
      <div
        className={cn(
          "lg:w-1/2 xl:w-3/5 p-8 flex flex-col justify-center items-center lg:min-h-screen",
          className
        )}
        {...props}
      >
        <div className="w-full flex flex-col md:max-w-[545px]">
          <Card className="gap-y-12">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold mb-2">
                Verifikasi Email
              </CardTitle>
              <CardContent className="p-0">
                <p className="text-gray-600 mb-1">
                  Kami telah mengirimkan kode ke email Anda
                </p>
                <p className="text-gray-900 font-medium">
                  {searchParams.get("email")}
                </p>
              </CardContent>
            </CardHeader>
            <CardContent>
              <FormInformation
                status={formStatus}
                message={form.formState.errors.token?.message}
              />
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="token"
                    render={({ field }) => (
                      <FormItem className="flex justify-center mb-12">
                        <FormControl>
                          <InputOTP 
                            maxLength={4} 
                            value={field.value}
                            onChange={field.onChange}
                          >
                            <InputOTPGroup className="gap-3">
                              <InputOTPSlot 
                                index={0} 
                                className="w-14 h-14 text-2xl font-bold border rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                              />
                              <InputOTPSlot 
                                index={1}
                                className="w-14 h-14 text-2xl font-bold border rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                              />
                              <InputOTPSlot 
                                index={2}
                                className="w-14 h-14 text-2xl font-bold border rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                              />
                              <InputOTPSlot 
                                index={3}
                                className="w-14 h-14 text-2xl font-bold border rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                              />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <button
                    type="submit"
                    disabled={formStatus === "pending"}
                    className="w-full py-3 bg-[#840403] text-white rounded-lg hover:bg-[#A52A2A] transition-colors"
                  >
                    {formStatus === "pending" ? (
                      <LoaderCircle className="animate-spin mx-auto" size={20} />
                    ) : (
                      "Selanjutnya"
                    )}
                  </button>
                </form>
              </Form>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Belum menerima email?{" "}
                  <button 
                    onClick={handleResendCode}
                    disabled={isResending || countdown > 0}
                    className={cn(
                      "text-blue-800 hover:text-blue-600 hover:underline",
                      (isResending || countdown > 0) && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {countdown > 0 
                      ? `Kirim ulang dalam ${countdown} detik` 
                      : isResending 
                        ? "Mengirim..." 
                        : "Klik untuk mengirim ulang"}
                  </button>
                </p>
                <button 
                  onClick={() => window.history.back()}
                  className="mt-4 inline-flex items-center font-semibold text-lg hover:text-gray-900"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Kembali ke halaman register
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="px-6 py-6 sm:px-8 sm:py-6 md:px-12 md:py-8 lg:w-1/2 xl:w-2/5">
        <div className="relative rounded-[48px] h-full w-full min-h-[300px]">
          <Image
            alt="Klinik Bungah Dental Care"
            src="/image-bdc-register-login.jpg"
            fill
            className="object-cover rounded-[48px]"
          />
          {/* Overlay gelap */}
          <div className="absolute inset-0 bg-black/50 rounded-[48px]" />
          {/* Text content */}
          <div className="absolute inset-0 flex items-center justify-center px-14">
            <h1 className="text-3xl md:text-5xl text-center text-white font-semibold font-noto leading-tight">
              Verifikasi Email Anda Dengan Mudah!
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
