const featureVocabulary = [
  "react",
  "javascript",
  "typescript",
  "node.js",
  "express",
  "mongodb",
  "python",
  "sql",
  "tailwind",
  "aws",
  "docker",
  "nlp",
  "openai",
  "api",
  "css",
];

const toVector = (skills) =>
  featureVocabulary.map((skill) => (skills.includes(skill) ? 1 : 0));

const dot = (a, b) => a.reduce((sum, value, index) => sum + value * b[index], 0);
const magnitude = (vector) => Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0)) || 1;

const cosineSimilarity = (a, b) => dot(a, b) / (magnitude(a) * magnitude(b));

const linearRegressionScore = (resumeSkills, jobSkills, resumeScore) => {
  const overlap = jobSkills.filter((skill) => resumeSkills.includes(skill)).length;
  const intercept = 18;
  const overlapWeight = 11;
  const resumeWeight = 0.42;
  return Math.min(100, Math.round(intercept + overlap * overlapWeight + resumeScore * resumeWeight));
};

const assignCluster = (skills) => {
  const vector = toVector(skills);
  const frontendCentroid = toVector(["react", "javascript", "css", "tailwind", "api"]);
  const backendCentroid = toVector(["node.js", "express", "mongodb", "aws", "docker"]);
  const dataCentroid = toVector(["python", "sql", "nlp", "openai", "api"]);

  const sims = [
    cosineSimilarity(vector, frontendCentroid),
    cosineSimilarity(vector, backendCentroid),
    cosineSimilarity(vector, dataCentroid),
  ];

  return sims.indexOf(Math.max(...sims));
};

export const buildRecommendations = (resume, jobs) => {
  const resumeSkills = resume.keywords || [];
  const resumeVector = toVector(resumeSkills);
  const resumeCluster = assignCluster(resumeSkills);

  const recommendations = jobs.map((job) => {
    const jobVector = toVector(job.skills);
    const similarity = cosineSimilarity(resumeVector, jobVector);
    const suitabilityScore = linearRegressionScore(resumeSkills, job.skills, resume.score || 0);
    const cluster = assignCluster(job.skills);
    const matchPercentage = Math.min(
      99,
      Math.round(similarity * 55 + suitabilityScore * 0.45 + (cluster === resumeCluster ? 8 : 0))
    );

    return {
      ...job.toObject(),
      cluster,
      suitabilityScore,
      matchPercentage,
      sharedSkills: job.skills.filter((skill) => resumeSkills.includes(skill)),
    };
  });

  return {
    resumeCluster,
    recommendations: recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage),
  };
};

