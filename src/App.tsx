import React, { useState } from 'react';
import BiHeap from './Components/BiHeap'

import PriorityQueue, { PQ_Node_json } from './function/DS_PriorityQueue_BiHeap'

import './App.scss';

const priQueue = new PriorityQueue();

const App: React.FC = () => {
  
  const [queue, setQueue] = useState<Array<PQ_Node_json>>([]);

  const handleInsert = (node: PQ_Node_json) => {
    priQueue.insert(node.val,node.priority);
    setQueue(priQueue.toArray());
  }
  const handleExtract = () => {
    priQueue.extractMax();
    setQueue(priQueue.toArray());
  }

  return (
    <div className="container">
      <BiHeap list={queue} />
      <div className="lala">

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
