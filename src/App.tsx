import React, { useState } from 'react';
import BiHeap from './Components/BiHeap'

import PriorityQueue, { PQ_Node_json } from './function/DS_PriorityQueue_BiHeap'

import './App.scss';

// const list  = [1,2,3,4,5,6,7,8];
// const listB = [2,4,3,8,5,6,7];
// const listC = [3,4,6,8,5,7];
// const listD = [4,5,6,8,7];
// const listE = [5,7,6,8];
// const listF = [6,7,8];
// const listG = [7,8];
// const listH = [8];

// const priorityQueue = new PriorityQueue();

// priorityQueue.insert("uno",3);
// priorityQueue.insert("dos",1);
// priorityQueue.insert("tres",2);
// priorityQueue.print();
// console.log(priorityQueue.toArray());
// priorityQueue.insert("cuatro",5);
// priorityQueue.insert("cinco",4);
// priorityQueue.print();
// console.log(priorityQueue.toArray());

// priorityQueue.print();

// type State = {
//   readonly queue: PriorityQueue;
// }

// type Insert = {
//   readonly type:"Insert",
//   readonly val: string,
//   readonly priority: number,
// }

// type Extract = {
//   readonly type:"Extract";
// }

// type Actions = Insert | Extract ;

// const reducer = (state: State, action: Actions): State => {
//   switch(action.type){
//     case 'Insert':
//       return {queue: state.queue.insert(action.val, action.priority)};
//     case 'Extract':
//       return state;
//     default:
//       reachedNever(action);
//       return state;
//   }
// }

// function reachedNever (never: never) {}

const priQueue = new PriorityQueue();

const App: React.FC = () => {
  
  const [queue, setQueue] = useState<Array<PQ_Node_json>>([]);
  // const [state, dispatch] = useReducer<React.Reducer<State,Actions>>(reducer, {queue: new PriorityQueue()} );
  
  // const [pq, pqDo] = useState(new PriorityQueue());

  const handleInsert = (node: PQ_Node_json) => {
    priQueue.insert(node.val,node.priority);
    setQueue(priQueue.toArray());
  }
  const handleExtract = () => {
    priQueue.extractMax();
    console.log(priQueue.toArray())
    setQueue(priQueue.toArray());
  }

  return (
    <div className="container">
      <BiHeap list={queue} />
      <div className="lala">
        {/* <button onClick={()=>setToSend(list)} >LIST A</button>
        <button onClick={()=>setToSend(listB)}>LIST B</button>
        <button onClick={()=>setToSend(listC)}>LIST C</button>
        <button onClick={()=>setToSend(listD)}>LIST D</button>
        <button onClick={()=>setToSend(listE)}>LIST E</button>
        <button onClick={()=>setToSend(listF)}>LIST F</button>  
        <button onClick={()=>setToSend(listG)}>LIST G</button>
        <button onClick={()=>setToSend(listH)}>LIST H</button> */}

        <button onClick={()=>handleInsert({val:'uno'   ,priority:1})}>INSERT 1</button>
        <button onClick={()=>handleInsert({val:'dos'   ,priority:2})}>INSERT 2</button>
        <button onClick={()=>handleInsert({val:'tres'  ,priority:3})}>INSERT 3</button>
        <button onClick={()=>handleInsert({val:'cuatro',priority:4})}>INSERT 4</button>
        <button onClick={()=>handleInsert({val:'cinco' ,priority:5})}>INSERT 5</button>
        <button onClick={()=>handleExtract()}>Extract</button>
        {/* <button onClick={()=>console.log(priQueue.toArray())}>LOG</button> */}
      </div>
    </div>
  );
}

export default App;
