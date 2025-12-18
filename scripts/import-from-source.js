import { createClient } from '@supabase/supabase-js';

const SOURCE_DB_URL = 'postgresql://postgres:[YOUR-PASSWORD]@db.lyeryfsrhrxuepuqepgi.supabase.co:5432/postgres';
const SOURCE_SUPABASE_URL = 'https://lyeryfsrhrxuepuqepgi.supabase.co';
const SOURCE_SUPABASE_ANON_KEY = 'ضع_المفتاح_هنا';

const TARGET_SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const TARGET_SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const ALL_TABLES = [
  'users',
  'waqf_lands',
  'cases',
  'documents',
  'appointments',
  'mosques',
  'news',
  'announcements',
  'friday_sermons',
  'activities',
  'projects',
  'services',
  'ministers',
  'organizational_structure',
  'media_gallery',
  'social_services',
  'notifications',
  'audit_logs',
  'system_settings',
  'user_permissions',
  'e_services',
  'gis_data',
  'reports',
  'backups',
  'search_history',
  'waqf_registry'
];

class DatabaseImporter {
  constructor() {
    this.sourceClient = createClient(SOURCE_SUPABASE_URL, SOURCE_SUPABASE_ANON_KEY);
    this.targetClient = createClient(TARGET_SUPABASE_URL, TARGET_SUPABASE_ANON_KEY);
    this.stats = {
      totalTables: 0,
      successfulTables: 0,
      failedTables: 0,
      totalRows: 0,
      errors: []
    };
  }

  async importTable(tableName, batchSize = 100) {
    try {
      console.log(`\n📥 استيراد الجدول: ${tableName}`);

      const { data: sourceData, error: fetchError } = await this.sourceClient
        .from(tableName)
        .select('*');

      if (fetchError) {
        if (fetchError.message.includes('does not exist') || fetchError.code === '42P01') {
          console.log(`⚠️  الجدول ${tableName} غير موجود في قاعدة البيانات المصدر`);
          return { success: true, rows: 0, skipped: true };
        }
        throw fetchError;
      }

      if (!sourceData || sourceData.length === 0) {
        console.log(`ℹ️  الجدول ${tableName} فارغ`);
        return { success: true, rows: 0 };
      }

      console.log(`   وجد ${sourceData.length} صف للاستيراد`);

      for (let i = 0; i < sourceData.length; i += batchSize) {
        const batch = sourceData.slice(i, i + batchSize);
        const progress = Math.min(i + batchSize, sourceData.length);

        const { error: insertError } = await this.targetClient
          .from(tableName)
          .upsert(batch, { onConflict: 'id' });

        if (insertError) {
          throw insertError;
        }

        console.log(`   تقدم: ${progress}/${sourceData.length} صف`);
      }

      console.log(`✅ تم استيراد ${sourceData.length} صف من ${tableName}`);
      return { success: true, rows: sourceData.length };

    } catch (error) {
      console.error(`❌ فشل استيراد ${tableName}:`, error.message);
      return { success: false, rows: 0, error: error.message };
    }
  }

