'use client';

import {useState, useMemo}  from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue} from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { eDate, formatDay, formatTimeRange, getMonthMatrix, keyFor, shortTime, monthTitleFmt } from '@/lib/utils';
import { EventItem } from '../interface';
import { Session } from 'next-auth';
import { Input } from '../ui/input';

const EventCalendar = ({events, session}: {events: EventItem[], session: Session | null}) => {

  const [view, setView] = useState<'cards' | 'calendar'>('cards');

  const [monthDate, setMonthDate] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));

  const items = useMemo(() => 
      events
      .map(e => ({ ...e, start: new Date(e.startDate), end: e.endDate ? new Date(e.endDate) : undefined }))
      .toSorted((a, b) => +a.start - +b.start),
    [events]
  );

  const byDay = useMemo(() => 
    new Map(Object.entries(Object.groupBy(items, ev => keyFor(ev.start)))),
    [items]
  );

  const matrix = useMemo(() => getMonthMatrix(monthDate), [monthDate]);
  const month = monthDate.getMonth();

  return (
    <section className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Events</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">View:</span>
          <Select value={view} onValueChange={(v: 'cards' | 'calendar') => setView(v)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="cards">Events View</SelectItem>
              <SelectItem value="calendar">Calendar View</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {view === 'cards' ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.length === 0 && (
            <div className="col-span-full rounded-md border bg-card p-6 text-center text-sm text-muted-foreground">
              No events.
            </div>
          )}
          {items.map((ev) => (
            <Card key={ev.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-base">{ev.title}</CardTitle>
                <div className="mt-1 text-sm text-muted-foreground">
                  {formatDay(ev.start)} • {formatTimeRange(ev.start, ev.end ? ev.end : undefined)}
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {ev.location && <div>{ev.location}</div>}
                {(ev.description && session ) && (
                  <div className="pt-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full cursor-pointer">
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{ev.title}</DialogTitle>
                          <div className="mt-1 text-sm text-muted-foreground">
                            {formatDay(ev.start)} • {formatTimeRange(ev.start, ev.end ? ev.end : undefined)}
                          </div>
                          <hr />
                          <DialogDescription>
                            {ev.description}
                          </DialogDescription>
                          <Input placeholder="Enter your invitation code..." />
                          <Button variant="outline" size="sm" className="w-full cursor-pointer">
                            Join
                          </Button>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-md border bg-card px-2 py-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMonthDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
            >
              Previous Month
            </Button>
            <div className="text-sm font-medium">
              {monthTitleFmt.format(monthDate)}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMonthDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
            >
              Next Month
            </Button>
          </div>
          <div className="rounded-md border">
            <div className="grid grid-cols-7 border-b bg-muted text-center text-xs font-medium">
              {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
                <div key={d} className="px-2 py-2">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {matrix.flatMap((week, wi) =>
                week.map((day, di) => {

                  const k = keyFor(day);
                  const count = byDay.get(k)?.length ?? 0;
                  const other = day.getMonth() !== month;
                  const today = keyFor(new Date()) === k;

                  return (
                    <div
                      key={`${wi}-${di}`}
                      className={[
                        'min-h-[88px] border-b border-r px-2 py-2 text-left text-sm',
                        other ? 'bg-muted text-muted-foreground' : '',
                      ].join(' ')}
                    >
                      <div className="flex items-center justify-between">
                        <span className={today ? 'rounded bg-primary px-1.5 py-0.5 text-primary-foreground' : ''}>
                          {day.getDate()}
                        </span>
                        {count > 0 && (
                          <span className="h-2 w-2 rounded-full bg-foreground/70" title={`${count} event(s)`} />
                        )}
                      </div>
                      <div className="mt-2 space-y-1">
                        {(byDay.get(k) ?? []).slice(0, 2).map((ev) => (
                          <div 
                            key={ev.id}
                            className="truncate rounded-sm border bg-card px-1.5 py-0.5 text-[11px]"
                            title={ev.title}
                          >
                            <Dialog>
                              <DialogTrigger className='cursor-pointer'>{shortTime(eDate(ev.start))} · {ev.title}</DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>{ev.title}</DialogTitle>
                                  <div className="mt-1 text-sm text-muted-foreground">
                                      {formatDay(eDate(ev.start))} • {formatTimeRange(ev.start, ev.end ? ev.end : undefined)}
                                  </div>
                                  {(ev.description && session) && (
                                    <>
                                      <DialogDescription>
                                        {ev.description}
                                      </DialogDescription>
                                      <Input placeholder="Enter your invitation code..." />
                                      <Button variant="outline" size="sm" className="w-full cursor-pointer">
                                        Join
                                      </Button>
                                    </>
                                  )}
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        ))}
                        {count > 2 && (
                          <div className="text-[11px] text-muted-foreground">+{count - 2} more</div>
                        )}
                      </div>
                    </div>
                  );
                }),
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default EventCalendar;