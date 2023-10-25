const ToDo = new ToDoList;
let myList = document.createElement("div");
myList.id = 'myList';
document.body.appendChild(myList);
function searchList(list){
    let time = prompt("How many minutes do you have? ");
    let found = list.compareTime(time);
    if(found == null){
        alert("You have no tasks that can be completed in that time. You should do " + list.first.val.n + " for " + time + " minutes.");
    }else{
        alert("You should do " + found.val.n + ", which is priority " + found.val.priority + " and will take " + found.val.t + " minutes.");
    }
    return found;
}
function newList(){
    let entry = newItem();
    let entryNode= new Node(entry);
    let list = new ToDoList();
    list.add(entryNode);
    return list;
}
function newItem(){
    let name = prompt("Name of the task: ");
    let time = prompt("Estimated length of the task in minutes: ");
    let priority = prompt("What is the priority level of your task, if 1 is the highest priority? ");
    return new Item(name, time, priority);
}
function addItem(list){
    list.add(newItem());
}
function displayList(list){
    let listText = "";
    let it = list.first;
    while(it!=null){
        listText += "Task: ";
        listText += it.val.n;
        listText += "<br>";
        listText += "Time Estimate: ";
        listText += it.val.t + " minutes";
        listText += "<br>";
        listText += "Priority: ";
        listText += it.val.priority;
        listText += "<br>"
        listText += "<br>"
        it = it.next;
    }
    let myList = document.getElementById("myList")
    myList.innerHTML = listText;
}