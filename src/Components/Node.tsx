import React, { useState, useEffect } from 'react';
import { PQ_Node_json } from '../function/DS_PriorityQueue_BiHeap';

export interface NodeProps {
    data: PQ_Node_json | undefined;
    isSmall: boolean;
    index: number;
}
 
const Node: React.FC<NodeProps> = ({isSmall, data, index}) => {

    const [show, setShow] = useState<boolean | null>(false);

    const [showData, setData] = useState(data);
    useEffect(()=> {
        setTimeout(()=>setData(data),300);
        setTimeout(()=>setShow(true),300);
        return ()=>{setShow(false)}
    },[data])

    return ( 
        <div 
            className={`
                BiHeap__Node 
                ${show 
                    ? "BiHeap__Node--show" 
                    : index !== 0 ? "BiHeap__Node--hide" 
                    : "BiHeap__Node--extract" }
                ${isSmall ? "BiHeap__Node--small" : ""}
                ${data===undefined ? "BiHeap__Node--hidden" : ""}
                `}
                >
            {showData!==undefined ? showData.priority : ''}
        </div>
    );
}

export default Node;    