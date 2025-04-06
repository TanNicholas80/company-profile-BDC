"use server";

import { InputParsedError, RegistrationError } from "@/entities/errors/common";
import { PasienInfoCreateInput } from "@/entities/models/pasien.models";
import { UserCreateInput, UserFormInput } from "@/entities/models/user.models";
import { registerUserController } from "@/infrastructure/controllers/auth/register.controller";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export const registerAction = async (
  userInput: UserFormInput,
  pasienInfoInput: PasienInfoCreateInput
) => {
  try {
    const userData: UserCreateInput = {
      email: userInput.email,
      nama: userInput.nama,
      password: userInput.password,
      no_telp: userInput.no_telp,
      alamat: userInput.alamat,
      Foto: userInput.Foto || null,
      confirm_password: userInput.confirm_password,
      is_verified: false,
      role: Role.USER,
    };

    const pasienData: PasienInfoCreateInput = {
      NIK: pasienInfoInput.NIK,
      no_BPJS: pasienInfoInput.no_BPJS || null,
      jenis_kelamin: pasienInfoInput.jenis_kelamin,
      golongan_darah: pasienInfoInput.golongan_darah,
      tgl_lahir: pasienInfoInput.tgl_lahir,
      alergi: pasienInfoInput.alergi || null,
    };

    await registerUserController(userData, pasienData);
    redirect(`/verification?email=${encodeURIComponent(userData.email)}`);
    return { success: true, error: {} };
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") throw error;
    if (error instanceof RegistrationError) {
      return {
        success: false,
        error: {
          name: error.name,
          message: error.message,
        },
      };
    }

    if (error instanceof InputParsedError) {
      return {
        success: false,
        error: {
          name: error.name,
          message: error.message,
          data: error.fields,
        },
      };
    }

    console.error(error);
    return {
      success: false,
      error: {
        name: "Error",
        message: "An error occured while creating a user",
      },
    };
  }
};
