/**
 * Method must end on weeks because everything that more is inconsistent
 *  - months have different days count (28-31)
 *  - years have different days count (364-365)
 *
 * Class must not have methods to calculate/transform time
 * It purpose only to create time in more readable way
 *  - 30000                                          -> TimeBuilder.minutes(5).time
 *  - 3 * 24 * 60 * 60 * 1000                        -> TimeBuilder.days(3).time
 *  - 86400000                                       -> TimeBuilder.days(1).time
 *  - 86400000 * 14                                  -> TimeBuilder.weeks(2).time
 *  - 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000       -> TimeBuilder.days(1).hours(3).time
 *  - 97200000                                       -> TimeBuilder.days(1).hours(3).time
 *  - 86400000 + 10800000                            -> TimeBuilder.days(1).hours(3).time
 *  - 86400000 - 10800000                            -> TimeBuilder.days(1).hours(-3).time
 */

class Builder {
  private static readonly _second = 1000;
  private static readonly _minute = Builder._second * 60;
  private static readonly _hour = Builder._minute * 60;
  private static readonly _day = Builder._hour * 24;
  private static readonly _week = Builder._day * 7;

  private _time = 0;

  public valueOf(): number {
    return this._time;
  }

  public toString(): string {
    let string = "";
    let time = Math.abs(this._time);

    const weeks = Math.floor(time / Builder._week);

    if (weeks > 0) {
      string += weeks;
      string += "w ";

      time -= weeks * Builder._week;
    }

    const days = Math.floor(time / Builder._day);

    if (days > 0) {
      string += days;
      string += "d ";

      time -= days * Builder._day;
    }

    const hours = Math.floor(time / Builder._hour);

    if (hours > 0) {
      string += hours;
      string += "h ";

      time -= hours * Builder._hour;
    }

    const minutes = Math.floor(time / Builder._minute);

    if (minutes > 0) {
      string += minutes;
      string += "m ";

      time -= minutes * Builder._minute;
    }

    const seconds = Math.floor(time / Builder._second);

    if (seconds > 0) {
      string += seconds;
      string += "s ";

      time -= seconds * Builder._second;
    }

    if (time > 0 || string.length === 0) {
      string += time;
      string += "ms";
    } else {
      string = string.trimEnd();
    }

    if (this._time < 0) {
      string = `-${string}`
    }

    return string;
  }

  public milliseconds(time: number): this {
    this._time += time;

    return this;
  }

  public seconds(time: number): this {
    this._time += time * Builder._second;

    return this;
  }

  public minutes(time: number): this {
    this._time += time * Builder._minute;

    return this;
  }

  public hours(time: number): this {
    this._time += time * Builder._hour;

    return this;
  }

  public days(time: number): this {
    this._time += time * Builder._day;

    return this;
  }

  public weeks(time: number): this {
    this._time += time * Builder._week;

    return this;
  }

  public get time(): number {
    return this._time;
  }
}

class TimeBuilder {
  public static seconds(time: number): Builder {
    return new Builder().seconds(time);
  }

  public static minutes(time: number): Builder {
    return new Builder().minutes(time);
  }

  public static hours(time: number): Builder {
    return new Builder().hours(time);
  }

  public static days(time: number): Builder {
    return new Builder().days(time);
  }

  public static weeks(time: number): Builder {
    return new Builder().weeks(time);
  }
}

export { TimeBuilder };
