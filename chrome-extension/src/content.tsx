console.log("Founder Mode button script injected!");

import ReactDOM from "react-dom";
import FounderModeButton from "./FounderModeButton";

const root = document.createElement("div");
root.className = "founder-mode-root";
document.body.appendChild(root);

ReactDOM.render(<FounderModeButton />, root);
