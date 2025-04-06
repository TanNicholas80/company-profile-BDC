"use client";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Card, CardContent } from "@/app/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Textarea } from "@/app/components/ui/textarea";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Calendar } from "@/app/components/ui/calendar";
import { format } from "date-fns";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { UserFormInput } from "@/entities/models/user.models";
import { PasienInfoCreateInput } from "@/entities/models/pasien.models";
import { registerAction } from "@/app/_actions/register";
import { InputParsedError } from "@/entities/errors/common";
import { Goldar } from "@prisma/client";
import Link from "next/link";

const step1Schema = z.object({
  nama: z.string().min(1, { message: "Nama wajib diisi" }),
  NIK: z.string().length(16, { message: "NIK harus terdiri dari 16 angka" }),
  no_telp: z.string().min(10, { message: "Nomor telepon minimal 10 digit" }),
  jenis_kelamin: z.enum(["Laki_Laki", "Perempuan"], {
    message: "Jenis kelamin harus Laki-laki atau Perempuan",
  }),
  tgl_lahir: z.date({
    required_error: "Tanggal lahir wajib diisi",
    invalid_type_error: "Format tanggal tidak valid",
  }),
  alamat: z.string().min(1, { message: "Alamat wajib diisi" }),
});

const step2Schema = z.object({
  no_BPJS: z
    .string()
    .max(13, { message: "Nomor BPJS harus terdiri dari 13 angka" })
    .nullable(),
  golongan_darah: z.enum(["A", "B", "AB", "O", "Tidak_Tahu"], {
    message: "Golongan darah tidak valid",
  }),
  alergi: z.string().nullable(),
});

const step3Schema = z.object({
  email: z.string().email({ message: "Format email tidak valid" }),
  password: z.string().min(8, { message: "Password minimal 8 karakter" }),
  confirm_password: z.string(),
});

const formSchema = step1Schema.merge(step2Schema).merge(step3Schema);

// Tipe Data Form
type FormData = z.infer<typeof formSchema>;

type Step1FormData = z.infer<typeof step1Schema>;
type Step2FormData = z.infer<typeof step2Schema>;
type Step3FormData = z.infer<typeof step3Schema>;
// Tipe Context Form
interface FormContextType {
  step: number;
  formData: Partial<FormData>;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<FormData>) => void;
  submitForm: (step3Data: Step3FormData) => void;
}

// Buat Context
const FormContext = createContext<FormContextType | undefined>(undefined);

export function RegisterFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({
    nama: "",
    email: "",
    password: "",
    confirm_password: "",
    no_telp: "",
    alamat: "",
    NIK: "",
    no_BPJS: "",
    jenis_kelamin: "Laki_Laki",
    golongan_darah: "Tidak_Tahu",
    tgl_lahir: new Date(),
    alergi: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(1, prev - 1));

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const submitForm = async (step3Data: Step3FormData) => {
    try {
      // Gabungkan data dari semua step
      const finalFormData = {
        ...formData,
        ...step3Data,
      };

      console.log("Form submitted with values:", finalFormData);
      const toastId = toast.loading(
        "Please wait, we are registering your account"
      );

      const userData: UserFormInput = {
        nama: finalFormData.nama!,
        email: finalFormData.email!,
        password: finalFormData.password!,
        confirm_password: finalFormData.confirm_password!,
        no_telp: finalFormData.no_telp!,
        alamat: finalFormData.alamat!,
        Foto: null,
      };

      const pasienInfoData: PasienInfoCreateInput = {
        NIK: finalFormData.NIK!,
        no_BPJS: finalFormData.no_BPJS ?? null,
        jenis_kelamin:
          finalFormData.jenis_kelamin === "Laki_Laki"
            ? "Laki_Laki"
            : "Perempuan",
        golongan_darah: finalFormData.golongan_darah as Goldar,
        tgl_lahir: finalFormData.tgl_lahir!,
        alergi: finalFormData.alergi ?? null,
      };

      const response = await registerAction(userData, pasienInfoData);

      if (!response.success) {
        toast.error(response.error.message ?? null, { id: toastId });
        if (response.error.name === InputParsedError.name) {
          Object.entries(response.error.data!).forEach(([key, message]) => {
            console.error(`Error in ${key}: ${message}`);
          });
        }
      } else {
        toast.success("Your account was created successfully. Please login.", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Terjadi kesalahan saat mendaftar");
    }
  };

  return (
    <FormContext.Provider
      value={{ step, formData, nextStep, prevStep, updateFormData, submitForm }}
    >
      {children}
    </FormContext.Provider>
  );
}

// Custom Hook untuk menggunakan context
function useRegisterForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error(
      "useRegisterForm must be used within a RegisterFormProvider"
    );
  }
  return context;
}

