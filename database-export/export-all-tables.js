import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration - Replace [YOUR-PASSWORD] with your actual database password
const DATABASE_URL = 'postgresql://postgres:[YOUR-PASSWORD]@db.lyeryfsrhrxuepuqepgi.supabase.co:5432/postgres';

// All tables in the system
const TABLES = [
  'users', 'user_roles', 'permissions', 'role_permissions',
  'waqf_lands', 'land_documents', 'land_transactions',
  'mosques', 'mosque_services',
  'cases', 'case_documents', 'case_updates',
  'appointments', 'documents', 'news', 'announcements',
  'friday_sermons', 'activities', 'projects', 'media_gallery',
  'services', 'e_services', 'contacts', 'notifications',
  'audit_logs', 'system_settings'
];

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function exportAllTables() {
  console.log('🚀 Starting export of all tables...\n');

  const exportDir = path.join(__dirname, 'exports');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().split('T')[0];
  const stats = {
    total: 0,
    success: 0,
    failed: 0,
    tables: []
  };

  let fullSqlExport = `-- Full Database Export
-- Date: ${new Date().toISOString()}
-- Database: lyeryfsrhrxuepuqepgi
-- Total Tables: ${TABLES.length}

`;

  for (const tableName of TABLES) {
    try {
      console.log(`📊 Exporting: ${tableName}...`);

      // Get data
      const result = await pool.query(`SELECT * FROM ${tableName}`);
      const rows = result.rows;

      // Export as JSON
      const jsonPath = path.join(exportDir, `${tableName}.json`);
      fs.writeFileSync(jsonPath, JSON.stringify(rows, null, 2));

      // Generate SQL INSERT statements
      let sqlContent = `\n-- Table: ${tableName}\n`;
      sqlContent += `-- Rows: ${rows.length}\n`;
      sqlContent += `-- Exported: ${new Date().toISOString()}\n\n`;

      if (rows.length > 0) {
        const columns = Object.keys(rows[0]);
        sqlContent += `-- Clear existing data (optional)\n`;
        sqlContent += `-- DELETE FROM ${tableName};\n\n`;

        for (const row of rows) {
          const values = columns.map(col => {
            const val = row[col];
            if (val === null) return 'NULL';
            if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
            if (typeof val === 'boolean') return val ? 'true' : 'false';
            if (val instanceof Date) return `'${val.toISOString()}'`;
            if (typeof val === 'object') return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
            return val;
          });

          sqlContent += `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${values.join(', ')});\n`;
        }
      } else {
        sqlContent += `-- No data to export\n`;
      }

      // Save individual SQL file
      const sqlPath = path.join(exportDir, `${tableName}.sql`);
      fs.writeFileSync(sqlPath, sqlContent);

      // Add to full export
      fullSqlExport += sqlContent + '\n';

      stats.success++;
      stats.tables.push({
        name: tableName,
        rows: rows.length,
        status: 'success'
      });

      console.log(`  ✅ ${tableName}: ${rows.length} rows exported`);

    } catch (error) {
      stats.failed++;
      stats.tables.push({
        name: tableName,
        rows: 0,
        status: 'failed',
        error: error.message
      });
      console.log(`  ❌ ${tableName}: Failed - ${error.message}`);
    }
  }

  // Save full SQL export
  const fullSqlPath = path.join(exportDir, `full_export_${timestamp}.sql`);
  fs.writeFileSync(fullSqlPath, fullSqlExport);

  // Generate report
  const report = `
═══════════════════════════════════════════════════
         DATABASE EXPORT REPORT
═══════════════════════════════════════════════════

Date: ${new Date().toISOString()}
Database: lyeryfsrhrxuepuqepgi

SUMMARY
-------
Total Tables: ${TABLES.length}
Successfully Exported: ${stats.success}
Failed: ${stats.failed}

DETAILED RESULTS
----------------
${stats.tables.map(t =>
  `${t.status === 'success' ? '✅' : '❌'} ${t.name.padEnd(30)} ${t.rows.toString().padStart(6)} rows ${t.error ? `(${t.error})` : ''}`
).join('\n')}

TOTAL ROWS EXPORTED: ${stats.tables.reduce((sum, t) => sum + t.rows, 0)}

FILES GENERATED
---------------
- ${stats.success} JSON files (one per table)
- ${stats.success} SQL files (one per table)
- 1 full SQL export file: full_export_${timestamp}.sql
- This report file

LOCATION
--------
${exportDir}

═══════════════════════════════════════════════════
`;

  const reportPath = path.join(exportDir, `export_report_${timestamp}.txt`);
  fs.writeFileSync(reportPath, report);

  console.log('\n' + report);
  console.log(`\n✨ Export complete! Files saved to: ${exportDir}`);

  await pool.end();
}

// Run the export
exportAllTables().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
