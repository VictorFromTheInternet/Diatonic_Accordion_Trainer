import {create} from 'zustand';


type ControlState = {
    isPlaying: boolean;
    tempo: number;
    tuning: string;
    bellowsOut: boolean;
}

type ControlAction = {
    updateIsPlaying: (isPlaying: ControlState['isPlaying']) => void;
    updateTempo: (tempo: ControlState['tempo']) => void;
    updateTuning: (tuning: ControlState['tuning']) => void;
    updateBellowsOut: (bellowsOut: ControlState['bellowsOut']) => void;
}

export const useUpdateControls = create<ControlState & ControlAction>()((set) => ({
    // initial state
    isPlaying: false, 
    tempo: 110, 
    tuning: 'GCF', 
    bellowsOut: false, 

    // actions
    updateIsPlaying: (isPlaying) => set(() => ({ isPlaying: isPlaying })),
    updateTempo: (tempo) => set(() => ({ tempo: tempo })),
    updateTuning: (tuning) => set(() => ({ tuning: tuning })),
    updateBellowsOut: (bellowsOut) => set(() => ({ bellowsOut: bellowsOut })),
}));

