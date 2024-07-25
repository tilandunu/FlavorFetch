// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Modal = ({ show, onClose, blog }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-80">
      <div className="flex justify-center items-center m-16 p-6">
        <div className="flex flex-col justify-start p-10 border shadow-lg rounded-md bg-white">
          <div className="mt-3 text-left">
            <h3 className="mt-2 px-7 pt-3 pb-1 text-3xl uppercase font-medium text-gray-900">
              {blog.title}
            </h3>{" "}
            <p className="px-7 pb-10 text-sm text-slate-800">{blog.subTitle}</p>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500 pb-10">{blog.content}</p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#202030] text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-[#3b3b7d] duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
