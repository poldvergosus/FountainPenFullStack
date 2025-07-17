import React, { useState } from 'react';


const ColorPicker = ({ colors, setColors }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newColor, setNewColor] = useState({ name: '', hex: '#000000' });
  const [selected, setSelected] = useState([]);

  const handleAddColor = () => {
    if (!newColor.name.trim()) return;
    setColors([...colors, { ...newColor }]);
    setNewColor({ name: '', hex: '#000000' });
    setShowAdd(false);
  };

  const handleSelect = (idx) => {
    setSelected(prev =>
      prev.includes(idx)
        ? prev.filter(i => i !== idx)
        : [...prev, idx]
    );
  };

  const renderColorCircle = (color, idx) => (
    <div
      key={idx}
      className="relative flex flex-col items-center cursor-pointer"
      onClick={() => handleSelect(idx)}
    >
      <div
        className={`border-2 ${selected.includes(idx) ? 'border-primary' : 'border-gray-300'} rounded-full flex items-center justify-center`}
        style={{
          width: 40,
          height: 40,
          background: color.isTransparent
            ? 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50% / 10px 10px'
            : color.hex
        }}
      >
        {color.isTransparent && (
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50% / 10px 10px'
            }}
          />
        )}
        {selected.includes(idx) && (
          <span className="absolute right-0 bottom-0 bg-primary text-white rounded-full text-xs px-1" style={{ fontSize: 12, lineHeight: 1 }}>✓</span>
        )}
      </div>
      <span className="text-xs mt-1">{color.name}</span>
    </div>
  );

  const renderAddCircle = () => (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={() => setShowAdd(true)}
    >
      <div
        className="border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center"
        style={{ width: 40, height: 40 }}
      >
        <span className="text-2xl text-gray-400">+</span>
      </div>
      <span className="text-xs mt-1">Добавить</span>
    </div>
  );

  return (
    <div>
      <p className="mb-2">Цвета</p>
      <div className="flex flex-wrap gap-4 mb-4">
        {colors.map(renderColorCircle)}
        {renderAddCircle()}
      </div>

      {showAdd && (
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Название"
            value={newColor.name}
            onChange={e => setNewColor({ ...newColor, name: e.target.value })}
            className="border px-2 py-1 rounded"
          />
          <input
            type="color"
            value={newColor.hex}
            onChange={e => setNewColor({ ...newColor, hex: e.target.value })}
          />
          <button
            type="button"
            onClick={handleAddColor}
            className="bg-primary text-white px-3 py-1 rounded"
          >
            Добавить
          </button>
          <button
            type="button"
            onClick={() => setShowAdd(false)}
            className="text-gray-500  w-8 h-8 rounded-full hover:bg-gray-200 text-xl leading-none pb-4"
          >
            <span className="mt-1">✕</span>
          </button>
        </div>
      )}

      <div className="mt-2 text-sm text-gray-500">
        Выбрано: {selected.map(i => colors[i]?.name).filter(Boolean).join(', ')}
      </div>
    </div>
  );
};

export default ColorPicker;