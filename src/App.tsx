import DashboardScreen from "./screens/DashboardScreen.tsx";

/**
 * App shell. Minimal layout wrapper, ready for future router.
 */
function App() {
  return (
    <div className="app-shell min-h-screen bg-gray-200 dark:bg-gray-900">
      <DashboardScreen />
    </div>
  );
}

export default App;
