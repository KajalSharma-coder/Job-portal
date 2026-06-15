import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import JobCard from "../components/JobCard";
import Loader from "../components/Loader";
import SectionCard from "../components/SectionCard";
import Topbar from "../components/Topbar";
import api from "../services/api";

const clusterLabels = ["Frontend", "Backend", "Data / AI"];

const JobRecommendations = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const { data } = await api.get("/jobs/recommendations/mine");
        setData(data);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <Loader label="Matching you with the best-fit jobs..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Topbar
        title="Job Recommendations"
        subtitle={`Your current resume is grouped into the ${clusterLabels[data?.resumeCluster || 0]} cluster.`}
      />
      <SectionCard title="Recommended Roles" subtitle="Sorted by match percentage, shared skills, and predicted suitability.">
        <div className="space-y-4">
          {data?.recommendations?.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </SectionCard>
    </DashboardLayout>
  );
};

export default JobRecommendations;

