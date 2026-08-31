import { useState } from 'react'
import AccordionKeyboard from './components/AccordionKeyboard';
import ControlPanel from './components/ControlPanel';
import SheetMusicDisplay from './components/SheetMusicDisplay';
import { Button } from '@/components/ui/button'

import './App.css';

function App() {
  const [bellowsOut, setBellowsOut] = useState(true)

  return (
    <>
      <ControlPanel />
      <main>
        <div className="row content-display-wrapper">
          <div className="flex items-center flex-col grow-0 keyboard-display-container p-4">
            <div>
              <Button
                onClick={() => setBellowsOut((value) => !value)}
                className="bg-blue-200 border-blue-300 border-2 hover:bg-blue-300 hover:border-blue-400 text-black"
              >
                Bellows: {bellowsOut ? 'out' : 'in'}
              </Button>
            </div>
            <AccordionKeyboard bellowsOut={bellowsOut} />
          </div>
          <div className="flex items-center flex-col grow music-display-container p-4">
            <SheetMusicDisplay />
          </div>
        </div>
      </main>
    </>
  )
}

export default App
