class Node {
    constructor(name){
        this.name = name;
        this.accept = false;
        this.links = new Map();
        this.direction;
        this.destination;
    }    
}

function TMBuilder(str) {
    const nodes = str.split(' ');
    let map = new Map();

    for(let j = 0; j < nodes.length; j++) {
        newNode = new Node(nodes[j][0]);
        map.set(nodes[j][0], newNode);
        if(nodes[j][nodes[j].length - 1] == 'T') {
            newNode.accept = true;
        }

        if(nodes[j][nodes[j].length - 2] == 'R') {
            newNode.direction = 'R';
        } else if(nodes[j][nodes[j].length - 2] == 'L') {
            newNode.direction = 'L';
        }

        for(let i = 1; i < nodes[j].length - 2; i++) {
            newNode.links.set(nodes[j][i], nodes[j][i+1]);
            newNode.destination = (nodes[j][i+2]);
            i++;
            i++;
        }
    }

    return map;
}

function ATM(tm, str) {
    let i = 0;
    let TM = TMBuilder(tm);

    if(TM.has('a')) {
        let node = TM.get('a');
        while(node.links.has(str[i])) {
            node = TM.get(node.destination);
            str[i] = node.links.get(str[i]);
            
            if(node.direction == 'R') {
                if(i == str.length - 1) {
                    str.padEnd(1, 'O');
                }
                i++;
            } else if(node.direction == 'L') {
                if(i == 0) {
                    str.padStart(1, 'O');
                }
                i--;
            }


        }

        if(node.accept == true) {
            return "a11aRT, 1";
        } else {
            return "aOObRF bOOarT, O";
        }
    }
}

console.log(ATM('a11bRF bT', '00'));