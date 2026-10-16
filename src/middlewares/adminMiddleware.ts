import type { RequestHandler } from "express";

const adminMiddleware: RequestHandler = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication Required",
    });
    return;
  }

  if (req.user.role !== "admin") {
    res.status(403).json({
      success: false,
      message: "Admin access required",
    });
    return;
  }

  next();
};

export default adminMiddleware;
