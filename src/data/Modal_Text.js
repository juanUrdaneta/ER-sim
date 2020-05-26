export const MODAL_TITLES = [
    'Welcome to ER Sim!',
    'What is a Priority Queue?',
    'What is a Binary Heap?',
    'How will this work?',
    'Adding a patient to the list',
    'Taking care of the next patient',

];

export const MODAL_TEXTS = [
    `ER Sim is an interactive tool to created with the purpose of explaining what a Priority Queue 
    (in computer science) is and how does it work taking an ER room as example and a Binary Heap 
    as it’s backbone.`
    ,`A Priority Queue is an abstract data structure in which each element has a priority assign to 
    it and it’s served in the designated order. In this particular example lower numbers indicate a higher priority.`
    ,`A Heap it’s a binary tree structure in which each parent node is always greater than its children 
    node or vice versa where each parent node value is lesser that it’s children values. 
    These are often compact or complete trees which essentially means that the size of their branches are similar among sibling nodes.`
    ,`In this example picture an ER room in which patients come in expecting to be treated A.S.A.P but each case is assigned a different 
    priority regarding its particular urgency. 
    This means that if someone arrives with fever, dry cough and tiredness (due to today’s circumstances) 
    they will likely get a faster response from the medical team than if another person arrive with a sprained ankle.`
    ,`In the right side of the screen we will see 5 different cases of people arriving at the ER room each one with their own priority. 
    You can add them to the Queue by clicking on them and see the Priority Queue placing the new case in their correct 
    spot by comparing it to it’s parent node until it reaches its highest position.`
    ,`You can also attend the next most important case to be taken care off by clicking the ‘Extract’ button which is meant to 
    remove (take care) of the highest priority item. In this case in order for the list to maintain its integrity the process is 
    very similar to our inserting method. The main difference being that we last item in the queue will take the first position 
    and then compare itself with its children swapping places with the lower priority index until the item reaches its correct spot.`

]