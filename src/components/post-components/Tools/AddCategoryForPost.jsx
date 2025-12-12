import { t } from "i18next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, X } from "lucide-react";
import { addPostCategoryDetails } from "../../../features/post.feautures/post.details";
import { useNavigate } from "react-router-dom";
import { categories } from "../../../config/categories";

export default function AddCategoryForPostComponent() {
  const { category } = useSelector((state) => state.postDetails);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [categoryChange, setCategoryChange] = useState(category);
  const [inputVisible, setInputVisible] = useState(false);

  const handleChange = (key) => {
    if (key === "Other") {
      setInputVisible(true);
      setCategoryChange("");
      return;
    }

    if (key === categoryChange) {
      setCategoryChange("");
      dispatch(addPostCategoryDetails(""));
      return;
    }

    setInputVisible(false);
    setCategoryChange(key);
  };

  const handleSubmit = () => {
    dispatch(addPostCategoryDetails(categoryChange));
    navigate(-1);
  };

  const closeInput = () => {
    setInputVisible(false);
    setCategoryChange("");
  };

  return (
    <div className="relative min-h-screen p-6 bg-gradient-to-br from-white to-blue-50 flex justify-center">

      <div className="w-full md:w-2/3 lg:w-1/2 bg-white rounded-3xl p-6 md:p-10 shadow-md pb-28">

        <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold text-gray-800">{t('posts.category')}</h2>
        </div>

        <p className="text-gray-600 mb-6">
     {t('posts.linkdesc')}
        </p>

        {!inputVisible && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories?.map((cate, index) => (
              <label
                key={cate.id || index}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all
                ${categoryChange === cate.key ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-50"}`}
              >
                <div className="text-blue-400">
                  {cate.icon && <cate.icon className="w-6 h-6" />}
                </div>

                <span className="text-gray-800 font-medium">{cate.name}</span>

                <input
                  type="radio"
                  name="postCategory"
                  checked={categoryChange === cate.key}
                  onChange={() => handleChange(cate.key)}
                  className="ml-auto accent-blue-500"
                />
              </label>
            ))}
          </div>
        )}

        {inputVisible && (
          <div className="mt-4 relative">

            <button
              onClick={closeInput}
              className="absolute -top-3 -right-3 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>

            <p className="text-gray-600 mb-2">
              {t('posts.writeCategory')}
            </p>

            <input
              type="text"
              value={categoryChange}
              onChange={(e) => setCategoryChange(e.target.value)}
              placeholder="e.g., Teaching Children"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full p-5 bg-white shadow-xl">
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-medium rounded-xl hover:opacity-90 transition duration-200"
        >
          {t('posts.save')}
        </button>
      </div>
    </div>
  );
}
