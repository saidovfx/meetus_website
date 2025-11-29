import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProject_images,
  createProject_video,
  cancelUpload,
} from "../../features/post.feautures/post.project";

export default function CreateProject() {
  const dispatch = useDispatch();
  const { progress, project_loading } = useSelector(
    (state) => state.project
  );

  const [files, setFiles] = useState([]);
  const [type, setType] = useState("image");

  const [values, setValues] = useState({
    title: "",
    desc: "",
    link: "",
    githubLink: "",
    location: "",
    tags: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files).slice(0, 5);
    setFiles(selected);
  };

  const handleSubmit = () => {
    if (files.length === 0) return;

    const payload = { ...values, file: files };

    if (type === "image") {
        console.log(files);
        
      dispatch(createProject_images(payload));
    } else {
      dispatch(createProject_video({ ...values, file: files[0] }));
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-base-100 shadow-lg rounded-xl p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Create New Project</h2>

      <label className="border border-dashed border-gray-400 p-5 rounded-xl w-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
        <input
          type="file"
          hidden
          multiple
           name="images"
          accept="image/*,video/*"
          capture="environment" // camera enable
          onChange={handleFileChange}
        />
        <span className="text-gray-500">
          {files.length === 0
            ? "Click or Capture to upload"
            : `${files.length} file selected`}
        </span>
      </label>

      {/* Preview */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          {files.map((file, index) =>
            file.type.startsWith("video") ? (
              <video
                key={index}
                src={URL.createObjectURL(file)}
                controls
                className="rounded-lg h-32 w-full object-cover"
              />
            ) : (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  className="rounded-lg h-32 w-full object-cover border"
                />
                <button
                  className="btn btn-xs btn-error absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition"
                  onClick={() =>
                    setFiles((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  ✕
                </button>
              </div>
            )
          )}
        </div>
      )}

      {/* Select Type */}
      <select
        className="select select-bordered w-full mt-4"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="image">Image Post (max 5)</option>
        <option value="video">Video Post</option>
      </select>

      {/* Inputs */}
      <div className="mt-4 space-y-3">
        <input
          className="input input-bordered w-full"
          placeholder="Project Title"
          name="title"
          onChange={handleChange}
        />
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Description"
          name="desc"
          onChange={handleChange}
        />
        <input
          className="input input-bordered w-full"
          placeholder="Location"
          name="location"
          onChange={handleChange}
        />
        <input
          className="input input-bordered w-full"
          placeholder="Live Link"
          name="link"
          onChange={handleChange}
        />
        <input
          className="input input-bordered w-full"
          placeholder="Github Link"
          name="githubLink"
          onChange={handleChange}
        />
        <input
          className="input input-bordered w-full"
          placeholder="Tags (comma separated)"
          name="tags"
          onChange={handleChange}
        />
      </div>

      {/* Progress */}
      {project_loading && (
        <div className="mt-4">
          <progress
            className="progress progress-primary w-full"
            value={progress}
            max="100"
          ></progress>
          <p className="text-xs mt-1 text-gray-500">
            Uploading... {progress}%
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          className="btn btn-primary w-full"
          disabled={project_loading}
          onClick={handleSubmit}
        >
          Publish
        </button>

        {project_loading && (
          <button
            className="btn btn-outline btn-error w-full"
            onClick={() => dispatch(cancelUpload())}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
    // <div class="flex w-52 flex-col gap-4">
    //    <div class="skeleton h-32 w-full"></div>
    //    <div class="skeleton h-4 w-28"></div>
    //    <div class="skeleton h-4 w-full"></div>
    //    <div class="skeleton h-4 w-full"></div>
    //      <div class="skeleton h-32 w-full"></div>
    //    <div class="skeleton h-4 w-28"></div>
    //    <div class="skeleton h-4 w-full"></div>
    //    <div class="skeleton h-4 w-full"></div>  <div class="skeleton h-32 w-full"></div>
    //    <div class="skeleton h-4 w-28"></div>
    //    <div class="skeleton h-4 w-full"></div>
    //    <div class="skeleton h-4 w-full"></div>
    // </div>
  );
}
