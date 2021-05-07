import { useState } from "react";
import classes from './Modal.module.css'

import ClientOnlyPortal from "./ClientOnlyPortal";

export default function Modal() {
  const [open, setOpen] = useState();

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open Modal
      </button>

      {open && (
        <ClientOnlyPortal selector="#modal">
          <div className={classes.Backdrop} onClick={() => setOpen(false)}></div>
          <div className={classes.Modal}>
            <p>
              This modal is rendered using{" "}
              <a
                href="https://reactjs.org/docs/portals.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                portals
              </a>
              .
            </p>

            <button type="button" onClick={() => setOpen(false)}>
              Close Modal
            </button>
          </div>

        </ClientOnlyPortal>
      )}
    </>
  );
}
