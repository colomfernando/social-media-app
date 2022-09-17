import React, { useEffect, useState } from 'react';
import Button from 'components/Button';

export interface PropsTabs {
  titles: string[];
  children: JSX.Element[];
  selectedTab?: number | null;
  onSelect?: (selectedIndex: number) => void;
}
const Tabs: React.FC<PropsTabs> = ({
  titles,
  children,
  onSelect,
  selectedTab,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleActiveTab = (idx: number) => {
    setActiveTab(idx);
    if (onSelect) onSelect(idx);
  };
  if (!children) return null;

  useEffect(() => {
    if (selectedTab && selectedTab <= titles.length) setActiveTab(selectedTab);
  }, [selectedTab]);

  return (
    <div>
      <div className="flex space-x-6 border-b bg-white rounded-t-md px-2">
        {titles.map((title, idx) => (
          <Button
            baseButton
            key={idx.toString()}
            onClick={() => handleActiveTab(idx)}
            className={`py-2 border-b-4 transition-colors duration-300 ${
              idx === activeTab
                ? 'border-black'
                : 'border-transparent hover:border-gray-400'
            }`}
          >
            <h3>{title}</h3>
          </Button>
        ))}
      </div>
      <div className="bg-white rounded-b-md p-2">{children[activeTab]}</div>
    </div>
  );
};

export default Tabs;
