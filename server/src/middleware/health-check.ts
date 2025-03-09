import {handler, ApiRes} from 'exutile';

/**
 * Generates mini health report.
 */
export const healthCheck = handler(() => {
  return ApiRes.ok(
    {
      uptime: process.uptime(),
      'res-time': process.hrtime(),
      timestamp: Date.now(),
    },
    'Server health check.',
  );
});
