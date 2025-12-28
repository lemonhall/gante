import React, { useEffect, useRef } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  options: { label: string; onClick: () => void; className?: string }[];
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, options }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed bg-white shadow-xl rounded-md border border-gray-200 py-1 z-50 min-w-[160px]"
      style={{ top: y, left: x }}
    >
      {options.map((option, index) => (
        <button
          key={index}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${option.className || 'text-gray-700'}`}
          onClick={() => {
            option.onClick();
            onClose();
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