  async importAll() {
    console.log('🚀 بدء عملية الاستيراد الشاملة');
    console.log(`📊 عدد الجداول: ${ALL_TABLES.length}`);
    console.log('=' .repeat(60));

    const startTime = Date.now();

    for (const tableName of ALL_TABLES) {
      this.stats.totalTables++;

      const result = await this.importTable(tableName);

      if (result.skipped) {
        continue;
      }

      if (result.success) {
        this.stats.successfulTables++;
        this.stats.totalRows += result.rows;
      } else {
        this.stats.failedTables++;
        this.stats.errors.push({
          table: tableName,
          error: result.error
        });
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('\n' + '='.repeat(60));
    console.log('📈 تقرير الاستيراد النهائي');
    console.log('='.repeat(60));
    console.log(`✅ جداول ناجحة: ${this.stats.successfulTables}/${this.stats.totalTables}`);
    console.log(`❌ جداول فاشلة: ${this.stats.failedTables}`);
    console.log(`📊 إجمالي الصفوف: ${this.stats.totalRows.toLocaleString()}`);
    console.log(`⏱️  الوقت المستغرق: ${duration} ثانية`);

    if (this.stats.errors.length > 0) {
      console.log('\n⚠️  الأخطاء:');
      this.stats.errors.forEach(({ table, error }) => {
        console.log(`   - ${table}: ${error}`);
      });
    }

    console.log('\n✨ اكتملت عملية الاستيراد!');
  }

  async importSpecificTables(tableNames) {
    console.log('🚀 بدء عملية الاستيراد المحددة');
    console.log(`📊 عدد الجداول: ${tableNames.length}`);
    console.log('=' .repeat(60));

    const startTime = Date.now();

    for (const tableName of tableNames) {
      if (!ALL_TABLES.includes(tableName)) {
        console.log(`⚠️  الجدول ${tableName} غير موجود في القائمة`);
        continue;
      }

      this.stats.totalTables++;
      const result = await this.importTable(tableName);

      if (result.skipped) {
        continue;
      }

      if (result.success) {
        this.stats.successfulTables++;
        this.stats.totalRows += result.rows;
      } else {
        this.stats.failedTables++;
        this.stats.errors.push({
          table: tableName,
          error: result.error
        });
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('\n' + '='.repeat(60));
    console.log('📈 تقرير الاستيراد النهائي');
    console.log('='.repeat(60));
    console.log(`✅ جداول ناجحة: ${this.stats.successfulTables}/${this.stats.totalTables}`);
    console.log(`❌ جداول فاشلة: ${this.stats.failedTables}`);
    console.log(`📊 إجمالي الصفوف: ${this.stats.totalRows.toLocaleString()}`);
    console.log(`⏱️  الوقت المستغرق: ${duration} ثانية`);

    if (this.stats.errors.length > 0) {
      console.log('\n⚠️  الأخطاء:');
      this.stats.errors.forEach(({ table, error }) => {
        console.log(`   - ${table}: ${error}`);
      });
    }

    console.log('\n✨ اكتملت عملية الاستيراد!');
  }

  async testConnection() {
    console.log('🔍 اختبار الاتصال بقواعد البيانات...\n');

    try {
      const { data: sourceData, error: sourceError } = await this.sourceClient
        .from('users')
        .select('count');

      if (sourceError) {
        console.log('❌ فشل الاتصال بقاعدة البيانات المصدر:', sourceError.message);
        return false;
      }
      console.log('✅ الاتصال بقاعدة البيانات المصدر ناجح');

      const { data: targetData, error: targetError } = await this.targetClient
        .from('users')
        .select('count')
        .limit(1);

      if (targetError) {
        console.log('❌ فشل الاتصال بقاعدة البيانات الهدف:', targetError.message);
        return false;
      }
      console.log('✅ الاتصال بقاعدة البيانات الهدف ناجح\n');

      return true;
    } catch (error) {
      console.error('❌ خطأ في اختبار الاتصال:', error.message);
      return false;
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const importer = new DatabaseImporter();

  if (command === 'test') {
    await importer.testConnection();
    return;
  }

  if (command === 'tables') {
    const tablesToImport = args.slice(1);
    if (tablesToImport.length === 0) {
      console.log('❌ يرجى تحديد أسماء الجداول');
      console.log('مثال: node scripts/import-from-source.js tables users waqf_lands');
      return;
    }
    await importer.importSpecificTables(tablesToImport);
    return;
  }

  const connectionOk = await importer.testConnection();
  if (!connectionOk) {
    console.log('\n❌ يرجى التحقق من معلومات الاتصال والمحاولة مرة أخرى');
    return;
  }

  await importer.importAll();
}

main().catch(console.error);
