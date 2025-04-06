"use client";

import { resetPasswordAction } from "@/app/_actions/reset-password";
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
import { CircleX, Eye, EyeOff, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
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
  password: z
    .string()
    .min(8, { message: "Password harus memiliki minimal 8 karakter" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password harus memiliki minimal 8 karakter" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password dan konfirmasi password tidak sama",
  path: ["confirmPassword"],
});

export function ResetPasswordPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "pending" | "error" | "success">("idle");
  const [redirectTimer, setRedirectTimer] = useState(5);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    setTimeout(() => {
      const isAlert = searchParams.get("alert");
      if (isAlert) {
        toast.error("Password dan confirm password tidak sama");
      }
    }, 200);
  }, []);

  // Timer untuk redirect setelah sukses
  useEffect(() => {
    if (formStatus === "success" && redirectTimer > 0) {
      const timer = setTimeout(() => setRedirectTimer(redirectTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (formStatus === "success" && redirectTimer === 0) {
      router.push("/login");
    }
  }, [formStatus, redirectTimer, router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormStatus("pending");
    const userEmail = searchParams.get("email");
    if (!userEmail) {
      setFormStatus("error");
      return;
    }

    const response = await resetPasswordAction(
      userEmail,
      values.password,
      values.confirmPassword
    );
    if (!response.success) {
      setFormStatus("error");
      toast.error(
        response.error?.message || "Terjadi kesalahan saat mereset password"
      );
    } else {
      setFormStatus("success");
      toast.success("Password berhasil direset!");
    }
  };

  // Tampilan sukses
  if (formStatus === "success") {
    return (
      <div className="flex flex-col-reverse lg:flex-row">
        <div className={cn("lg:w-1/2 xl:w-3/5 p-8 flex flex-col justify-center items-center lg:min-h-screen", className)} {...props}>
          <div className="w-full flex flex-col md:max-w-[545px]">
            <Card className="gap-y-12">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-semibold mb-2">
                  Kata Sandi Berhasil Direset!
                </CardTitle>
                <CardContent className="p-0">
                  <p className="text-gray-600 mb-1">
                    Sekarang, Anda dapat masuk dengan kata sandi baru.
                  </p>
                </CardContent>
              </CardHeader>
              <CardContent className="text-center">
                <button 
                  onClick={() => router.push("/login")}
                  className="w-full py-3 bg-[#840403] text-white rounded-lg hover:bg-[#A52A2A] transition-colors"
                >
                  Masuk
                </button>
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
            <div className="absolute inset-0 bg-black/50 rounded-[48px]" />
            <div className="absolute inset-0 flex items-center justify-center px-14">
              <h1 className="text-3xl md:text-5xl text-center text-white font-semibold font-noto leading-tight">
                Password Anda Telah Direset!
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tampilan error
  if (formStatus === "error") {
    return (
      <div className="flex flex-col-reverse lg:flex-row">
        <div className={cn("lg:w-1/2 xl:w-3/5 p-8 flex flex-col justify-center items-center lg:min-h-screen", className)} {...props}>
          <div className="w-full flex flex-col md:max-w-[545px]">
            <Card className="gap-y-12">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CircleX className="w-8 h-8 text-red-500" />
                </div>
                <CardTitle className="text-2xl font-semibold mb-2">
                  Gagal Mereset Password!
                </CardTitle>
                <CardContent className="p-0">
                  <p className="text-gray-600 mb-1">
                    Terjadi kesalahan saat mereset password. Silakan coba lagi atau hubungi admin jika masalah berlanjut.
                  </p>
                </CardContent>
              </CardHeader>
              <CardContent className="text-center">
                <button 
                  onClick={() => setFormStatus("idle")}
                  className="w-full py-3 bg-[#840403] text-white rounded-lg hover:bg-[#A52A2A] transition-colors mb-4"
                >
                  Coba Lagi
                </button>
                <button 
                  onClick={() => window.history.back()}
                  className="inline-flex items-center font-semibold text-lg hover:text-gray-900"
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
                  Kembali ke halaman sebelumnya
                </button>
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
            <div className="absolute inset-0 bg-black/50 rounded-[48px]" />
            <div className="absolute inset-0 flex items-center justify-center px-14">
              <h1 className="text-3xl md:text-5xl text-center text-white font-semibold font-noto leading-tight">
                Terjadi Kesalahan
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tampilan form reset password (kode yang sudah ada)
  return (
    <div className="flex flex-col-reverse lg:flex-row">
      {/* FORM Reset Password */}
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
                Buat Kata Sandi Baru
              </CardTitle>
              <CardContent className="p-0">
                <p className="text-gray-600 mb-1 text-center">
                  Kata sandi harus terdiri dari minimal 8 karakter, mengandung
                  huruf besar dan kecil, setidaknya satu angka, serta satu
                  karakter khusus (!@#$%^&*?). Hindari penggunaan spasi dan kata
                  sandi yang sama dengan sebelumnya.
                </p>
              </CardContent>
            </CardHeader>
            <CardContent>
              <FormInformation
                status={formStatus}
                message={form.formState.errors.password?.message}
              />
              <FormInformation
                status={formStatus}
                message={form.formState.errors.confirmPassword?.message}
              />
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kata Sandi</FormLabel>
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
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konfirmasi Kata Sandi</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Masukan Ulang Kata Sandi"
                              type={showConfirmPassword ? "text" : "password"}
                              {...field}
                              className="mt-2 pr-10"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/3 text-gray-500"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
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
                      "Reset kata sandi"
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
                  Kembali ke halaman verifikasi kode reset password
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
              Buat Kata Sandi Baru Anda!
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
