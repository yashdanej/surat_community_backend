import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('error from global error handlder', err);

  // Zod Validation Error
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  // Custom Errors
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Unknown Errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : undefined,
  });
};