import { ApiError } from "../utils/ApiError.js";

/** Validate `req.body | req.query | req.params` against a Joi schema. */
export const validate =
  (schema, source = "body") =>
  (req, _res, next) => {
    const { value, error } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });
    if (error) {
      return next(
        new ApiError(
          400,
          "Validation failed",
          error.details.map((d) => ({
            path: d.path.join("."),
            message: d.message,
          }))
        )
      );
    }
    // In Express 5, req.query is a getter-only property — we can't reassign it.
    // Mutate in place for query/params/body, falling back to defineProperty for query.
    if (source === "query") {
      try {
        Object.defineProperty(req, "query", {
          value,
          writable: true,
          configurable: true,
          enumerable: true,
        });
      } catch {
        // last resort: clear and copy keys onto the existing object
        const current = req.query;
        for (const k of Object.keys(current)) delete current[k];
        Object.assign(current, value);
      }
    } else {
      req[source] = value;
    }
    next();
  };
