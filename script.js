
    let addTxt = document.getElementById("addTxt");
    let addBtn = document.getElementById("addBtn");
    let title = document.getElementById("addTitle");

    function disableFun() {
        if (addTxt.value.trim().length > 0) {
            addBtn.disabled = false;
        } else {
            addBtn.disabled = true;
        }
    }

    showNotes();
    addBtn.addEventListener('click', function () {
        if (addTxt.value.trim().length > 0) {
            let notes = localStorage.getItem('notes');
            let titles = localStorage.getItem('titles');

            if (notes == null && titles == null) {
                notesObj = [];
                titlesObj = [];
            } 
            else {
                notesObj = JSON.parse(notes);
                titlesObj = JSON.parse(titles);
            }

            notesObj.push(addTxt.value);
            titlesObj.push(title.value);
            localStorage.setItem('notes', JSON.stringify(notesObj));
            localStorage.setItem('titles', JSON.stringify(titlesObj));

            showNotes();
            addTxt.value = "";
            title.value = "";
        }
    });

    function showNotes() {

        let notes = localStorage.getItem('notes');
        let titles = localStorage.getItem('titles')

        if (notes == null && titles == null) {
            notesObj = [];
            titlesObj = [];        } 
        else {
            notesObj = JSON.parse(notes);
            titlesObj = JSON.parse(titles);
        }

        let html = "";
        notesObj.forEach(function (element, index) {
            var titleText = titlesObj[index];
            html += `<div class="card mx-3 my-3" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">${titleText}</h5>
                      <p class="card-text">${element}</p>
                      <button id="${index}" class="btn btn-primary" onclick="deleteThis(this.id)">Delete</button>
                    </div>
                  </div>`
        });

        let notesElm = document.getElementById('notes');
        notesElm.innerHTML = html;
    }

    function deleteThis(i) {
        let notes = localStorage.getItem('notes');
        let titles = localStorage.getItem('titles')

        if (notes == null && titles == null) {
            notesObj = [];
            titlesObj = [];        } 
        else {
            notesObj = JSON.parse(notes);
            titlesObj = JSON.parse(titles);
        }
        notesObj.splice(i, 1);
        titlesObj.splice(i,1);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        localStorage.setItem('titles', JSON.stringify(titlesObj));
        showNotes();
    }
