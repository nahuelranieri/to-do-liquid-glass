import React, { useState, useRef, useEffect } from 'react';
import { Plus, Edit3, Check, X, Menu } from 'lucide-react';
import NavigationMenu from './components/NavigationMenu';

interface ListItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

function App() {
  const [items, setItems] = useState<ListItem[]>([]);
  const [newItemText, setNewItemText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem('todoItems');
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems).map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt) // Convert string back to Date
        }));
        setItems(parsedItems);
      } catch (error) {
        console.error('Error loading items from localStorage:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('todoItems', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (newItemText.trim()) {
      const newItem: ListItem = {
        id: Date.now().toString(),
        text: newItemText.trim(),
        completed: false,
        createdAt: new Date()
      };
      setItems([newItem, ...items]);
      setNewItemText('');
      inputRef.current?.focus();
    }
  };

  const toggleItemComplete = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  useEffect(() => {
    // Auto-focus input on load
    inputRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-violet-50/20 pointer-events-none" />
      
      {/* Header */}
      <header className="relative z-10 px-6 pt-12 pb-4 max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-3 rounded-2xl backdrop-blur-lg border bg-white/60 border-gray-200/50 text-gray-600 hover:bg-gray-50/80 transition-all duration-300"
          >
            <Menu size={20} />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              My List
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          
          <button
            onClick={() => setEditMode(!editMode)}
            className={`p-3 rounded-2xl backdrop-blur-lg border transition-all duration-300 ${
              editMode 
                ? 'bg-violet-500/10 border-violet-200 text-violet-600' 
                : 'bg-white/60 border-gray-200/50 text-gray-600 hover:bg-gray-50/80'
            }`}
          >
            <Edit3 size={20} />
          </button>
        </div>
      </header>

      {/* Navigation Menu */}
      <NavigationMenu 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
      />

      {/* Main Content Area */}
      <main className="relative z-10 px-6 pb-32 max-w-md mx-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-violet-50 rounded-full flex items-center justify-center mb-6">
              <Plus size={32} className="text-violet-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Start your list
            </h3>
            <p className="text-gray-500 max-w-sm leading-relaxed">
              Add your first item below to get organized and stay on top of your tasks.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`group relative backdrop-blur-lg border border-gray-200/50 rounded-2xl transition-all duration-500 ${
                  item.completed 
                    ? 'bg-gray-50/60 opacity-75 scale-[0.98]' 
                    : 'bg-white/60 hover:bg-white/80 hover:shadow-lg hover:shadow-violet-500/10'
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="flex items-center p-4">
                  {/* Complete Toggle */}
                  <button
                    onClick={() => toggleItemComplete(item.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mr-4 transition-all duration-300 flex items-center justify-center ${
                      item.completed
                        ? 'bg-violet-500 border-violet-500 scale-110'
                        : 'border-gray-300 hover:border-violet-400 hover:bg-violet-50'
                    }`}
                  >
                    {item.completed && (
                      <Check size={14} className="text-white" />
                    )}
                  </button>

                  {/* Item Text */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-gray-900 leading-relaxed transition-all duration-300 ${
                      item.completed ? 'line-through text-gray-500' : ''
                    }`}>
                      {item.text}
                    </p>
                  </div>

                  {/* Delete Button (Edit Mode) */}
                  {editMode && (
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="flex-shrink-0 ml-3 p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-all duration-200"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Fixed Bottom Input */}
      <div className="fixed bottom-0 left-0 right-0 z-20 max-w-md mx-auto">
        {/* Background Blur */}
        <div className="absolute inset-0 backdrop-blur-xl bg-white/80" />
        
        {/* Content */}
        <div className="relative p-6 pt-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add new item..."
              className="w-full px-5 py-4 pr-14 text-gray-900 placeholder-gray-500 bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-300 transition-all duration-300 text-[16px]"
              style={{ fontSize: '16px' }} // Prevents zoom on iOS
            />
            
            {/* Plus icon inside input */}
            <button
              onClick={addItem}
              disabled={!newItemText.trim()}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-xl transition-all duration-300 ${
                newItemText.trim()
                  ? 'bg-violet-500 hover:bg-violet-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 scale-100 hover:scale-105'
                  : 'bg-gray-200 text-gray-400 scale-90'
              }`}
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default App;