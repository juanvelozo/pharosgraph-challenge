import DashboardScreen from "./screens/DashboardScreen.tsx";
import Card from "./components/ui/Card/Card.tsx";
import ThemeToggle from "./components/ui/ThemeToggle";

/**
 * App shell. Minimal layout wrapper, ready for future router.
 */
function App() {
  return (
    <div className="app-shell min-h-screen bg-gray-200 dark:bg-gray-900">
      <header className="flex items-center justify-between px-10 py-5 bg-white dark:bg-gray-800 rounded-b-3xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Political Ad Scores Dashboard
        </h1>
        <ThemeToggle />
      </header>
      <DashboardScreen />
      <Card title="Pharosgraph Challenge" animationDelay={0}>
        <p className="text-gray-600 dark:text-gray-400">This is a challenge to build a dashboard for a political ad analysis for the FrontEnd position at Pharosgraph.</p>
      </Card>
    </div>
  );
}

export default App;
