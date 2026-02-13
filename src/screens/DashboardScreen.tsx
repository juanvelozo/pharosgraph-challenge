import PoliticalAdDashboard from "../features/PoliticalAdDashboard/PoliticalAdDashboard.tsx";

/**
 * Generic dashboard screen. Doesn't know the content — just renders the feature.
 * Later: could render different features based on route.
 */
function DashboardScreen() {
  return (
    <div className="dashboard-screen min-h-screen w-full">
      <PoliticalAdDashboard />
    </div>
  );
}

export default DashboardScreen;
