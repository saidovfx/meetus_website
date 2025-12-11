import React, { useState, useEffect, useRef } from "react";
import { X, Upload, FileText, Tag, MapPin, Video, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export const MediaPreview = ({ files, type, removeFile,video }) => (
  <div className={`grid ${type === 'video' ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3'} gap-4 mb-4`}>
    {files.map((file, i) => (
      <div key={i} className="relative group">
        <button
          type="button"
          onClick={() => removeFile(i)}
          className="absolute z-50 -top-2 -right-2 btn btn-circle btn-xs btn-error"
        >
          <X className="w-4 h-4" />
        </button>
        {type === 'image' ? (
          <img
            src={URL.createObjectURL(file)}
            alt={`preview ${i}`}
            className="w-full h-48 object-cover rounded-lg transform group-hover:scale-105 transition"
          />
        ) : (
          <video
            src={URL.createObjectURL(file)}
            controls
            className="w-full h-48 object-cover rounded-lg"
          />
        )}
      </div>
    ))}
  </div>
);

export const TagsInput = ({ tags, tagInput, setTagInput, addTag, removeTag }) => (
  <div className="mb-6">
    <input
      type="text"
      value={tagInput}
      onChange={(e) => setTagInput(e.target.value)}
      onKeyDown={addTag}
      placeholder="Type a tag and press Enter..."
      className="input input-bordered w-full focus:input-accent mb-2"
    />
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <div key={i} className="badge badge-accent gap-2">
          #{tag}
          <button type="button" onClick={() => removeTag(i)} className="hover:text-error">
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  </div>
);
