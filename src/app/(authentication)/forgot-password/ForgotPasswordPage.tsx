"use client";
import { forgotPasswordAction } from "@/app/_actions/forgot-password";
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
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
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
      pending: "Mengirim permintaan reset password ke email Anda...",
      error: message || "Email yang anda masukkan tidak terdaftar",
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
  email: z.string().email({ message: "Format email tidak valid" }),
});

export function ForgotPasswordPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const [formStatus, setFormStatus] = useState<"idle" | "pending" | "error">(
    "idle"
  );

  useEffect(() => {
    setTimeout(() => {
      const isAlert = searchParams.get("alert");
      if (isAlert) {
        toast.error("Email yang anda masukkan tidak terdaftar");
      }
    }, 200);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormStatus("pending");
    const response = await forgotPasswordAction(values.email);

    if (!response.success) {
      setFormStatus("error");
      toast.error(
        response.error?.message ||
          "Terjadi kesalahan saat meminta reset kata sandi"
      );
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row">
      {/* FORM Forgot Password */}
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
                Lupa Kata Sandi?
              </CardTitle>
              <CardContent className="p-0">
                <p className="text-gray-600 mb-1">
                  Jangan khawatir, kami akan mengirimkan petunjuk untuk
                  meresetnya.
                </p>
              </CardContent>
            </CardHeader>
            <CardContent>
              <FormInformation
                status={formStatus}
                message={form.formState.errors.email?.message}
              />
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mb-12">
                        <FormLabel>Alamat Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="masukkan alamat email terdaftar anda"
                            type="email"
                            {...field}
                            className="mt-2"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <button
                    type="submit"
                    disabled={formStatus === "pending"}
                    className="w-full py-3 bg-[#840403] text-white rounded-lg hover:bg-[#A52A2A] transition-colors"
                  >
                    {formStatus === "pending" ? (
                      <LoaderCircle
                        className="animate-spin mx-auto"
                        size={20}
                      />
                    ) : (
                      "Selanjutnya"
                    )}
                  </button>
                </form>
              </Form>
              <div className="text-center">
                <button
                  onClick={() => window.history.back()}
                  className="mt-3 inline-flex items-center font-semibold text-lg hover:text-gray-900"
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
                  Kembali ke halaman masuk
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
              Permintaan Mengatur Ulang Kata Sandi Dengan Mudah!
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
