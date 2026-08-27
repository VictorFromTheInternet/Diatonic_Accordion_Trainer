import { useUpdateControls } from './store';
import AccordionKeyboard from './components/AccordionKeyboard';
import ControlPanel from './components/ControlPanel';
import SheetMusicDisplay from './components/SheetMusicDisplay';
import './App.css';

function App() {
  // initiating a global variable
  const isPlaying = useUpdateControls((state)=>state.isPlaying);
  const tempo = useUpdateControls((state)=>state.tempo);
  const tuning = useUpdateControls((state)=>state.tuning);

  return <>
    <nav>
      <ControlPanel></ControlPanel>
    </nav>    
    <main>
      <div className="row content-display-wrapper">
        <div className="col keyboard-display-container"><AccordionKeyboard></AccordionKeyboard></div>
        <div className="col music-display-container"><SheetMusicDisplay></SheetMusicDisplay></div>
      </div>      
    </main>    
  </>;
  
}


export default App
