import React from 'react'
import { useUpdateControls } from '../store';
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import './ControlPanel.css'

function ControlPanel() {
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
      <div className="flex justify-center align-center">
        <nav className="flex items-center ml-2 mr-2 gap-2">
          <Button 
            onClick={()=>updateIsPlaying(!isPlaying)}
            className="bg-blue-50 border-blue-100 border-2 hover:bg-blue-200 hover:border-blue-300 text-black"
            >
              {isPlaying?"Pause ⏸️":"Play ▶️"}
              </Button>
          <div className="flex flex-row justify-center items-center">
            <Input 
              type="number" 
              value={tempo} 
              onChange={(e)=>updateTempo(Number.parseInt(e.target.value))}
              className="hide-stepper max-w-20 bg-blue-50 border-blue-100 border-2 hover:bg-blue-200 hover:border-blue-300 rounded-r-none"
              >
              </Input>
            <div className="flex flex-col">
              <Button 
                className="text-white bg-blue-500 hover:bg-blue-200  w-8 p-1 h-4 rounded-l-none rounded-br-xs"
                onClick={()=>updateTempo(tempo+1)}
                >
                  +
                  </Button>
              <Button 
                className="text-white bg-blue-500 hover:bg-blue-200  w-8 p-1 h-4 rounded-l-none rounded-tr-xs"
                onClick={()=>updateTempo(tempo-1)}
                >
                  -
                  </Button>
            </div>
          </div>          
          <DropdownMenu>
            <DropdownMenuTrigger 
              render={
                <Button 
                  variant="outline"
                  className="bg-blue-50 border-blue-100 border-2 hover:bg-blue-200 hover:border-blue-300"
                  >
                    Select Tuning: {tuning} 🔽
                </Button> } />
            <DropdownMenuContent className="w-40 " align="start">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Keys:</DropdownMenuLabel>
                <DropdownMenuItem onClick={()=>updateTuning("Sol")}>
                  GCF / Sol                  
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>updateTuning("Fa")}>
                  FB♭E♭ / Fa                  
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>updateTuning("Mi")}>
                  EAD / Mi
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>                
          </DropdownMenu>
        </nav>
      </div>      
    </>
  )
}

export default ControlPanel
