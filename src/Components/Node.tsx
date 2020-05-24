import React, { useRef, useMemo, useState, useEffect } from 'react';
import { PQ_Node_json } from '../function/DS_PriorityQueue_BiHeap';

const CSS_CLASSES = {
    MAIN: 'BiHeap__Node',
    ANIM_SHOW : 'BiHeap__Node--show',
    ANIM_HIDE : 'BiHeap__Node--hide',
    STAT_VISIBLE : 'BiHeap__Node--visible',
    STAT_HIDDEN: 'BiHeap__Node--hidden',
}

interface NodeProps {
    data: PQ_Node_json | undefined;
    row: number;
}

const Node: React.FC<NodeProps> = ({data, row}) => {

    const node = useMemo(()=>data!==undefined ? data : {val:-1,priority:0},[data]);
    
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
            className={`${CSS_CLASSES.MAIN} ${currentAnim} ${showStatus}`}>
            {data ? data.priority : ''}
        </div>
    )
}

export default Node;    