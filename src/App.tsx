import { useUpdateCount } from './store'
import './App.css'

function App() {
  // initiating a global variable
  const count = useUpdateCount((state)=>state.count);

  return <ExampleComponent count={count}/>;
  
}

const ExampleComponent = ({count}:{count:number}) =>{
  const increment = useUpdateCount((state)=>state.increment);
  const decrement = useUpdateCount((state)=>state.decrement);

  return(
    <div>
      <div><button onClick={increment}>+</button></div>
      {count}
      <div><button onClick={decrement}>-</button></div>
    </div>
  )
};

export default App
