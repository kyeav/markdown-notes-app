import "./App.css";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import Split from "react-split";
import { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [notes, setNotes] = useState<Array<{ id: string; body: string }>>([]);
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  };

  const findCurrentNote = () => {
    return (
      notes.find((note) => {
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
    setNotes((oldNotes) => {
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
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
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
