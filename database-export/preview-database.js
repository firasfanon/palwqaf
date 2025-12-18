import pg from 'pg';

const { Pool } = pg;

// Configuration - Replace [YOUR-PASSWORD] with your actual database password
const DATABASE_URL = 'postgresql://postgres:[YOUR-PASSWORD]@db.lyeryfsrhrxuepuqepgi.supabase.co:5432/postgres';

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function previewDatabase() {
  console.log('\n🔍 Analyzing database...\n');

  try {
    // Get all tables
    const tablesResult = await pool.query(`
      SELECT
        schemaname,
        tablename,
        pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
      FROM pg_tables
      WHERE schemaname = 'public'
      ORDER BY tablename
    `);

    const tables = tablesResult.rows;
    let totalRows = 0;
    const tableStats = [];

    console.log('═══════════════════════════════════════════════════════════════');
    console.log('                    DATABASE OVERVIEW');
    console.log('═══════════════════════════════════════════════════════════════\n');

    for (const table of tables) {
      const countResult = await pool.query(`SELECT COUNT(*) FROM ${table.tablename}`);
      const rowCount = parseInt(countResult.rows[0].count);
      totalRows += rowCount;

      tableStats.push({
        name: table.tablename,
        rows: rowCount,
        size: table.size
      });
    }

    // Sort by row count
    tableStats.sort((a, b) => b.rows - a.rows);

    // Display results
    console.log('TABLE NAME'.padEnd(35) + 'ROWS'.padStart(10) + '   SIZE');
    console.log('─'.repeat(65));

    for (const stat of tableStats) {
      const icon = stat.rows > 1000 ? '📊' : stat.rows > 100 ? '📋' : stat.rows > 0 ? '📄' : '⚪';
      console.log(
        `${icon} ${stat.name.padEnd(30)} ${stat.rows.toString().padStart(10)}   ${stat.size}`
      );
    }

    console.log('─'.repeat(65));
    console.log(`${'TOTAL'.padEnd(35)}${totalRows.toString().padStart(10)}`);

    // Database size
    const dbSizeResult = await pool.query(`
      SELECT pg_size_pretty(pg_database_size(current_database())) as size
    `);

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('STATISTICS');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`Total Tables:        ${tables.length}`);
    console.log(`Total Rows:          ${totalRows.toLocaleString()}`);
    console.log(`Database Size:       ${dbSizeResult.rows[0].size}`);
    console.log(`Non-empty Tables:    ${tableStats.filter(t => t.rows > 0).length}`);
    console.log(`Empty Tables:        ${tableStats.filter(t => t.rows === 0).length}`);

    // Largest tables
    const largest = tableStats.slice(0, 5);
    console.log('\nLargest Tables:');
    largest.forEach((t, i) => {
      console.log(`  ${i + 1}. ${t.name} (${t.rows.toLocaleString()} rows)`);
    });

    // Estimated export time
    const estimatedSeconds = Math.ceil(totalRows / 1000); // rough estimate: 1000 rows per second
    console.log(`\nEstimated Export Time: ~${estimatedSeconds} seconds`);

    console.log('═══════════════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

previewDatabase();
