var saveButton = document.getElementById('saveButton')
var titleInput = document.getElementById('title')
var descriptionTextarea = document.getElementById('description')
var hourInput = document.getElementById('hour')

saveButton.addEventListener('click', function(){  
    guardarTarea()
})

console.log('yeee')

function guardarTarea() {
    console.log('GuardarTarea ejecutado!')
    
    var tarea = {
        title: titleInput.value,
        description: descriptionTextarea.value,
        hour: hourInput.value,
    };

    if (localStorage.getItem('tareas') === null) {

        let tareas = [];
        tareas.push(tarea);
        localStorage.setItem('tareas', JSON.stringify(tareas));
    } else {
        let tareas = JSON.parse(localStorage.getItem('tareas'));
        tareas.push(tarea);
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    titleInput.value = ''
    descriptionTextarea.value = ''
    hourInput.value = ''
    getTareas();
    
}

function getTareas() {
    console.log('getTareas')
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    let tareasView = document.getElementById('tareas');

    tareasView.innerHTML = '';
    if (tareas != null) {
        for (let i = 0; i < tareas.length; i++) {
            let title = tareas[i].title;
            let description = tareas[i].description;
            let hour = tareas[i].hour;

            tareasView.innerHTML += `<div class="card mb-3">
          <div class="card-body">
            <p>${title} - ${description} - ${hour}
            <a href="#" onclick="deleteTarea('${title}')" class="btn btn-danger ml-5">
            Eliminar
            </a>
            </p>
          </div>
        </div>`;
        }
    }
}

function deleteTarea(title) {
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].title == title)
            tareas.splice(i, 1);
    }
    localStorage.setItem('tareas', JSON.stringify(tareas))
    getTareas();
}

getTareas()