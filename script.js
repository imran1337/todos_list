const addNoteBtn = document.getElementById("addNoteBtn");
const noteDiv = document.getElementById("noteDiv");

addNoteBtn.addEventListener("click", () => {
  const noteTitle = document.getElementById("noteTitle");
  const noteBody = document.getElementById("noteBody");
  const noteId = Math.floor(100000 + Math.random() * 900000) - 1;
  addNote(noteTitle.value, noteBody.value, noteId);
  storeNote(noteTitle.value, noteBody.value, noteId);
  noteTitle.value = ''
  noteBody.value = '';
});

function addNote(title, body, noteId) {
  noteDiv.innerHTML += `
  <div class="col-5 col-md-3 col-xl-2 note">
  <span class="deleteNote" onclick="deleteNote(${noteId})" class="text-end"><i class="fas fa-minus-circle"></i></span>
  <h5 class="text-center text-capitalize">${title}</h5>
  <p style="white-space: pre-line">
   ${body}
  </p>
</div>
    `;
}

let allNotes = []; // >>> notes array for store all notes in local storage
function storeNote(title, body, id) {
  allNotes.push({ title, body, id });
  localStorage.setItem("notes", JSON.stringify(allNotes.filter(e => e.title !== "" && e.body !== "")));
  console.log(allNotes.length);
}

if (localStorage.getItem("notes")) {
  noteDiv.innerHTML = "";
  const notes = localStorage.getItem("notes");
  const notesParse = JSON.parse(notes);
  allNotes.push(...notesParse);
}


function showStoredNotes() {
  const getNotes = JSON.parse(localStorage.getItem("notes"));
  getNotes &&
    getNotes.forEach((note) => {
      // console.log(note);
      const { title, body, id } = note;
      noteDiv.innerHTML += `
    <div class="col-5 col-md-3 col-xl-2 note">
    <span class="deleteNote" onclick="deleteNote(${id})" class="text-end"><i class="fas fa-minus-circle"></i></span>
    <h5 class="text-center text-capitalize">${title}</h5>
    <p style="white-space: pre-line">
     ${body}
    </p>
  </div>
    `;
    });
}

function deleteNote(noteId) {
  console.log(noteId);
  noteDiv.innerHTML = "";
  allNotes.length += -1;
  console.log(allNotes.length);
  const notes = localStorage.getItem("notes");
  const notesParse = JSON.parse(notes);
  const newNotes = notesParse.filter((e) => e.id !== noteId)
  console.log(newNotes);
  localStorage.setItem("notes", JSON.stringify(newNotes));
  showStoredNotes();
}


showStoredNotes();