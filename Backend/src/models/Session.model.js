import mongoose from "mongoose";

/**
 * METADATA ONLY. No message bodies, no prompts, no AI responses are stored here.
 * `_id` is a client-generated UUID so devices can sync without round-trips.
 */
const sessionSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // client UUID
    userId: { type: String, required: true, index: true },
    deviceIds: { type: [String], default: [] },
    severity: {
      type: String,
      enum: ["mild", "moderate", "critical", null],
      default: null,
    },
    summaryHash: String,
    lastActiveAt: { type: Date, default: Date.now, index: true },
    metadata: {
      msgCount: { type: Number, default: 0 },
      locale: String,
      modelVersion: String,
    },
    version: { type: Number, default: 1 }, // for optimistic concurrency
  },
  { timestamps: true, _id: false }
);

sessionSchema.index({ userId: 1, lastActiveAt: -1 });

export const SessionModel = mongoose.model("Session", sessionSchema);
