class Item{
    constructor(name, time, priority){
        this.n=name;
        this.t = time;
        this.priority = priority;
    }
}
class Node{
    constructor(val){
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class ToDoList{
    constructor(){
        this.first = null;
        this.last = null;
        this.length = 0;
    }
    insert(newNode, comp){
            newNode.next = comp.next;
            if(newNode.next!=null){
                newNode.next.prev = newNode;
            }else{
                this.last = newNode;
            }
            newNode.prev = comp;
            newNode.prev.next = newNode;
            this.length++;
            if(newNode!=this.first&&newNode!=this.last){
               console.log(newNode.val.n + " between " + newNode.prev.val.n + " and " + newNode.next.val.n); 
            }else{
                if(newNode==this.first){
                    if(newNode==this.last){
                        console.log(newNode.val.n + " is the only item on the list");
                    }else{
                       console.log(newNode.val.n + " is first. Followed by " + newNode.next.val.n); 
                    }
                }else{
                    console.log(newNode.val.n + " is last, after " + newNode.prev.val.n);
                }
            }
    }
    add(val){
        const newNode = new Node(val);
        if(this.length == 0){
            this.first = newNode;
            this.last = newNode;
            this.length++;
        }else{
            let comp = this.first;
            while(comp != null){
                if(comp.val.priority<newNode.val.priority){
                    if(comp.next!=null){
                      comp=comp.next;  
                    }else{
                        this.insert(newNode, comp);
                        break;
                    }
                }else{
                    if(comp.val.priority>newNode.val.priority){
                        if(comp == this.first){
                            newNode.next = comp;
                            comp.prev = newNode;
                            this.first = newNode;
                            this.length++;
                        }else{
                           this.insert(newNode, comp.prev); 
                        }
                        break;
                    }else{
                        if(comp.val.priority == newNode.val.priority){
                            if(this.checkPriority(newNode, comp)==true){
                                if(comp == this.first){
                                    this.first.prev = newNode;
                                    newNode.next = this.first;
                                    this.first = newNode;
                                    this.length++;
                                }else{
                                   this.insert(newNode, comp.prev); 
                                }
                                break;
                            }else{
                                if(comp.next==null){
                                    this.insert(newNode, comp);
                                    break;
                                }
                                comp = comp.next;
                            }  
                        }
                    }
                }
            }
            return this;
        }
    }
    checkPriority(newN, next){
        let userInput = prompt("Is A) " + newN.val.n + " or B) " + next.val.n + "higher in priority? ");
        while(userInput!="A" && userInput!="a" && userInput!="B" && userInput != "b" && userInput != newN.val.n && userInput != next.val.n){
            userInput = prompt("Is A) " + newN.val.n + " or B) " + next.val.n + " higher in priority? Please type A or B: ");
        }
        if(userInput=="A" || userInput=="a"||userInput==newN.val.n){
            return true;
        }else{
            return false;
        }
    }
    compareTime(time){
        let it = this.first;
        let intTime = parseInt(time);
        while(it!=null){
            if(parseInt(it.val.t)<=intTime){
                return it;
            }else{
                it=it.next;
            }
        }
    }
}