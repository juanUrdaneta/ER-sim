import React, { useState } from 'react';
import BiHeap from './Components/BiHeap';
import Modal from './Components/Modal';
import PriorityQueue, { PQ_Node_json } from './function/DS_PriorityQueue_BiHeap';

import './App.scss';

const INTERVAL_DURATION = 1200;

const DEFAULT_NODES = {
  NODE_1: {val:'uno'   ,priority:1},
  NODE_2: {val:'dos'   ,priority:2},
  NODE_3: {val:'tres'  ,priority:3},
  NODE_4: {val:'cuatro',priority:4},
  NODE_5: {val:'cinco' ,priority:5},
}

const priQueue = new PriorityQueue();

const App: React.FC = () => {

  const [queue, setQueue] = useState<Array<PQ_Node_json>>(priQueue.toArray());
  const [enabled, setenabled] = useState(true)

  const handleInsert = (node: PQ_Node_json) => {
    setenabled(false);
    let {stop} = priQueue.insertWB(node.val,node.priority);
    setQueue(priQueue.toArray());
    setTimeout(() => {
      if(!stop) return handleInsert(node);
    }, INTERVAL_DURATION);
    if (stop) {setenabled(true)}
  }

  const handleExtract = () => {
    setenabled(false)
    let {stop} = priQueue.extractMaxWB();
    setQueue(priQueue.toArray());
    setTimeout(() => {
      if(!stop) return handleExtract();
    }, INTERVAL_DURATION);
    if (stop) {setenabled(true)}
  }

  return (
    <div className="container">
      
      <Modal toggleModal={true}/>
      <BiHeap list={queue} />
      <div className="action-menu" >
        <div 
          className={`action-menu__button ${!enabled ? 'action-menu__button--disabled' : ''}`} 
          onClick={()=>handleInsert(DEFAULT_NODES.NODE_1)}>
            INSERT 1
        </div>
        <div 
          className={`action-menu__button ${!enabled ? 'action-menu__button--disabled' : ''}`} 
          onClick={()=>handleInsert(DEFAULT_NODES.NODE_2)}>
            INSERT 2
        </div>
        <div 
          className={`action-menu__button ${!enabled ? 'action-menu__button--disabled' : ''}`} 
          onClick={()=>handleInsert(DEFAULT_NODES.NODE_3)}>
            INSERT 3
        </div>
        <div 
          className={`action-menu__button ${!enabled ? 'action-menu__button--disabled' : ''}`} 
          onClick={()=>handleInsert(DEFAULT_NODES.NODE_4)}>
            INSERT 4
        </div>
        <div 
          className={`action-menu__button ${!enabled ? 'action-menu__button--disabled' : ''}`} 
          onClick={()=>handleInsert(DEFAULT_NODES.NODE_5)}>
            INSERT 5
        </div>
        <div 
          className={`action-menu__button ${!enabled ? 'action-menu__button--disabled' : ''}`} 
          onClick={()=>handleExtract()}>Extract
        </div>
      
      </div>
    </div>
  )
  
}

export default App;