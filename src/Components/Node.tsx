import React, { useRef, useMemo, useState, useEffect } from 'react';
import { PQ_Node_json } from '../function/DS_PriorityQueue_BiHeap';
export interface NodeProps {
    data: PQ_Node_json | undefined;
    isSmall: boolean;
    row: number;
}

const Node: React.FC<NodeProps> = ({data, isSmall, row}) => {

    const node = useMemo(()=>data!==undefined ? data : {val:-1,priority:0},[data]);
    
    const [currentAnim, setCurrentAnim] = useState<string>('BiHeap__Node--hide');
    const [showStatus,  setshowStatus]  = useState<string>('BiHeap__Node--hidden');

    const firstRun = useRef<boolean>(true);

    useEffect(()=> {
        if (firstRun.current) {
            if(node.priority){
                console.log(node.priority)
                setshowStatus('BiHeap__Node--visible');
                setTimeout(() => {
                    setCurrentAnim('BiHeap__Node--show');
                }, 400)
                firstRun.current = false;
            }
        }else{
            setCurrentAnim('BiHeap__Node--hide');
            if(node.priority){
                setTimeout(() => {
                    setCurrentAnim('BiHeap__Node--show')
                }, 400)
            }
        }
    },[node.priority]);

    return (
        <div 
            // style={{...style}}
            className={`BiHeap__Node ${currentAnim} ${showStatus}`}>
            {data ? data.priority : ''}
        </div>
    )
}

export default Node;    