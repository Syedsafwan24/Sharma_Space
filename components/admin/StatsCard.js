import React from 'react';
import { Package, Settings, MessageSquare, Mail, Edit } from 'lucide-react';

const iconMap = {
  Package: Package,
  Settings: Settings,
  MessageSquare: MessageSquare,
  Mail: Mail,
  Edit: Edit,
};

const StatsCard = ({ title, value, icon, color }) => {
  const IconComponent = iconMap[icon];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-start justify-between h-40">
      <div className="flex items-center justify-between w-full mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        {IconComponent && <IconComponent size={24} className={`text-${color.replace('#', '')}-500`} style={{ color: color }} />}
      </div>
      <div className="text-4xl font-bold text-[#1C1C1C] mb-2">{value}</div>
      <p className="text-sm text-gray-500">Click to manage &rarr;</p>
    </div>
  );
};

export default StatsCard;
