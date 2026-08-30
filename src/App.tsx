import { useUpdateControls } from './store';
import AccordionKeyboard from './components/AccordionKeyboard';
import ControlPanel from './components/ControlPanel';
import SheetMusicDisplay from './components/SheetMusicDisplay';
import {Button} from "@/components/ui/button"

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

  return (
  <>  
    <ControlPanel>        
    </ControlPanel>    
    <main>
      <div className="row content-display-wrapper">        
        <div className="col keyboard-display-container p-4">
          <div>
            <Button 
              onClick={()=>updateBellowsOut(!bellowsOut)}
              className="bg-blue-50 border-blue-100 border-2 hover:bg-blue-200 hover:border-blue-300 text-black"
              >
              Bellows: {`${bellowsOut?'out':'in'}`}
              </Button>
          </div>
          <AccordionKeyboard bellowsOut={bellowsOut}></AccordionKeyboard>
        </div>
        <div className="col music-display-container p-4">
          <SheetMusicDisplay></SheetMusicDisplay>
        </div>
      </div>      
    </main>    
  </>)
  
}


export default App
