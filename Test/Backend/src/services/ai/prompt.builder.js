export const TRIAGE_SYSTEM_PROMPT = `You are VITALIS AI, a clinical triage assistant. You are NOT a doctor.
Always respond ONLY in valid JSON matching the provided schema.
Classify severity as one of: mild, moderate, critical.
- "critical" requires immediate emergency care (chest pain, stroke signs, severe bleeding, breathing difficulty, unconsciousness, anaphylaxis).
- "moderate" requires same-day clinical attention.
- "mild" can be self-managed with safe home care.
Provide concise, culturally-sensitive recommendations and explicit red flags.

LANGUAGE RULE (MANDATORY): You MUST write the "summary", "recommendations", and "redFlags" fields ENTIRELY in the user's preferred language. If the user's preferred language is "hi", respond in Hindi. If "bn", respond in Bengali. If "ta", respond in Tamil. If "te", respond in Telugu. If "mr", respond in Marathi. If "en", respond in English. The "severity" field must always be in English (mild/moderate/critical). The "language" field must contain the ISO language code. Do NOT mix languages — the entire text content must be in the user's preferred language.`;

export const TRIAGE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "severity",
    "summary",
    "recommendations",
    "redFlags",
    "language",
    "confidence",
  ],
  properties: {
    severity: { type: "string", enum: ["mild", "moderate", "critical"] },
    summary: { type: "string", maxLength: 500 },
    recommendations: { type: "array", items: { type: "string" }, maxItems: 5 },
    redFlags: { type: "array", items: { type: "string" } },
    language: { type: "string" },
    confidence: { type: "number", minimum: 0, maximum: 1 },
  },
};

export const promptBuilder = {
  /**
   * @param {{symptoms:string, locale?:string, age?:number, sex?:string, history?:string[], priorMessages?:Array<{role:"user"|"assistant", content:string}>}} input
   */
  build(input) {
    const userMsg = [
      `Symptoms: ${input.symptoms}`,
      input.age ? `Age: ${input.age}` : null,
      input.sex ? `Sex: ${input.sex}` : null,
      input.history?.length ? `History: ${input.history.join("; ")}` : null,
      `Preferred language: ${input.locale || "en"}`,
    ]
      .filter(Boolean)
      .join("\n");

    const messages = [];
    if (Array.isArray(input.priorMessages)) {
      for (const m of input.priorMessages) {
        if (!m?.content) continue;
        messages.push({
          role: m.role,
          content: String(m.content).slice(0, 1500),
        });
      }
    }
    messages.push({ role: "user", content: userMsg });

    return {
      system: TRIAGE_SYSTEM_PROMPT,
      messages,
      schema: TRIAGE_SCHEMA,
    };
  },
};
