import React, { useState, useEffect, useRef } from "react";
import Dropdown from "./dropdown";
import Link from "next/link";

const Header = ({ menus }) => {
  const [menu, setMenu] = useState();

  const myMenuOptions = [];
  menus.map(m => myMenuOptions.push({ label: m.title, slug: m.slug.current }));

  return (
    <header className="flex items-center border-b h-12">
      <div className="flex flex-1 justify-start ml-4">
        <Link href="/">
          <a>
            <h3 className="text-2xl">Jet Drive-In</h3>
          </a>
        </Link>
      </div>

      <div className="flex flex-1 justify-end mr-4">
        <Dropdown
          placeholder="Menus"
          onChange={v => setMenu(v)}
          value={menu}
          options={myMenuOptions}
        />
      </div>
    </header>
  );
};

export default Header;
