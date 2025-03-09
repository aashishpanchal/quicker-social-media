import morgan from 'morgan';
import logger from '@/logger';
import ansis, {type Ansis} from 'ansis';

// Status code with colors
morgan.token('status', (_, res) => {
  const status = res.statusCode;
  const isBetween = (min: number, max: number) => status >= min && status < max;

  let colorFn: Ansis;
  if (isBetween(100, 200))
    colorFn = ansis.blue; // Blue for informational responses
  else if (isBetween(200, 300))
    colorFn = ansis.green; // Green for success responses
  else if (isBetween(300, 400))
    colorFn = ansis.yellow; // yellow for redirection responses
  else colorFn = ansis.red; // Red for server error responses
  return colorFn(status);
});

// Format of request terminal loges
const FORMAT = `:remote-addr - "${ansis.bold(':method :url HTTP/:http-version')}" :status - :response-time ms`;

export const terminalLog = () =>
  morgan(FORMAT, {
    stream: {
      // Use the http severity
      write: message => logger.info(message.trim()),
    },
  });
