/** Analysis domain types. No `any` — strict typing throughout. */

export type FlagType = "risk" | "opportunity";

export type FlagSeverity = "high" | "medium" | "low";

export interface TextSpan {
  start: number;
  end: number;
}

export interface Flag {
  type: FlagType;
  severity: FlagSeverity;
  category: string;
  title: string;
  description: string;
  text_span: TextSpan;
  suggestion: string;
}

export interface Dimension {
  name: string;
  score: number;
  description: string;
}

export interface Analysis {
  id: string;
  ad_text: string;
  overall_score: number;
  dimensions: Dimension[];
  flags: Flag[];
}

export interface AnalysisDataPayload {
  analysis: Analysis;
}
