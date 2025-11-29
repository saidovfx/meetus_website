import { useState } from "react";

export default function ZoomableImage({ src, alt }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleZoom = () => setIsOpen(!isOpen);

  return (
    <>
      <div
        className="w-[250px] h-[250px] rounded-3xl border flex items-center justify-center overflow-hidden bg-gray-100 cursor-pointer"
        onClick={toggleZoom}
      >
        <img
          src={src}
          alt={alt}
          className="object-contain max-w-full max-h-full"
        />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={toggleZoom}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-[90%] max-h-[90%] rounded-xl"
          />
        </div>
      )}
    </>
  );
}
