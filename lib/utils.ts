import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import dayjs from "dayjs";
import { getSession, signOut } from "next-auth/react";
import getConfig from "next/config";
import { MethodProps, handleError, removeUndefinedValues } from "./helper";

type HandleFetchBackendProps = {
  path: string;
  method: MethodProps;
  body?: Object;
  query?: Object;
  signal?: AbortSignal;
  isThrowError?: boolean;
  withCredential?: boolean;
  formData?: FormData;
};

type ErrorResponse = {
  statusCode: number;
  message: string;
  cause: string;
  timestamp: string;
  path: string;
};

export type FetchBackendResponse<T> =
  | {
      status: "success";
      data: T;
    }
  | {
      status: "failed";
      isAbort?: boolean;
      cause: string;
      error?: ErrorResponse;
    };

let cachedAccessToken: string | undefined;

const getAccessToken = async (): Promise<string | undefined> => {
  if (cachedAccessToken) {
    return cachedAccessToken;
  }

  let accessToken =
    typeof localStorage !== "undefined"
      ? window.localStorage.getItem("accessToken")
      : undefined;

  if (!accessToken) {
    const session = await getSession();
    accessToken = session?.access_token;

    if (typeof localStorage !== "undefined" && accessToken) {
      window.localStorage.setItem("accessToken", accessToken);
    }
  }

  cachedAccessToken = accessToken as string | undefined;

  return accessToken as string | undefined;
};

export const logout = async () => {
  // Clear the token from localStorage
  if (typeof localStorage !== "undefined") {
    window.localStorage.removeItem("accessToken");
  }

  // Reset the cached token
  cachedAccessToken = undefined;

  // Perform other logout actions, such as redirecting the user or calling a logout API
  await signOut({ callbackUrl: "/auth/login" }); //
};

export const handleFetchBackend = async <T>({
  path,
  method,
  body = {},
  query = {},
  signal,
  isThrowError = true,
  withCredential = true,
  formData,
}: HandleFetchBackendProps): Promise<FetchBackendResponse<T>> => {
  "use client";
  try {
    const accessToken = await getAccessToken();
    const queryString = new URLSearchParams(
      removeUndefinedValues(query)
    ).toString();
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}${
      queryString && queryString.length >= 1 ? "?" + queryString : ""
    }`;
    console.log("🚀 ~ url:", url);
    const headers = new Headers();
    if (formData == undefined) {
      headers.append("Content-Type", "application/json");
    }
    if (withCredential) {
      headers.append("Authorization", `Bearer ${accessToken}`);
    }
    const response = await fetch(
      url,
      removeUndefinedValues({
        headers: headers,
        method: method,
        signal: signal,
        body: formData
          ? formData
          : Object.keys(body).length >= 1
          ? JSON.stringify(removeUndefinedValues(body))
          : undefined,
      })
    );
    const statusColor =
      response.status >= 200 && response.status < 300 ? "lime" : "crimson";
    console.log(
      `%c Response status: %c${response.status}`,
      "color: gray",
      `color: ${statusColor}`
    );
    const result = await response.json();

    if (response.status !== 200 && response.status !== 201) {
      const error: ErrorResponse = result;
      if (isThrowError) {
        throw new Error(error.cause || error.message);
      }
      return {
        status: "failed",
        cause: error.cause,
        error: error,
      };
    }
    return {
      status: "success",
      data: result as T,
    };
  } catch (e) {
    const _err = handleError(e);
    if (isThrowError && !_err.isAbort) {
      throw _err.message;
    }
    return {
      status: "failed",
      cause: _err.message,
      isAbort: _err.isAbort,
    };
  }
};

export function getFileExtension(url: string) {
  const match = url.match(/\.([^.]+)$/);
  return match ? match[1] : null;
}

export const formatDate = (
  date: Date | string,
  formatString: string = "DD-MM-YYYY HH:mm:ss"
) => {
  return dayjs(date).format(formatString);
};

export function safeParseNumber(value: string): number | null {
  const parsedInt = parseInt(value);
  if (!isNaN(parsedInt)) {
    return parsedInt;
  }

  const parsedFloat = parseFloat(value);
  return isNaN(parsedFloat) ? null : parsedFloat;
}
