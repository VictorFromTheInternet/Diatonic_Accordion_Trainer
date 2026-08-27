import {create} from 'zustand';


type CounterStore = {
    count: number,
    increment: ()=>void,
    decrement: ()=>void
}

// This is a custom hook for updating the value/state 
// of a variable with global context as defined by
// Zustand, as a result the naming convention will be 
// 'use___'
export const useUpdateCount = create<CounterStore>((set)=>({
    count: 0,
    increment: ()=>{
        set((state)=>({count: state.count + 1}))
    },
    decrement: ()=>{
        set((state)=>({count: state.count - 1}))
    }
}));

