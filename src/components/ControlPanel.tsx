import { useUpdateControls } from '../store';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import './ControlPanel.css'

function ControlPanel() {
  const isPlaying = useUpdateControls((state) => state.isPlaying)
  const tempo = useUpdateControls((state) => state.tempo)
  const tuning = useUpdateControls((state) => state.tuning)

  const updateIsPlaying = useUpdateControls((state) => state.updateIsPlaying)
  const updateTempo = useUpdateControls((state) => state.updateTempo)
  const updateTuning = useUpdateControls((state) => state.updateTuning)

  return (
    <>
      <nav className="flex justify-center align-center bg-blue-100">
        <div className="flex items-center ml-2 mr-2 gap-2">
          <Button
            onClick={() => updateIsPlaying(!isPlaying)}
            className="bg-blue-200 border-blue-300 border-2 hover:bg-blue-300 hover:border-blue-400 text-black"
          >
            {isPlaying ? 'Pause ⏸️' : 'Play ▶️'}
          </Button>

          <div className="flex flex-row justify-center items-center">
            <Input
              type="number"
              value={tempo}
              onChange={(e) => updateTempo(Number.parseInt(e.target.value, 10) || 0)}
              className="hide-stepper max-w-20 bg-blue-200 border-blue-300 border-2 hover:bg-blue-300 hover:border-blue-400 text-black rounded-r-none"
            />
            <div className="flex flex-col">
              <Button
                className="text-white bg-blue-500 hover:bg-blue-300 w-8 h-4 rounded-l-none rounded-br-xs"
                onClick={() => updateTempo(tempo + 1)}
              >
                <span>+</span>
              </Button>
              <Button
                className="text-white bg-blue-500 hover:bg-blue-300 w-8 h-4 rounded-l-none rounded-tr-xs"
                onClick={() => updateTempo(tempo - 1)}
              >
                <span>-</span>
              </Button>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="outline"
                className="bg-blue-200 border-blue-300 border-2 hover:bg-blue-300 hover:border-blue-400 text-black"
              >
                Select Tuning: {tuning} 🔽
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Keys:</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => updateTuning('Sol')}>
                  GCF / Sol
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateTuning('Fa')}>
                  FB♭E♭ / Fa
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateTuning('Mi')}>
                  EAD / Mi
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  )
}

export default ControlPanel
