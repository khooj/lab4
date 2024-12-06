#!/usr/bin/env node

const sqlite = require('expo-sqlite');
sqlite.deleteDatabaseSync('db');
