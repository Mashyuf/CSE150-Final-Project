class Node {
    constructor(name){
        this.name = name;
        this.accept = false;
        this.links = new Map();
    }    
}

function DFABuilder(str) {
    const nodes = str.split(' ');
    let map = new Map();

    for(let j = 0; j < nodes.length; j++) {
        newNode = new Node(nodes[j][0]);
        map.set(nodes[j][0], newNode);
        if(nodes[j][nodes[j].length - 1] == 'T') {
            newNode.accept = true;
        }

        for(let i = 1; i < nodes[j].length - 1; i++) {
            newNode.links.set(nodes[j][i], nodes[j][i+1]);
            i++;
        }
    }

    console.log(map);
    return map;
}

function ADFA(dfa, str) {
    const iterator = str[Symbol.iterator]();
    let char = iterator.next();
    let DFA = DFABuilder(dfa);

    if(DFA.has('a')) {
        let node = DFA.get('a');
        while(node.links.has(char.value)) {
            node = DFA.get(node.links.get(char.value));
            char = iterator.next();
        }

        if(node.accept == true) {
            return true;
        } else {
            return false;
        }
    }
}

console.log(ADFA('a1bF b0a1bT', '1110'));