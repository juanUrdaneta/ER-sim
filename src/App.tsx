import React, { useState } from 'react';
import BiHeap from './Components/BiHeap';
import Modal from './Components/Modal';
import PriorityQueue, { PQ_Node_json } from './function/DS_PriorityQueue_BiHeap';

import './App.scss';
const INTERVAL_DURATION = 1200;

const DEFAULT_NODES = {
  NODE_1: {val:'Cardiac Arrest' ,priority:1},
  NODE_2: {val:'Asthma Attack' ,priority:2},
  NODE_3: {val:'Abdominal Pain' ,priority:3},
  NODE_4: {val:'Simple Laceration' ,priority:4},
  NODE_5: {val:'Rash' ,priority:5},
}

const priQueue = new PriorityQueue();

const App: React.FC = () => {

  const [queue, setQueue] = useState<Array<PQ_Node_json>>(priQueue.toArray());

  const [enabled, setenabled] = useState(true);
  const [isFirstRun, setisFirstRun] = useState(true);
  const [tutorialIsAt, settutorialIsAt] = useState<number>(0);

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
      
      <Modal isFirstRun={isFirstRun} setIsFirstRun={setisFirstRun} setTutorialIsAt={settutorialIsAt}/>
      <BiHeap list={queue} />
      <div className="action-menu" >
        <div 
          className={`
            action-menu__button 
            ${!enabled ? 'action-menu__button--disabled' : ''}
            ${tutorialIsAt === 3 ? 'action-menu__button--disabled' : ''}
            ${tutorialIsAt === 4 ? 'action-menu__button--tutorial-show-this':''}
            ${tutorialIsAt === 5 ? 'action-menu__button--disabled' : ''}`} 
          onClick={()=>handleInsert(DEFAULT_NODES.NODE_1)}>
            {DEFAULT_NODES.NODE_1.val}
        </div>
        <div 
          className={`
            action-menu__button 
            ${!enabled ? 'action-menu__button--disabled' : ''}
            ${tutorialIsAt === 3 ? 'action-menu__button--disabled' : ''}
            ${tutorialIsAt === 4 ? 'action-menu__button--tutorial-show-this':''}
            ${tutorialIsAt === 5 ? 'action-menu__button--disabled' : ''}`} 
          onClick={()=>handleInsert(DEFAULT_NODES.NODE_2)}>
            {DEFAULT_NODES.NODE_2.val}
        </div>
        <div 
          className={`
            action-menu__button 
            ${!enabled ? 'action-menu__button--disabled' : ''}
            ${tutorialIsAt === 3 ? 'action-menu__button--disabled' : ''}
            ${tutorialIsAt === 4 ? 'action-menu__button--tutorial-show-this':''}
            ${tutorialIsAt === 5 ? 'action-menu__button--disabled' : ''}`} 
          onClick={()=>handleInsert(DEFAULT_NODES.NODE_3)}>
            {DEFAULT_NODES.NODE_3.val}
        </div>
        <div 
          className={`
            action-menu__button 
            ${!enabled ? 'action-menu__button--disabled' : ''}
            ${tutorialIsAt === 3 ? 'action-menu__button--disabled' : ''}
            ${tutorialIsAt === 4 ? 'action-menu__button--tutorial-show-this':''}
            ${tutorialIsAt === 5 ? 'action-menu__button--disabled' : ''}`} 
          onClick={()=>handleInsert(DEFAULT_NODES.NODE_4)}>
            {DEFAULT_NODES.NODE_4.val}
        </div>
        <div 
          className={`
            action-menu__button 
            ${!enabled ? 'action-menu__button--disabled' : ''}
            ${tutorialIsAt === 3 ? 'action-menu__button--disabled' : ''}
            ${tutorialIsAt === 4 ? 'action-menu__button--tutorial-show-this':''}
            ${tutorialIsAt === 5 ? 'action-menu__button--disabled' : ''}`} 
          onClick={()=>handleInsert(DEFAULT_NODES.NODE_5)}>
            {DEFAULT_NODES.NODE_5.val}
        </div>
        <div 
          className={`
            action-menu__button 
            ${!enabled ? 'action-menu__button--disabled' : ''}
            ${tutorialIsAt === 3 ? 'action-menu__button--disabled' : ''}
            ${tutorialIsAt === 4 ? 'action-menu__button--disabled' : ''}
            ${tutorialIsAt === 5 ? 'action-menu__button--tutorial-show-this' : ''}`} 
          onClick={()=>handleExtract()}>Extract
        </div>
      
      </div>
    </div>
  )
  
}

export default App;