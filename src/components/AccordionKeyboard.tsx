import { useState } from 'react';
import { gcf_buttons } from './gcf_tuning'

import './accordionKeyboard.css'

type Note = {    
    id: string    
    row: number, 
    noteIn: number, 
    noteOut: number, 
    labelIn: string, 
    labelOut: string
}

type AccordionButtonProps = {
    noteData: Note;
    bellowsOut: boolean;
}
type AccordionKeyboardProps = {    
    bellowsOut: boolean;
}

function AccordionButton({noteData, bellowsOut}: AccordionButtonProps) {
  // Local state for visual feedback
  const [isPressed, setIsPressed] = useState(false);  

  const handlePress = () => {
    setIsPressed(true);
    // TODO: Trigger sound playback or MIDI event here using noteData.note
    console.log(`Playing note: ${noteData.noteIn}`);
    console.log(`Playing note: ${noteData.noteOut}`);
  };

  const handleRelease = () => {
    setIsPressed(false);
    // TODO: Stop sound playback here
  };

  return (
    <button
      onPointerDown={handlePress}
      onPointerUp={handleRelease}
      onPointerLeave={handleRelease} // Catch if the user drags their finger off the button
      className={`accordion-button ${(bellowsOut && isPressed)? "accordion-button-pressed accordion-button-out":""} ${(!bellowsOut && isPressed)? "accordion-button-pressed accordion-button-in":""}`}
    >      
      <span>{noteData.labelIn}</span>
      <div className="vertical-line"></div>
      <span>{noteData.labelOut}</span>          
    </button>
  );
}

function AccordionKeyboard({bellowsOut}: AccordionKeyboardProps) {
    const accordionNotes: Note[] = gcf_buttons;    

    return (
    <>      
      <div className="accordion-keyboard">
        <div className="accordion-row">
          {accordionNotes.filter((elm)=>elm.row == 1).map((note) => (
            <AccordionButton key={note.id} noteData={note} bellowsOut={bellowsOut}/>
          ))}
        </div>
        <div className="accordion-row">
          {accordionNotes.filter((elm)=>elm.row == 2).map((note) => (
            <AccordionButton key={note.id} noteData={note} bellowsOut={bellowsOut} />
          ))}
        </div>
        <div className="accordion-row">
          {accordionNotes.filter((elm)=>elm.row == 3).map((note) => (
            <AccordionButton key={note.id} noteData={note} bellowsOut={bellowsOut}/>
          ))}
        </div>        
      </div>      
    </>    
    )
}

export default AccordionKeyboard
