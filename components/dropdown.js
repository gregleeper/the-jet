import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

const Dropdown = ({ value, options, placeholder = "Select", onChange }) => {
  const node = useRef();

  const [open, setOpen] = useState(false);

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpen(false);
  };

  const handleChange = (selectedValue) => {
    onChange(selectedValue);
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={node} className="dropdown">
      <button
        className="dropdown-toggler border-gray-600 border-2 rounded px-2 py-1"
        onClick={(e) => setOpen(!open)}
      >
        {placeholder}
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 mr-2 py-2 w-48 border border-gray-300 bg-white rounded-lg shadow-xl">
          {options.map((opt, index) => (
            <li
              key={index}
              className="hover:bg-blue-200 px-2 "
              onClick={(e) => handleChange(opt)}
            >
              <Link href="/[menu]" as={`/${opt.slug}`}>
                <a>{opt.label}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
