import React from 'react';
import { User, Info, LogIn, FolderOpen, X } from 'lucide-react';

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ isOpen, onClose }) => {
  const collections = [
    { id: '1', name: 'Shopping List', count: 5, color: 'bg-violet-100 text-violet-600' },
    { id: '2', name: 'Work Tasks', count: 3, color: 'bg-blue-100 text-blue-600' },
    { id: '3', name: 'Home Projects', count: 8, color: 'bg-green-100 text-green-600' },
    { id: '4', name: 'Travel Plans', count: 2, color: 'bg-orange-100 text-orange-600' },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed top-0 left-0 w-80 h-full bg-white/95 backdrop-blur-xl border-r border-gray-200/50 z-50 transform transition-transform duration-300 ease-out shadow-2xl shadow-violet-500/10">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/30">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <FolderOpen size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">My Lists</h2>
              <p className="text-xs text-gray-500">Personal organizer</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-100/80 hover:bg-gray-200/80 text-gray-600 transition-all duration-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col h-full">
          
          {/* Main Actions */}
          <div className="p-6 space-y-3">
            <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50/80 hover:bg-violet-50/80 hover:border-violet-200/50 border border-transparent transition-all duration-200 group">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Info size={18} className="text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">About</p>
                <p className="text-sm text-gray-500">App information</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50/80 hover:bg-violet-50/80 hover:border-violet-200/50 border border-transparent transition-all duration-200 group">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <LogIn size={18} className="text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Login</p>
                <p className="text-sm text-gray-500">Access your account</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50/80 hover:bg-violet-50/80 hover:border-violet-200/50 border border-transparent transition-all duration-200 group">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <User size={18} className="text-purple-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Profile</p>
                <p className="text-sm text-gray-500">Manage settings</p>
              </div>
            </button>
          </div>

          {/* Collections Section */}
          <div className="flex-1 px-6 pb-6">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                Collections
              </h3>
            </div>
            
            <div className="space-y-2">
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50/60 hover:bg-white/80 hover:shadow-md hover:shadow-violet-500/10 border border-transparent hover:border-gray-200/50 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${collection.color}`}>
                      <FolderOpen size={14} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 text-sm">{collection.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 bg-gray-200/60 px-2 py-1 rounded-full">
                      {collection.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Add New Collection */}
            <button className="w-full mt-4 p-3 rounded-xl border-2 border-dashed border-gray-300 hover:border-violet-300 hover:bg-violet-50/30 text-gray-500 hover:text-violet-600 transition-all duration-200 flex items-center justify-center gap-2">
              <FolderOpen size={16} />
              <span className="text-sm font-medium">New Collection</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;