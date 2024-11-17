// src/utils/storage-tests.ts
import { supabase } from './supabase-client';

export async function testStorageSetup() {
  console.log('🧪 Starting Storage Tests...');

  try {
    // 1. Test Upload
    console.log('\n📤 Testing file upload...');
    const testFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('temp_uploads')
      .upload(`test-${Date.now()}.jpg`, testFile);

    if (uploadError) {
      console.error('❌ Upload failed:', uploadError.message);
      return {
        success: false,
        error: uploadError.message,
        step: 'upload'
      };
    }

    console.log('✅ Upload successful:', uploadData?.path);

    // 2. Test Download
    if (uploadData?.path) {
      console.log('\n📥 Testing file download...');
      const { data: downloadData, error: downloadError } = await supabase.storage
        .from('temp_uploads')
        .download(uploadData.path);

      if (downloadError) {
        console.error('❌ Download failed:', downloadError.message);
        return {
          success: false,
          error: downloadError.message,
          step: 'download'
        };
      }

      console.log('✅ Download successful');
    }

    // 3. Test Report Access
    console.log('\n📄 Testing report access...');
    const { data: reportData, error: reportError } = await supabase.storage
      .from('claim_reports')
      .list();

    if (reportError) {
      console.log('✅ Reports are protected:', reportError.message);
    } else {
      console.log('Reports accessible:', reportData);
    }

    return {
      success: true,
      message: 'All tests completed successfully'
    };

  } catch (error) {
    console.error('❌ Test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      step: 'unknown'
    };
  }
}