onst TagsInput = ({ tags, tagInput, setTagInput, addTag, removeTag }) => (
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
