import { HeatmapEntry } from '@/lib/types';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';


export function Heatmap({ data }: { data: HeatmapEntry[] }) {
  return (
    <CalendarHeatmap
      startDate={new Date(new Date().setMonth(new Date().getMonth() - 6))}
      endDate={new Date()}
      values={data.map(entry => ({
        date: entry.date,
        count: entry.minutes_worked
      }))}
      classForValue={(value) => {
        if (!value) return 'color-empty';
        if (value.count < 30) return 'color-scale-1';
        if (value.count < 60) return 'color-scale-2';
        if (value.count < 120) return 'color-scale-3';
        return 'color-scale-4';
      }}
    />
  );
}
