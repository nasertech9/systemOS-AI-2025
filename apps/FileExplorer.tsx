
import React from 'react';
import { FolderIcon } from '../components/Icons';

const fakeFiles = [
  { name: 'Documents', type: 'folder', size: '2.1 GB' },
  { name: 'Projects', type: 'folder', size: '15.7 GB' },
  { name: 'Downloads', type: 'folder', size: '5.4 GB' },
  { name: 'system.log', type: 'file', size: '1.2 MB' },
  { name: 'config.json', type: 'file', size: '12 KB' },
  { name: 'wallpaper.jpg', type: 'file', size: '4.8 MB' },
];

const FileExplorer: React.FC = () => {
  return (
    <div className="bg-gray-900/50 w-full h-full flex flex-col text-white rounded-b-lg overflow-hidden">
      <div className="flex-shrink-0 p-2 border-b border-cyan-500/30 flex items-center space-x-2">
        <button className="p-1 rounded hover:bg-white/10 text-gray-400">{'<'}</button>
        <button className="p-1 rounded hover:bg-white/10 text-gray-400">{'>'}</button>
        <input
          type="text"
          value="C:\Users\Admin"
          readOnly
          className="w-full bg-gray-800/50 rounded px-2 py-1 text-sm"
        />
      </div>
      <div className="flex-grow overflow-y-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-black/20">
            <tr>
              <th className="p-2 font-normal">Name</th>
              <th className="p-2 font-normal">Type</th>
              <th className="p-2 font-normal">Size</th>
            </tr>
          </thead>
          <tbody>
            {fakeFiles.map((file, index) => (
              <tr key={index} className="hover:bg-cyan-500/10 cursor-pointer">
                <td className="p-2 flex items-center space-x-2">
                  {file.type === 'folder' && <FolderIcon className="w-5 h-5 text-cyan-400" />}
                  <span>{file.name}</span>
                </td>
                <td className="p-2">{file.type}</td>
                <td className="p-2">{file.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileExplorer;
