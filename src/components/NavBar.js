import React from "react";
import { useHref } from "react-router-dom";
import { useApp } from "./AppProvider";

function NavBar({ children }) {
  const url = useHref();
  const { logOut } = useApp();

  return (
    <div>
      {url === "/" ? null : (
        <nav>
          <ul style={{ listStyleType: "none", padding: 0, textAlign: "right" }}>
            <li>
              <button onClick={logOut}>Log out</button>
            </li>
          </ul>
        </nav>
      )}
      {children}
    </div>
  );
}

export default NavBar;
