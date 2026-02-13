#!/usr/bin/env node
import { runStdioServer } from './server.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const config = {
  clientId: process.env.SERVICETITAN_CLIENT_ID || '',
  clientSecret: process.env.SERVICETITAN_CLIENT_SECRET || '',
  tenantId: process.env.SERVICETITAN_TENANT_ID || '',
  appKey: process.env.SERVICETITAN_APP_KEY || '',
};

// Validate configuration
if (!config.clientId || !config.clientSecret || !config.tenantId || !config.appKey) {
  console.error('Error: Missing required ServiceTitan configuration');
  console.error('Please set the following environment variables:');
  console.error('  SERVICETITAN_CLIENT_ID');
  console.error('  SERVICETITAN_CLIENT_SECRET');
  console.error('  SERVICETITAN_TENANT_ID');
  console.error('  SERVICETITAN_APP_KEY');
  process.exit(1);
}

// Start the server
runStdioServer(config).catch((error) => {
  console.error('Fatal error running ServiceTitan MCP server:', error);
  process.exit(1);
});
