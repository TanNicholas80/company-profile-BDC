import { ServerResponseType } from "@/entities/models/response.model";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class ServerActionResponse {
  static successResponse<T>(data: T): ServerResponseType<T> {
    return {
      status: "success",
      error: null,
      data,
    };
  }

  static failedResponse<T>({
    type,
    message,
    meta,
  }: {
    type: string;
    message: string;
    meta: T;
  }): ServerResponseType<T> {
    return {
      status: "failed",
      data: null,
      error: {
        type,
        message,
        meta,
      },
    };
  }
}