function Step1Form() {
  const { formData, updateFormData, nextStep } = useRegisterForm();
  const methods = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: formData,
  });

  const onSubmit = (data: Step1FormData) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <Card className="w-full border-gray-200 md:max-w-[545px]">
          <CardContent className="p-6">
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={methods.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-noto">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nama Lengkap"
                          {...field}
                          className="mt-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={methods.control}
                  name="NIK"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-noto">
                        Nomor Induk Kependudukan (NIK){" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0123456789101112"
                          {...field}
                          className="mt-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={methods.control}
                  name="no_telp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-noto">
                        Nomor Telepon <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+62 812-3456-7890"
                          {...field}
                          className="mt-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-6">
                  <FormField
                    control={methods.control}
                    name="tgl_lahir"
                    render={({ field }) => (
                      <FormItem className="space-y-2 w-1/2">
                        <FormLabel htmlFor="tgl_lahir">
                          Tanggal Lahir <span className="text-red-500">*</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={
                                  "w-full text-left font-normal " +
                                  (!field.value ? "text-muted-foreground" : "")
                                }
                              >
                                {field.value
                                  ? format(field.value, "dd/MM/yyyy")
                                  : "Pilih Tanggal"}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={methods.control}
                    name="jenis_kelamin"
                    render={({ field }) => (
                      <FormItem className="space-y-2 w-1/2">
                        <FormLabel>
                          Jenis Kelamin <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            defaultValue="Laki_Laki"
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-col sm:flex-row gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="Laki_Laki"
                                id="Laki_Laki"
                              />
                              <Label htmlFor="Laki_Laki">Laki-Laki</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="Perempuan"
                                id="Perempuan"
                              />
                              <Label htmlFor="Perempuan">Perempuan</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={methods.control}
                  name="alamat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Alamat <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan alamat lengkap..."
                          className="min-h-[100px] mt-2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </FormProvider>
            {/* Link Login */}
            <p className="text-sm text-center text-gray-600 mt-6">
              Sudah memiliki akun?{" "}
              <Link
                href="/login"
                className="text-blue-800 hover:text-blue-600 font-medium transition-colors"
              >
                Masuk
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-auto">
        <div className="flex justify-between w-[545px]">
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            disabled
          >
            <ChevronLeft size={16} /> Kembali
          </Button>
          <Button
            type="button"
            onClick={methods.handleSubmit(onSubmit)}
            className="bg-red-800 text-white flex items-center gap-2"
          >
            Selanjutnya <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </>
  );
}

function Step2Form() {
  const { formData, updateFormData, nextStep, prevStep } = useRegisterForm();
  const methods = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: formData,
  });

  const onSubmit = (data: Step2FormData) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <Card className="w-full border-gray-200 md:max-w-[545px]">
          <CardContent className="p-6">
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={methods.control}
                  name="no_BPJS"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-noto">Nomor BPJS</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0123456789123"
                          {...field}
                          value={field.value ?? ""} // Jika null, ubah menjadi ""
                          className="mt-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={methods.control}
                  name="golongan_darah"
                  render={({ field }) => (
                    <FormItem className="space-y-2 w-full">
                      <FormLabel>
                        Golongan Darah <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          defaultValue="Tidak_Tahu"
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-wrap gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="A" id="A" />
                            <Label htmlFor="A">A</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="B" id="B" />
                            <Label htmlFor="B">B</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="O" id="O" />
                            <Label htmlFor="O">O</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="AB" id="AB" />
                            <Label htmlFor="AB">AB</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="Tidak_Tahu"
                              id="Tidak_Tahu"
                            />
                            <Label htmlFor="Tidak_Tahu">
                              Tidak tahu / Belum Diketahui
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={methods.control}
                  name="alergi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-noto">Alergi</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tidak Ada"
                          {...field}
                          value={field.value ?? ""} // Jika null, ubah menjadi ""
                          className="mt-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </FormProvider>
            {/* Link Login */}
            <p className="text-sm text-center text-gray-600 mt-6">
              Sudah memiliki akun?{" "}
              <Link
                href="/login"
                className="text-blue-800 hover:text-blue-600 font-medium transition-colors"
              >
                Masuk
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-auto">
        <div className="flex justify-between w-[545px]">
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            onClick={prevStep}
          >
            <ChevronLeft size={16} /> Kembali
          </Button>
          <Button
            type="button"
            onClick={methods.handleSubmit(onSubmit)}
            className="bg-red-800 text-white flex items-center gap-2"
          >
            Selanjutnya <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </>
  );
}

function Step3Form() {
  const { prevStep, submitForm, formData, updateFormData } = useRegisterForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const methods = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: formData,
  });

  const onSubmit = async (data: Step3FormData) => {
    try {
      // Validasi password dan confirm_password
      if (data.password !== data.confirm_password) {
        methods.setError("confirm_password", {
          type: "manual",
          message: "Password tidak cocok",
        });
        return;
      }

      // Update form data dengan data terbaru dari step 3
      updateFormData({
        email: data.email,
        password: data.password,
        confirm_password: data.confirm_password,
      });

      // Langsung submit form dengan data step 3
      await submitForm(data);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Terjadi kesalahan saat mendaftar");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <Card className="w-full border-gray-200 md:max-w-[545px]">
          <CardContent className="p-6">
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={methods.control}
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
                  control={methods.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
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

                <FormField
                  control={methods.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Konfirmasi Kata Sandi{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
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
              </form>
            </FormProvider>
            {/* Link Login */}
            <p className="text-sm text-center text-gray-600 mt-6">
              Sudah memiliki akun?{" "}
              <Link
                href="/login"
                className="text-blue-800 hover:text-blue-600 font-medium transition-colors"
              >
                Masuk
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-auto">
        <div className="flex justify-between w-[545px]">
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            onClick={prevStep}
          >
            <ChevronLeft size={16} /> Kembali
          </Button>
          <Button
            type="button"
            onClick={methods.handleSubmit(onSubmit)}
            className="bg-red-800 text-white flex items-center gap-2"
          >
            Daftar
          </Button>
        </div>
      </div>
    </>
  );
}

function RegisterProgress() {
  const { step } = useRegisterForm();
  const steps = ["Informasi Pribadi", "Informasi Medis", "Pengaturan Akun"];

  return (
    <div className="mb-10 flex flex-col items-center">
      {/* Progress Steps */}
      <div className="flex justify-center mb-6">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex items-center">
            {/* Step Circle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                ${num <= step ? "bg-red-800 text-white" : "bg-gray-300 text-gray-600"}
              `}
            >
              {num}
            </div>

            {/* Line Between Steps */}
            {num !== 3 && (
              <div
                className={`w-20 md:w-40 h-px mx-2 transition-all duration-300 ${
                  num < step ? "bg-red-800" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Title Form */}
      <h2 className="text-3xl font-semibold text-center text-gray-800 font-noto">
        {steps[step - 1]}
      </h2>
    </div>
  );
}

export function RegisterPage() {
  const { step } = useRegisterForm();

  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);

  switch (step) {
    case 1:
      return <Step1Form />;
    case 2:
      return <Step2Form />;
    case 3:
      return <Step3Form />;
    default:
      return null;
  }
}

// Wrapper Utama
export function RegisterPageWrapper() {
  return (
    <div className="flex flex-col lg:flex-row">
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
              Buat Akun & Kelola Kunjungan Gigi dengan Mudah!
            </h1>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 xl:w-3/5 p-8 flex flex-col min-h-screen">
        <RegisterFormProvider>
          {/* Progress Step */}
          <RegisterProgress />

          {/* Form Register */}
          <RegisterPage />
        </RegisterFormProvider>
      </div>
    </div>
  );
}
