import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import { logout } from "./utils";

export const removeUndefinedValues = (
  obj: Record<string, any>
): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      obj[key] !== undefined &&
      obj[key] !== null
    ) {
      result[key] = obj[key];
    }
  }

  return result;
};

export const buildQueryParam = (
  obj: Record<string, any>
): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      obj[key] !== undefined &&
      obj[key] !== null &&
      obj[key] !== ""
    ) {
      result[key] = obj[key];
    }
  }

  return result;
};

export const handleError = (
  error: unknown,
  isPopup = false,
  thenFunc?: () => void | Promise<void>
) => {
  const result = {
    message: "Unknown error",
    isAbort: false,
    code: 400,
  };
  if (axios.isAxiosError(error)) {
    const axiosError: AxiosError = error;
    if (axiosError.name === "CanceledError") {
      result.isAbort = true;
    }

    const responseData = axiosError.response?.data;
    if (typeof responseData === "object") {
      const _data: any = responseData;
      result.message = String(_data?.cause || _data?.message);
      if (
        result.message.includes(
          "duplicate key value violates unique constraint"
        )
      ) {
        result.message = "SKU value is duplicated";
      }
    } else {
      result.message = String(axiosError.message);
    }
    result.code = axiosError.response?.status || 400;
  } else if (error instanceof ZodError) {
    console.log("-instanceof- ZodError");
    let errors = error.errors.reduce(
      (acc, current) => ({
        ...acc,
        [current.path.join(".")]: { message: current.message },
      }),
      {}
    );
    result.message = Object.values(errors)
      .map((e: any) => e.message)
      .join(", ");
  } else if (error instanceof Error) {
    if (error.name === "AbortError") {
      result.isAbort = true;
    }
    if (error.message == "UnauthorizedException") {
      result.code = 401;
    }
    result.message = error.message;
  } else if (error && typeof error === "string") {
    result.message = error;
  }
  if (error && typeof error === "object" && "code" in error) {
    result.code = Number(error.code);
  }
  if (error && typeof error === "object" && "statusCode" in error) {
    result.code = Number(error.statusCode);
  }
  if (result.code == 401) {
    logout().then(() => {
      setTimeout(() => {
        (window.location as any) = "/auth/login";
      }, 1000);
    });
  }
  if (isPopup && result.isAbort == false) {
    console.log(`RESEE`, result);
    console.log(`%c [ERROR] : ${result.message}`);
    toast.error(result.message);
  }
  return result;
};

type DateFormatOptions = {
  withDate?: boolean;
  withTime?: boolean;
};

export const displayDate = (
  date: any,
  format = "DD/MM/YYYY HH:mm",
  withFormat = true
) => {
  if (!date) return "-";
  let a = date;
  if (!(date instanceof Date)) {
    a = new Date(date);
  }
  let time = a.getTime();
  if (withFormat) {
    return dayjs(time).format(format);
  }
  return new Date(time).toString();
};

export const fomatDate = (date: Date, options: DateFormatOptions = {}) => {
  const { withDate = true, withTime = true } = options;

  let formatString = "";

  if (withDate) {
    formatString += "YYYY-MM-DD ";
  }

  if (withTime) {
    formatString += "HH:mm:ss";
  }

  if (!withDate && !withTime) {
    formatString = "HH:mm:ss";
  }
  return dayjs(date).format(formatString);
};

export const ITEM_PER_PAGE = 10;

export type MethodProps = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type FetchBackendProps = {
  url: string;
  method: MethodProps;
  body?: any;
  signal?: AbortSignal;
};
/**
 * T is an return types
 * U body
 */
export const fetchBackend = async <T>({
  url,
  method,
  body,
  signal,
}: FetchBackendProps): Promise<T | null> => {
  try {
    const response = await fetch(`/api/ai-backend`, {
      headers: {
        "Content-Type": "application/json",
      },
      signal: signal,
      method: "POST",
      body: JSON.stringify(
        removeUndefinedValues({
          method,
          body: {
            url,
            payload: body,
          },
        })
      ),
    });
    const result: T = await response.json();
    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Failed to fetch");
    }
    return result;
  } catch (e) {
    handleError(e);
  }
  return null;
};

export async function delay(time = 5000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("== reload ==");
      resolve(true);
    }, time);
  });
}

export function capitalize(str: string): string {
  if ((str ?? "").length === 0) {
    return str; // Return the original string if it's empty
  }

  // Capitalize the first letter and concatenate with the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
}

export const countEmptyValues = <T>(obj: T) => {
  let count = 0;

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      // Check for different types of 'empty' values
      if (
        value === null || // checks for null
        value === undefined || // checks for undefined
        value === "" || // checks for empty string
        (Array.isArray(value) && value.length === 0) || // checks for empty array
        (value.constructor === Object && Object.keys(value).length === 0) // checks for empty object
      ) {
        count++;
      }
    }
  }

  return count;
};
