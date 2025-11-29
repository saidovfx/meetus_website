 import React from "react";
 
 export default function Description({ text }) {
  const [open, setOpen] = React.useState(false);

  if (!text) return null;

  const shortText = text.slice(0, 100);

  return (
    <p className="text-sm text-gray-600 leading-relaxed">
      {open ? text : shortText}
      {text.length > 100 && (
        <button
          className="text-blue-600 text-xs ml-2 underline"
          onClick={() => setOpen(!open)}
        >
          {open ? "Show less" : "Read more"}
        </button>
      )}
    </p>
  );
}
