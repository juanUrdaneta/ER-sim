import React, { useState } from 'react';
import BiHeap from './Components/BiHeap';
import PriorityQueue, { PQ_Node_json } from './function/DS_PriorityQueue_BiHeap';

import './App.scss';

const INTERVAL_DURATION = 800;

const priQueue = new PriorityQueue();


const App: React.FC = () => {

  const [queue, setQueue] = useState<Array<PQ_Node_json>>(priQueue.toArray());

  const handleInsert = (node: PQ_Node_json): Function | any => {
    let {stop} = priQueue.insertWB(node.val,node.priority);
    setQueue(priQueue.toArray());
    setTimeout(() => {
      if(!stop) return handleInsert(node);
    }, INTERVAL_DURATION);
  }
  const handleExtract = () => {
    let {stop} = priQueue.extractMaxWB();
    setQueue(priQueue.toArray());
    setTimeout(() => {
      if(!stop) return handleExtract();
    }, INTERVAL_DURATION);
  }

  return (
    <div className="container">
      <BiHeap list={queue} />
      <div className="lala" >
        <button onClick={()=>handleInsert({val:'uno'   ,priority:1})}>INSERT 1</button>
        <button onClick={()=>handleInsert({val:'dos'   ,priority:2})}>INSERT 2</button>
        <button onClick={()=>handleInsert({val:'tres'  ,priority:3})}>INSERT 3</button>
        <button onClick={()=>handleInsert({val:'cuatro',priority:4})}>INSERT 4</button>
        <button onClick={()=>handleInsert({val:'cinco' ,priority:5})}>INSERT 5</button>
        <button onClick={()=>handleExtract()}>Extract</button>
      </div>
    </div>
  );
}

export default App;