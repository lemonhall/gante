import React from 'react';
import { getDaysRange } from '../../../utils/dateUtils';

interface TimelineHeaderProps {
  startDate: string;
  endDate: string;
  columnWidth: number;
}

export const TimelineHeader: React.FC<TimelineHeaderProps> = ({ startDate, endDate, columnWidth }) => {
  const days = getDaysRange(startDate, endDate);

  return (
    <div className="flex h-10 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
      {days.map((day) => (
        <div
          key={day.toISOString()}
          className="flex-shrink-0 border-r border-gray-200 flex flex-col items-center justify-center text-xs text-gray-500"
          style={{ width: columnWidth }}
        >
          <span className="font-semibold">{day.getDate()}</span>
          <span className="text-[10px]">{day.toLocaleDateString('zh-CN', { weekday: 'narrow' })}</span>
        </div>
      ))}
    </div>
  );
};
