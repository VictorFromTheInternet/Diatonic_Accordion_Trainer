import { useUpdateControls } from './store';
import AccordionKeyboard from './components/AccordionKeyboard';
import ControlPanel from './components/ControlPanel';
import SheetMusicDisplay from './components/SheetMusicDisplay';
import './App.css';

function App() {
  // initiating a global variable
  const isPlaying = useUpdateControls((state)=>state.isPlaying); // false
  const tempo = useUpdateControls((state)=>state.tempo); // 110
  const tuning = useUpdateControls((state)=>state.tuning); // GCF
  const bellowsOut = useUpdateControls((state)=>state.bellowsOut); // true

  // actions
  const updateIsPlaying = useUpdateControls((state)=> state.updateIsPlaying)
  const updateTempo = useUpdateControls((state)=> state.updateTempo) 
  const updateTuning = useUpdateControls((state)=> state.updateTuning)
  const updateBellowsOut = useUpdateControls((state)=> state.updateBellowsOut) 

  return <>
    <nav>
      <ControlPanel>        
      </ControlPanel>
    </nav>    
    <main>
      <div className="row content-display-wrapper">        
        <div className="col keyboard-display-container">
          <div>
            <button onClick={()=>updateBellowsOut(!bellowsOut)}>Bellows: {`${bellowsOut?'out':'in'}`}</button>
          </div>
          <AccordionKeyboard bellowsOut={bellowsOut}></AccordionKeyboard>
        </div>
        <div className="col music-display-container"><SheetMusicDisplay></SheetMusicDisplay></div>
      </div>      
    </main>    
  </>
  
}


export default App
