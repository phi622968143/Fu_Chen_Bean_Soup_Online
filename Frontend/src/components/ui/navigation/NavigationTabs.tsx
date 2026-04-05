import React from "react";

export const NavigationTabs: React.FC = () => {
  return (
    <nav className="flex gap-2 text-xl leading-none text-center text-black">
      <div>
        <button className="text-black">菜單</button>
        <div className="flex shrink-0 mt-1 w-9 h-1 bg-zinc-300" />
      </div>
      <div>
        <button className="text-black">修改菜單</button>
        <div className="flex shrink-0 mt-1 h-1 bg-zinc-300 w-[72px]" />
      </div>
      <div>
        <button className="text-black">訂單管理</button>
        <div className="flex shrink-0 mt-1 h-1 bg-zinc-300 w-[72px]" />
      </div>
    </nav>
  );
};
