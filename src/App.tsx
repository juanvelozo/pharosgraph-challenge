import DashboardScreen from "./screens/DashboardScreen.tsx";
import Card from "./components/ui/Card/Card.tsx";

/**
 * App shell. Minimal layout wrapper, ready for future router.
 */
function App() {
  return (
    <div className="app-shell min-h-screen bg-gray-200 dark:bg-gray-900">
      <DashboardScreen />
      <Card
        title="Pharosgraph Challenge"
      >
        <p>This is a challenge to build a dashboard for a political ad analysis for the FrontEnd position at Pharosgraph.</p>
      </Card>
    </div>
  );
}

export default App;
