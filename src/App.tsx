import { MainLayout } from './layouts/MainLayout';
import { GanttChart } from './features/gantt/GanttChart';

function App() {
  return (
    <MainLayout>
      <GanttChart />
    </MainLayout>
  );
}

export default App;
