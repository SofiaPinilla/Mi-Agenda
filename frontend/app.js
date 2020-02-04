var saveButton = document.getElementById('saveButton')
var titleInput = document.getElementById('title')
var descriptionTextarea = document.getElementById('description')
var hourInput1 = document.getElementById('hour1')
var hourInput2 = document.getElementById('hour2')


saveButton.addEventListener('click',guardarTarea)

async function guardarTarea() {
    var body = {
        title: titleInput.value,
        description: descriptionTextarea.value,
        hour1: hourInput1.value,
        hour2: hourInput2.value,
    };
    await axios.post('http://localhost:3001/task',body)
    // if (localStorage.getItem('tareas') === null) {

    //     let tareas = [];
    //     tareas.push(tarea);
    //     localStorage.setItem('tareas', JSON.stringify(tareas));
    // } else {
    //     let tareas = JSON.parse(localStorage.getItem('tareas'));
    //     tareas.push(tarea);
    //     localStorage.setItem('tareas', JSON.stringify(tareas));
    // }

    titleInput.value = ''
    descriptionTextarea.value = ''
    hourInput1.value = ''
    hourInput2.value = ''
    getTareas();

}


// document.addEventListener('DOMContentLoaded',UI.displayTareas);

async function getTareas() {
    console.log('getTareas')
    const res = await axios.get('http://localhost:3001/task')
    // let tareas = JSON.parse(localStorage.getItem('tareas'))
    const tareas=res.data;
    let tareasView = document.getElementById('tareas');

    tareasView.innerHTML = '';
    if (tareas != null) {
        for (let i = 0; i < tareas.length; i++) {
            let _id = tareas[i]._id;
            let title = tareas[i].title;
            let description = tareas[i].description;
            let hour1 = tareas[i].hour1;
            let hour2 = tareas[i].hour2;

            tareasView.innerHTML += `<div class="card mb-3 ">
          <div class="card-body tarea">
          <span>${title}</span>
          <span>${description}</span>
          <span>${hour1}</span>
          <span>${hour2}</span>
          <span>
          <div  onclick="deleteTarea('${_id}')" class="btn btn-danger ml-5">
           X
            </div></span>
          </div>
        </div>`;
        }
    }
}

async function deleteTarea(_id) {
    await axios.delete('http://localhost:3001/'+_id)
    getTareas();
}

getTareas()