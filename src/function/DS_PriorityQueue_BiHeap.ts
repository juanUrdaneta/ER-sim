export interface PQ_Node_json { 
    val: string,
    priority: number,
}

class PQ_Node {
    value: string;
    priority: number;
    next: PQ_Node | null;
    prev: PQ_Node | null;

    constructor (val:string, priority:number) {
        this.value = val;
        this.priority = priority;
        this.prev = null;
        this.next = null;
    }
}

class DLinkedList {
    head: PQ_Node | null;       
    tail: PQ_Node | null;
    length: number;

    constructor (){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push (val:string, priority:number): DLinkedList | undefined {
        const newNode = new PQ_Node(val,priority);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {

            if(this.tail===null) return;
            let temp: PQ_Node | null = this.tail;
            this.tail = newNode;
            this.tail.prev = temp;
            temp.next = newNode;
        }

        this.length++;

        return this;
    }

    pop (): PQ_Node | undefined{
        if(!this.head) return undefined;
        if(this.tail === null) return;
        if(this.tail.prev === null) return;
        const oldTail = this.tail;

        let newTail: PQ_Node = this.tail.prev;
        this.tail.prev = null;
        this.tail = newTail;
        this.tail.next = null;        

        this.length--;

        return oldTail;
    }

    shift (): PQ_Node | undefined { //removes first node
        if(!this.head) return undefined;
        let oldHead = this.head;
        if(this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            if(!this.head.next) return undefined;
            let newHead: PQ_Node = this.head.next;
            this.head.next = null;
            this.head = newHead;
            this.head.prev = null;
        }

        this.length--;

        return oldHead;
    }

    unshiftNode(node: PQ_Node | undefined) {
        const newNode: PQ_Node | undefined = node;
        if(newNode === undefined) return;

        if(!this.head) { 
            // console.log('called')
            this.head = newNode;
            this.tail = newNode;
        } else {

            if(!this.head) return;
            if(!this.head.next) return;
            
            let temp = this.head;
            this.head = newNode;
            this.head.next = temp;
            temp.prev = this.head;
        }

        this.length++;

        return this;
    }

    unshift (val:string, priority:number): DLinkedList {
        const newNode = new PQ_Node(val, priority);

        if(!this.head) { 
            this.head = newNode;
            this.tail = newNode;
        } else {
            let temp = this.head;
            this.head = newNode;
            this.head.next = temp;
            temp.prev = this.head;
        }

        this.length++;

        return this;
    }

    getByIndex (index: number): PQ_Node | undefined{//get node by index
        if(index > this.length - 1) return undefined;
        if(!this.head) return;
        if(!this.tail) return;

        let current: PQ_Node = this.head;
        if(index < this.length / 2) {
            for(let i = 0; i < index; i++) {
                if(!current) break;
                if(!current.next) break;
                current = current.next;
            }
        } else {
            current = this.tail;
            for (let i = this.length - 1; i > index; i--) {
                if(!current) break;
                if(!current.prev) break;
                current = current.prev;
            }
        }
        return current;
    }

    getIndexByNode (node: PQ_Node): number {
        if(!this.head) return -1;
        let current: PQ_Node | null = this.head;
        let nodeIsAtIndex: number = 0;
        while(current !== node) {
            if(!current) break;
            current = current.next;
            nodeIsAtIndex++;
        }

        return nodeIsAtIndex;
    }

    swap (nodeA: number, nodeB: number): DLinkedList{

        const newNodeA: PQ_Node | undefined = this.getByIndex(nodeA);
        const newNodeB: PQ_Node | undefined = this.getByIndex(nodeB);

        if(newNodeA === undefined) return this;
        if(newNodeB === undefined) return this;

        const temp = {value: newNodeA.value, priority: newNodeA.priority};

        newNodeA.value = newNodeB.value;
        newNodeA.priority = newNodeB.priority;
        newNodeB.value = temp.value;
        newNodeB.priority = temp.priority;

        return this;
    }

    print (): void {
        let current: PQ_Node | null = this.head;

        let arr = [`length: ${this.length}`];
        while(current){
            arr.push(`value: ${current.value} pri: ${current.priority} |`);
            current = current.next;
        }

        console.log(arr)
    }

    private getFlatNode (index: number, node?:PQ_Node): string {
        const nodeToPrint = index !== -1 ? this.getByIndex(index) : node;

        return `value: ${nodeToPrint?.value}, priority: ${nodeToPrint?.priority} next: ${nodeToPrint?.next}, prev: ${nodeToPrint?.prev}`;
    }
}

export default class PriorityQueue {
    nodes: DLinkedList; 
    private bubbledNode: PQ_Node | null | undefined;

        constructor (){
            this.nodes = new DLinkedList();
            this.bubbledNode = null;
        }

    private getParentIndex (index:number): number {
        return Math.floor((index-1)/2);
    }

    private getHigherPriorityChild (index: number): PQ_Node | undefined{
        const children: Array<PQ_Node | undefined> = [this.nodes.getByIndex(2*index+1), this.nodes.getByIndex(2*index+2)];
        if(children[0] === undefined) return undefined;
        if(children[1] === undefined) return children[0];
        else return children[0].priority < children[1].priority ? children[0] : children[1];
    }
    
