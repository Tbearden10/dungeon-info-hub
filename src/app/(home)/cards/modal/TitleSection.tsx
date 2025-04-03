export default function TitleSection({ title }: { title: any }) {
    if (!title) return null;
  
    return (
      <div className="bg-gray-800 p-6 rounded-lg flex items-center space-x-4 relative">
        <img
          src={title.icon}
          alt={title.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <h3 className="text-lg font-semibold text-yellow-400">{title.name}</h3>
        <div className="absolute bottom-2 right-2 text-xs text-gray-400 flex items-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            className="bi bi-star"
            viewBox="0 0 16 16"
          >
            <path d="M8 .25a.75.75 0 0 1 .648.372l1.76 3.574 3.95.575a.75.75 0 0 1 .416 1.276l-2.86 2.786.674 3.938a.75.75 0 0 1-1.088.79L8 12.11l-3.54 1.862a.75.75 0 0 1-1.088-.79l.674-3.938-2.86-2.786a.75.75 0 0 1 .416-1.276l3.95-.575 1.76-3.574A.75.75 0 0 1 8 .25z" />
          </svg>
          <span>Title Requirement</span>
        </div>
      </div>
    );
  }