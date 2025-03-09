import ansis, {type Ansis} from 'ansis';
import {format as _format} from 'winston';

// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const Color: Record<string, Ansis> = {
  error: ansis.red,
  info: ansis.green,
  warn: ansis.yellow,
  verbose: ansis.cyan,
  debug: ansis.magenta,
};

// Customizing the error format
const errorFormat = _format(info => {
  if (info?.level === 'error' && info instanceof Error)
    return {...info, message: info?.stack};
  return info;
});

// Customizing the log format.
const format = _format.combine(
  errorFormat(),
  // Add the message timestamp with the preferred format
  _format.timestamp({format: 'DD/MM/YYYY hh:mm:ss A'}),
  // Define the format of the message showing the timestamp, the level, pid and message
  _format.printf(({level, message, timestamp}) => {
    const color = Color[level] || ((text: string): string => text);
    const prefix = color(level.toUpperCase());
    return ansis.bold(
      `[${timestamp}] ${prefix} (${process.pid}): ${message as string}`,
    );
  }),
);

export default format;