    insert(val: string, priority: number): PriorityQueue {
        this.nodes.push(val, priority);
        if(this.nodes.tail === null) return this;

        let compareTo: PQ_Node | undefined = this.nodes.tail;

        const bubbleUp = (tbi: number) : void => {
            const parentIndex: number = this.getParentIndex(tbi);
            const parentNode : PQ_Node | undefined = this.nodes.getByIndex(parentIndex);

            if(parentNode === undefined) return;
            if(!this.nodes.tail) return;
            if(compareTo === undefined) return;

            if(compareTo.priority < parentNode.priority){
                this.nodes.swap(
                    this.nodes.getIndexByNode(compareTo),
                    parentIndex
                );  
                compareTo = this.nodes.getByIndex(parentIndex);
                bubbleUp(parentIndex);
            } else return;

        }
        bubbleUp(this.nodes.getIndexByNode(this.nodes.tail));
        return this;
    }

    insertWB(val: string, priority: number): any{
        
        let reachedMax: boolean = false;
        if(!this.bubbledNode){
            this.nodes.push(val, priority);
            this.bubbledNode = this.nodes.tail;
            return {priQueue: this, stop: false};
        }
        if(this.nodes.tail === null) return this;
        
        let compareTo: PQ_Node | undefined = this.bubbledNode;

        const bubbleUp = (tbi: number) : void => {
            const parentIndex: number = this.getParentIndex(tbi);
            const parentNode : PQ_Node | undefined = this.nodes.getByIndex(parentIndex);

            if (!this.nodes.tail) return;
            if (compareTo === undefined) return;
            if (parentNode === undefined) return;

            if (compareTo.priority < parentNode.priority){
                this.nodes.swap(
                    this.nodes.getIndexByNode(compareTo),
                    parentIndex
                );  
                this.bubbledNode = parentNode;
            } else {
                console.log(compareTo.priority, parentNode.priority)
                reachedMax = true;
                this.bubbledNode = null;
                console.log('reached MAX');
            }
        }
        bubbleUp(this.nodes.getIndexByNode(compareTo));
        return {priQueue: this, stop: reachedMax};
    }

    extractMax (): PQ_Node | undefined | null | PriorityQueue{

        if (this.nodes.head === undefined) return undefined;
        if (this.nodes.tail === undefined) return undefined;

        if (this.nodes.length === 1) {
            this.nodes.shift();
            return this;
        }

        const root = this.nodes.head;
        
        this.nodes.shift();
        if (this.nodes.length > 2)this.nodes.unshiftNode(this.nodes.pop());

        let atIndex = 0;    

        while(true) {
            const higherPriorityChild: PQ_Node | undefined= this.getHigherPriorityChild(atIndex);
            const innerRoot : PQ_Node | undefined = this.nodes.getByIndex(atIndex);
            
            if(higherPriorityChild === undefined) break;
            if(innerRoot === undefined) break;

            const hpcIndex = this.nodes.getIndexByNode(higherPriorityChild)
            if(innerRoot.priority > higherPriorityChild.priority){
                this.nodes.swap(
                    atIndex,
                    hpcIndex
                )
                atIndex = hpcIndex;
            }
            else break;
        }
        return root;
    }

    extractMaxWB (): any{
        if (this.nodes.head === undefined) return undefined;
        if (this.nodes.tail === undefined) return undefined;

        if (this.nodes.length === 1) {
            this.nodes.shift();
            return this;
        }

        let reachedMax = false;

        if (!this.bubbledNode){
            this.nodes.shift();
            if (this.nodes.length > 2)this.nodes.unshiftNode(this.nodes.pop());
            this.bubbledNode = this.nodes.getByIndex(0);
            return {priQueue: this, stop: reachedMax};
        } else {
            let atIndex = this.nodes.getIndexByNode(this.bubbledNode);    

            const higherPriorityChild: PQ_Node | undefined= this.getHigherPriorityChild(atIndex);
            const innerRoot : PQ_Node | undefined = this.nodes.getByIndex(atIndex);
            
            if(higherPriorityChild === undefined) {
                console.log('reached lowest');
                this.bubbledNode = null;
                reachedMax = true;
                return {priQueue: this, stop: reachedMax};
            };
            if(innerRoot === undefined) return;

            const hpcIndex = this.nodes.getIndexByNode(higherPriorityChild)
            console.log(innerRoot.priority,higherPriorityChild.priority)
            if(innerRoot.priority > higherPriorityChild.priority){
                this.nodes.swap(
                    atIndex,
                    hpcIndex
                )
                this.bubbledNode = this.nodes.getByIndex(hpcIndex)
            } else {
                console.log('reached lowest');
                this.bubbledNode = null;
                reachedMax = true;
            }
        }
        return {priQueue: this, stop: reachedMax};
    }

    toArray(): Array<PQ_Node_json>{
        let retArray: Array<PQ_Node_json> = [];
        for(let i = 0; i < this.nodes.length; i++){
            let temp = this.nodes.getByIndex(i);
            if(temp === undefined) break;
            retArray.push({val:temp.value, priority: temp.priority})
        }
        if(!this.nodes.length) { 
            return [{val: 'list is empty',priority:0}]
        }else{
            return retArray;
        }
    }
    print() {
        this.nodes.print();
    }
}