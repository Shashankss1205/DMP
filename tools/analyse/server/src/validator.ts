import Ajv from "ajv";
import type { AnalysisResult } from "./types";
import schema from "../schema.json";

export class ValidationService {
  private ajv: Ajv;
  private validate: any;

  constructor() {
    this.ajv = new Ajv({ allErrors: true });
    this.validate = this.ajv.compile(schema);
  }

  validateAnalysisResult(data: any): { valid: boolean; errors: string[] } {
    const valid = this.validate(data);
    const errors: string[] = [];

    if (!valid && this.validate.errors) {
      for (const error of this.validate.errors) {
        const path = error.instancePath || "root";
        const message = error.message || "validation error";
        errors.push(`${path}: ${message}`);
      }
    }

    return { valid, errors };
  }

  sanitizeAnalysisResult(data: any): AnalysisResult {
    // Ensure required fields exist with default values
    const sanitized: AnalysisResult = {
      characters: {
        primary: Array.isArray(data.characters?.primary)
          ? data.characters.primary
          : [""],
        secondary: Array.isArray(data.characters?.secondary)
          ? data.characters.secondary
          : [],
      },
      settings: {
        primary: Array.isArray(data.settings?.primary)
          ? data.settings.primary
          : [""],
        secondary: Array.isArray(data.settings?.secondary)
          ? data.settings.secondary
          : [],
      },
      themes: {
        primary: Array.isArray(data.themes?.primary)
          ? data.themes.primary
          : [""],
        secondary: Array.isArray(data.themes?.secondary)
          ? data.themes.secondary
          : [],
      },
      events: {
        primary: Array.isArray(data.events?.primary)
          ? data.events.primary
          : [""],
        secondary: Array.isArray(data.events?.secondary)
          ? data.events.secondary
          : [],
      },
      emotions: {
        primary: Array.isArray(data.emotions?.primary)
          ? data.emotions.primary
          : [""],
        secondary: Array.isArray(data.emotions?.secondary)
          ? data.emotions.secondary
          : [],
      },
      keywords: Array.isArray(data.keywords) ? data.keywords : [""],
    };

    // Add optional fields if they exist
    if (data.story_title && typeof data.story_title === "string") {
      sanitized.story_title = data.story_title;
    }
    if (data.level && typeof data.level === "string") {
      sanitized.level = data.level;
    }

    return sanitized;
  }
}
