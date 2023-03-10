export default function Sidebar(props: any) {
  const noteElements = props.notes.map((note: any) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        } `}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        {/* note summary title */}
        <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
        <button
          className="delete-btn"
          onClick={(event) => props.deleteNote({ event, noteId: note.id })}
        >
          <i className="gg-trash trash-icon"></i>
        </button>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>

      {noteElements}
    </section>
  );
}
