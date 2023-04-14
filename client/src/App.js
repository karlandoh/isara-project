import Loads from './components/LoadsTable'
import ScheduleTable from './components/ScheduleTable'
import { BusinessRules } from './components/BusinessRules'
import Buttons from './components/Buttons'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  half: {
    width: '50%',
  },
};

function App() {
  return (
    <div>
      <h1>Schedule</h1>
      <ScheduleTable />
      <Buttons />
      <div style={styles.container}>
        <div style={styles.half}>
          <h1>Load</h1>
          <Loads />
        </div>
        <div style={styles.half}>
          <h1>Warnings</h1>
          <BusinessRules />
        </div>
      </div>
    </div>
  );
}

export default App;