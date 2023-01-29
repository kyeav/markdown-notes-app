import "./App.css";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import Split from "react-split";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

function App() {
  /** sync notes w localStorage
   *
   * localStorage.getItem("key")
   * localStorage.setItem("key", value)
   *
   * value must be a string
   * if you have a more complex value like [] or {} to save, use:
   *
   * JSON.stringify(value)
   * JSON.parse(stringifiedValue)
   */

  // lazy state initialisation
  const [notes, setNotes] = useState(() => {
    const notesFromLocalStorage = localStorage.getItem("notes");
    return notesFromLocalStorage ? JSON.parse(notesFromLocalStorage) : [];
  });

  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };

    setNotes((prevNotes: any) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  };

  const findCurrentNote = () => {
    return (
      notes.find((note: any) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  };

  // bump recent note to the top
  const updateNote = (text: any) => {
    // setNotes((prevNotes) => {
    //   const noteIndex = prevNotes.findIndex(
    //     (note) => note.id === currentNoteId
    //   );
    //   const updatedNote = { ...prevNotes[noteIndex], body: text };
    //   return [
    //     updatedNote,
    //     ...prevNotes.slice(0, noteIndex),
    //     ...prevNotes.slice(noteIndex + 1),
    //   ];
    // });
    setNotes((oldNotes: any) => {
      const newArray: any = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newArray.unshift({ ...oldNote, body: text });
        } else {
          newArray.push(oldNote);
        }
      }
      return newArray;
    });
  };

  // delete note
  const deleteNote = ({ event, noteId }: any) => {
    event.stopPropagation();

    // setNotes((prevNotes) => {
    //   return prevNotes.filter((note) => note.id !== noteId);
    // });

    // if (noteId === currentNoteId) {
    //   const newCurrentNoteId = notes[0] ? notes[0].id : "";
    //   setCurrentNoteId(newCurrentNoteId);
    // }
    setNotes((oldNotes: any) =>
      oldNotes.filter((note: any) => note.id !== noteId)
    );
  };

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            newNote={createNewNote}
            setCurrentNoteId={setCurrentNoteId}
            deleteNote={deleteNote}
          />
          <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
