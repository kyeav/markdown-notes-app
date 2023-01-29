export default function Sidebar() {
  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note">+</button>
      </div>

      {/* note elements */}
      <div>
        <div className="title selected-note">
          <h4 className="text-snippet">Note 1</h4>
          <button className="delete-btn">
            <i className="gg-trash trash-icon"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
