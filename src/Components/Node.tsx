import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { PQ_Node_json } from '../function/DS_PriorityQueue_BiHeap';

export interface NodeProps {
    data: PQ_Node_json | undefined;
    isSmall: boolean;
    index: number;
}
 
const Node: React.FC<NodeProps> = ({isSmall, data, index}) => {

    const [showData, setData] = useState(data);

    const refX = useRef<HTMLDivElement>(null);

    useEffect(()=> {
        if(data?.priority!==undefined){
            if(refX.current?.classList.contains('BiHeap__Node--hidden')){
                refX.current?.classList.remove('BiHeap__Node--hidden');
                refX.current?.classList.add('BiHeap__Node--show')
            }
        }
    },[data?.priority])

    useLayoutEffect(()=>{
        if(data?.priority!==undefined){
            refX.current?.classList.add('BiHeap__Node--show');
        }else {
            refX.current?.classList.add('BiHeap__Node--hidden');
        }
    },[])

    return ( 
        <div 
            ref={refX}
            className={`BiHeap__Node`}
                >
            {data!==undefined ? data.priority : ''}
        </div>
    );
}

export default Node;    