"use client";
import { loginAction } from "@/app/_actions/login";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX, Eye, EyeOff, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
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
      pending: "Memverifikasi akun Anda...",
      error: message || "Email atau kata sandi salah",
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
  password: z.string().min(8, { message: "Password minimal 8 karakter" }),
});

export function LoginPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const [formStatus, setFormStatus] = useState<"idle" | "pending" | "error">(
    "idle"
  );
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
    const response = await loginAction(values.email, values.password);

    if (!response.success) {
      setFormStatus("error");
      toast.error(response.error?.message || "Terjadi kesalahan saat login");
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row">
      {/* Form Login */}
      <div
        className={cn(
          "lg:w-1/2 xl:w-3/5 p-8 flex flex-col justify-center items-center lg:min-h-screen",
          className
        )}
        {...props}
      >
        <div className="w-full flex flex-col gap-12 md:max-w-[545px]">
          {/* Title Form */}
          <h2 className="text-3xl font-semibold text-center text-gray-800 font-noto">
            Masuk
          </h2>
          <Card className="gap-y-12">
            <CardContent className="p-6">
              <FormInformation status={formStatus} />
              <FormProvider {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Alamat Email <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="emailanda@gmail.com"
                            type="email"
                            {...field}
                            className="mt-2"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormLabel>
                          Kata Sandi <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Masukan Kata Sandi"
                              type={showPassword ? "text" : "password"}
                              {...field}
                              className="mt-2 pr-10"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/3 text-gray-500"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff size={20} />
                              ) : (
                                <Eye size={20} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Link Lupa Kata Sandi */}
                  <div className="flex mb-6">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-blue-800 hover:text-blue-600 transition-colors"
                    >
                      Lupa kata sandi?
                    </Link>
                  </div>
                </form>
              </FormProvider>
              {/* Link Daftar */}
              <p className="text-sm text-center text-gray-600">
                Belum memiliki akun?{" "}
                <Link
                  href="/register"
                  className="text-blue-800 hover:text-blue-600 font-medium transition-colors"
                >
                  Daftar sekarang
                </Link>
              </p>
            </CardContent>
          </Card>
          <div className="flex justify-center items-center">
            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              className="bg-red-800 text-white gap-2"
            >
              Masuk
            </Button>
          </div>
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
              Selamat Datang Kembali!
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
