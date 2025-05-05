"use client";

export function Checkbox({ id, checked, onCheckedChange }) {
  return (
    <div className="relative flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onCheckedChange}
        className={`w-4 h-4 text-[#E85C13] ${
          onCheckedChange ? "z-10" : "-z-0"
        }  border-gray-300 rounded focus:ring-[#E85C13]`}
        style={{
          accentColor: "#E85C13",
        }}
      />
    </div>
  );
}
