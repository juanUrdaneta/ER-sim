import React from 'react';
import Node from './Node'
import { PQ_Node_json } from '../function/DS_PriorityQueue_BiHeap';

export interface RowProps {
    data: Array<PQ_Node_json | undefined>;
    row: number;
}
 
const Row: React.FC<RowProps> = ({data,row}) => {
    return ( 
        <div className="BiHeap__Row">   
            {
                data.map((el,idx)=><Node key={idx} index={row} isSmall={row > 4 ? true : false} data={el}/>)
            }
        </div>
    );
}
 
export default Row;