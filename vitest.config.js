module.exports = {
    // 指定测试文件的匹配模式
    testMatch: '**/*.test.{js,jsx,ts,tsx}',
  
    // 指定测试环境
    environment: 'jsdom',
  
    // 指定覆盖率报告的输出目录
    coverageDir: './coverage',
  
    // 指定是否在测试结束后自动打开覆盖率报告
    open: true,
  };
  