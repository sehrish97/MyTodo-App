
//My TodoApp//

var list = document.getElementById("list");

firebase.database().ref('todos').on('child_added',function(data){
    var li = document.createElement('li')
    var liText = document.createTextNode(data.val().value)
    li.appendChild(liText)



    var delBtn = document.createElement("button")
    var delText = document.createTextNode("Close")
    delBtn.setAttribute("class", "btn1")
    delBtn.setAttribute("id",data.val().key)
    delBtn.setAttribute("onclick","deleteItem(this)")
    delBtn.appendChild(delText)



    var editBtn = document.createElement("button")
    var editText = document.createTextNode("Edit")
    editBtn.setAttribute("class", "btn2")
    editBtn.setAttribute("id",data.val().key)
    editBtn.setAttribute("onclick","editItem(this)")
    editBtn.appendChild(editText)

    li.appendChild(delBtn)
    li.appendChild(editBtn)
   
    list.appendChild(li)
})

function addTodo(){
    var todo_item = document.getElementById("todo-item")
    var database = firebase.database().ref('todos')
    var key = database.push().key;

    var todo = {
        value: todo_item.value,
        key: key
    }
    database.child(key).set(todo)


   
    todo_item.value =""
}
function deleteItem(e) {
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove()
    
}
function deleteAll(){

    firebase.database().ref('todos').remove()
    list.innerHTML = ""

}
function editItem(e){
    var editValue = prompt("Enter edit value", e.parentNode.firstChild.nodeValue)
    var editTodo = {
        value: editValue,
        key: e.id
    }
    firebase.database().ref('todos').child(e.id).set(editTodo)

    e.parentNode.firstChild.nodeValue = editValue

}