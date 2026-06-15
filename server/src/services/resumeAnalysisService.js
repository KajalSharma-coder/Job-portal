import pdf from "pdf-parse";
import mammoth from "mammoth";

const commonSkills = [
  "react",
  "javascript",
  "typescript",
  "node.js",
  "express",
  "mongodb",
  "python",
  "sql",
  "tailwind",
  "html",
  "css",
  "aws",
  "docker",
  "git",
  "rest",
  "api",
  "machine learning",
  "nlp",
  "openai",
  "data analysis",
];

const impactfulWords = ["led", "built", "optimized", "designed", "delivered", "increased", "reduced", "launched"];

export const extractTextFromFile = async (file) => {
  if (file.mimetype === "application/pdf") {
    const parsed = await pdf(file.buffer);
    return parsed.text;
  }

  if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const parsed = await mammoth.extractRawText({ buffer: file.buffer });
    return parsed.value;
  }

  return file.buffer.toString("utf-8");
};

export const analyzeResumeText = async (text) => {
  const normalized = text.toLowerCase();
  const keywords = commonSkills.filter((skill) => normalized.includes(skill));
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const impactCount = impactfulWords.filter((word) => normalized.includes(word)).length;
  const hasProjects = normalized.includes("project");
  const hasEducation = normalized.includes("education");
  const hasExperience = normalized.includes("experience");
  const hasMetrics = /\b\d+%|\b\d+\+|\b\d+\s*(users|clients|projects|apis)/i.test(text);

  const ats = Math.min(100, 40 + keywords.length * 4 + (hasProjects ? 8 : 0) + (hasEducation ? 5 : 0));
  const content = Math.min(100, 35 + Math.min(wordCount / 12, 30) + (hasExperience ? 10 : 0));
  const impact = Math.min(100, 30 + impactCount * 10 + (hasMetrics ? 20 : 0));
  const formatting = Math.min(100, 55 + (text.includes("\n") ? 15 : 0) + (wordCount > 250 ? 10 : 0));

  const score = Math.round((ats * 0.3 + content * 0.25 + impact * 0.25 + formatting * 0.2));

  const strengths = [];
  const weaknesses = [];
  const suggestions = [];

  if (keywords.length >= 5) strengths.push("Strong technical keyword coverage for ATS screening.");
  else weaknesses.push("Technical keyword coverage is limited for target roles.");

  if (hasMetrics) strengths.push("Resume uses measurable impact statements.");
  else weaknesses.push("Impact statements could use more measurable outcomes.");

  if (hasProjects) strengths.push("Projects section helps demonstrate practical experience.");
  else suggestions.push("Add a projects section with stack, outcomes, and links.");

  if (!hasExperience) suggestions.push("Highlight internships, freelance work, or hands-on experience.");
  if (!hasEducation) suggestions.push("Include an education section with degree, institution, and dates.");
  if (wordCount < 220) suggestions.push("Expand content with relevant achievements, skills, and project depth.");
  if (impactCount < 2) suggestions.push("Use stronger action verbs such as built, optimized, or delivered.");

  const missingKeywords = commonSkills.filter((skill) => !keywords.includes(skill)).slice(0, 8);

  const skillDistribution = keywords.slice(0, 6).map((skill, index) => ({
    name: skill,
    value: 20 - index * 2,
  }));

  return {
    score,
    strengths: strengths.length ? strengths : ["Resume has a solid baseline structure to build on."],
    weaknesses: weaknesses.length ? weaknesses : ["Resume can be improved further for stronger differentiation."],
    suggestions: suggestions.length ? suggestions : ["Tailor your summary and keywords for each role you apply to."],
    keywords,
    matchedKeywords: keywords,
    missingKeywords,
    scoreBreakdown: {
      ats: Math.round(ats),
      content: Math.round(content),
      impact: Math.round(impact),
      formatting: Math.round(formatting),
    },
    skillDistribution,
  };
};

