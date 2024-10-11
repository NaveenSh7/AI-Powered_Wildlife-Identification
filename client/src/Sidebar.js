import React, { useState } from 'react';

const Sidebar = () => {
  // State to track the selected option
  const [selected, setSelected] = useState('profile');

  return (
    <div className="fixed top-96">
      {/* Floating Sidebar */}
      <nav
        className="z-200 flex absolute top-1/2 left-6 -translate-y-1/2 flex-col justify-around gap-4 p-2.5 bg-white/50 dark:bg-green-800/50 border border-gray-200 dark:border-green-600/60 shadow-lg backdrop-blur-lg rounded-lg min-w-[64px]"
      >
             {/* Settings Link */}
             <a
          href="#settings"
          onClick={() => setSelected('settings')}
          className={`flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 ${
            selected === 'settings'
              ? 'bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-50'
              : 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-green-800'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.438-.613.431-.992 0-.085 0-.171 0-.256a1.125 1.125 0 01.431-.99l1.004-.828a1.125 1.125 0 01.26-1.43l-1.297-2.247a1.125 1.125 0 011.37-.49l1.217.456c.355.133.75.072 1.076-.124.073-.044.146-.087.22-.127a1.125 1.125 0 00.645-.87l.213-1.28z"
            />
          </svg>
          <small className="text-center text-xs font-medium">Identify</small>
        </a>

        {/* Analytics Link */}
        <a
          href="#analytics"
          onClick={() => setSelected('analytics')}
          className={`flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 ${
            selected === 'analytics'
              ? 'bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-50'
              : 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-green-800'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
          </svg>
          <small className="text-center text-xs font-medium">Analytics</small>
        </a>
<a className=" bg-gray-100 h-[2px]"> </a>
   
        {/* Profile Link */}
        <a
          href="#profile"
          onClick={() => setSelected('profile')}
          className={`flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 ${
            selected === 'profile'
              ? 'bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-50'
              : 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-green-800'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          <small className="text-center text-xs font-medium">Profile</small>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;


