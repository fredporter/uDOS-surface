#!/usr/bin/env node

const express = require('express');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const app = express();
const PORT = process.env.GUI_API_PORT || 5175;

app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Get vault path
function getVaultPath() {
  return process.env.UDOS_VAULT || path.join(process.env.HOME || '', 'vault');
}

// List vault contents
app.get('/api/vault/list', (req, res) => {
  try {
    const vaultPath = getVaultPath();
    
    if (!fs.existsSync(vaultPath)) {
      return res.status(404).json({ error: 'Vault not found' });
    }
    
    const items = fs.readdirSync(vaultPath, { withFileTypes: true })
      .filter(item => !item.name.startsWith('.')) // Exclude hidden files/dirs
      .map(item => {
        const stats = fs.statSync(path.join(vaultPath, item.name));
        return {
          name: item.name,
          type: item.isDirectory() ? 'directory' : 'file',
          size: item.isDirectory() ? '-' : `${(stats.size / 1024).toFixed(2)} KB`,
          modified: stats.mtime.toISOString().split('T')[0]
        };
      });
    
    res.json(items);
  } catch (error) {
    console.error('Error reading vault:', error);
    res.status(500).json({ error: 'Failed to read vault' });
  }
});

// Execute udo command
app.post('/api/exec', (req, res) => {
  try {
    const { command } = req.body;
    
    if (!command) {
      return res.status(400).json({ error: 'Command required' });
    }
    
    // Execute command
    const result = execSync(command, { 
      encoding: 'utf-8',
      stdio: 'pipe'
    });
    
    res.json({ 
      success: true,
      output: result
    });
  } catch (error) {
    console.error('Command execution failed:', error);
    res.status(500).json({ 
      success: false,
      error: error.message,
      stderr: error.stderr || ''
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GUI API Server running on http://localhost:${PORT}`);
  console.log(`📁 Vault path: ${getVaultPath()}`);
  console.log('🔌 Endpoints:');
  console.log(`  - GET  /api/vault/list - List vault contents`);
  console.log(`  - POST /api/exec - Execute udo commands`);
});
