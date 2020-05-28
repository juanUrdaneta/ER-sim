import React, { useRef, useMemo, useState, useEffect } from 'react';
import { PQ_Node_json } from '../function/DS_PriorityQueue_BiHeap';

const CSS_CLASSES = {
    MAIN: 'BiHeap__Node',
    ANIM_SHOW : 'BiHeap__Node--show',
    ANIM_HIDE : 'BiHeap__Node--hide',
    STAT_VISIBLE : 'BiHeap__Node--visible',
    STAT_HIDDEN: 'BiHeap__Node--hidden',
    PRIO_ONE: 'BiHeap__Node--border-one',
    PRIO_TWO: 'BiHeap__Node--border-two',
    PRIO_THREE: 'BiHeap__Node--border-three',
    PRIO_FOUR: 'BiHeap__Node--border-four',
    PRIO_FIVE: 'BiHeap__Node--border-five',
}

function computePrio (pri: number | undefined) {
    switch(pri){
        case 1: return CSS_CLASSES.PRIO_ONE;
        case 2: return CSS_CLASSES.PRIO_TWO;
        case 3: return CSS_CLASSES.PRIO_THREE;
        case 4: return CSS_CLASSES.PRIO_FOUR;
        case 5: return CSS_CLASSES.PRIO_FIVE;
        default: return '';
    }
}

interface NodeProps {
    data: PQ_Node_json | undefined;
    row: number;
}

const Node: React.FC<NodeProps> = ({data, row}) => {

    const node = useMemo(()=> data!==undefined ? data : {val:-1,priority:0},[data]);
    
    const [currentAnim, setCurrentAnim] = useState<string>(CSS_CLASSES.ANIM_HIDE);
    const [showStatus,  setshowStatus]  = useState<string>(CSS_CLASSES.STAT_HIDDEN);

    const isFirstRun = useRef<boolean>(true);

    useEffect(()=> {
        if (isFirstRun.current) {
            if(node.priority){
                setshowStatus(CSS_CLASSES.STAT_VISIBLE);
                setTimeout(() => {
                    setCurrentAnim(CSS_CLASSES.ANIM_SHOW);
                }, 400)
                isFirstRun.current = false;
            }
        }else{
            setCurrentAnim(CSS_CLASSES.ANIM_HIDE);
            if(node.priority){
                setTimeout(() => {
                    setCurrentAnim(CSS_CLASSES.ANIM_SHOW)
                }, 400)
            }
        }
    },[node.priority]);

    return (
        <div 
            className={`${CSS_CLASSES.MAIN} ${currentAnim} ${showStatus} ${computePrio(data?.priority)}`}>
            {data ? data.priority : ''}
        </div>
    )
}

export default Node;    