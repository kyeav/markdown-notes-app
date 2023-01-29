import { useState } from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import Showdown from "showdown";

export default function Editor(props: any) {
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <section className="pane editor">
      <ReactMde
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        minEditorHeight={80}
        heightUnits="vh"
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        value={props.currentNote.body}
        onChange={props.updateNote}
      />
    </section>
  );
}
