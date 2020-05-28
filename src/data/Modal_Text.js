export const MODAL_TITLES = [
    'Welcome to ER Sim!',
    'What is a Priority Queue?',
    'What is a Binary Heap?',
    'How will this work?',
    'Adding a patient to the list',
    'Taking care of the next patient',
    'About Me'
];

export const MODAL_TEXTS = [
    `ER Sim is an visual tool created with the purpose of showing how a Priority Queue (in computer science) does its work taking an ER room as example and a Binary Heap as it’s backbone.`
    ,`A Priority Queue is an abstract data structure in which each element has a priority assign to it and it’s served in a previously designated order. In this particular example lower numbers indicate a higher priority so they will be served first. Each time a new item is added to the queue the queue places the item in the correct position for it to be served timely according it’s priority.    `
    ,`A Heap it’s a binary tree structure in which each parent node is always greater than its children node or vice versa. These are often compact or complete trees, this essentially means that the size of their branches are similar among sibling nodes. Binary heaps are filled from left to right and among siblings there is no guarantee that nodes will be lesser, greater or equal.`
    ,`In this example picture an ER room in which patients come in expecting to be treated A.S.A.P but each case is assigned a different priority regarding its particular urgency. In an ER room this would be done with an Emergency Severity Index although it’s important to note that the priority queue will be indifferent to the priority assignment system because the priority was already assigned to the item before it was added to the queue.`
    ,`On the left side of the screen you will see 5 different cases of people arriving at the ER room each one with their own priority. They are sorted from the most urgent to the least urgent. You can add them to the Queue by clicking on them. \nOnce you’ve clicked them they will be placed in the next empty node of the tree (from left to right) and switch places with it’s current parent node until they reach their correct spot. Note that you will not be able to add another node to the list until the last one added reaches its correct spot for illustrative purposes.`
    ,`The node at the top of the tree is the next one on the queue to be taken care of. You can click the “Extract” button to remove it from the list and have it reorder itself. The way the tree reorders itself is by placing the last node added to the list on the top of the tree and “bubble down” to its correct place by swapping places with the its lower priority children.`
    ,`\nCreated by: Juan Urdaneta \n\n Made with: ReactJS & SASS \n\n Project inspired by Colt Steele's example and explanation of Priority Queues. \n\n Check the sourcefiles at my Github\n\n`
]