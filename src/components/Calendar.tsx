import './Calendar.css';

type Props = {
  recordedDates: string[];
};

function generateCalendarDates(year: number, month: number): string[] {
  const dates: string[] = [];
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < startDay; i++) {
    dates.push('');
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}/${(month + 1).toString().padStart(2, '0')}/${i.toString().padStart(2, '0')}`;
    dates.push(dateStr);
  }

  return dates;
}

function Calendar({ recordedDates }: Props) {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
  const year = 2025;
  const month = 7; // August

  const dates = generateCalendarDates(year, month);

  return (
    <div className="calendar">
      <div className="calendar-header">August 2025</div>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="calendar-day">{day}</div>
        ))}
        {dates.map((date, index) => {
          const isToday = date === today;
          const isRecorded = recordedDates.includes(date);

          return (
            <div
              key={index}
              className={`calendar-cell ${isToday ? 'today' : ''} ${isRecorded ? 'recorded' : ''}`}
            >
              {date ? date.split('/')[2] : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
