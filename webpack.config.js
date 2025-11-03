const path = require('path');

module.exports = {
  entry: './src/main.js', // Đường dẫn tới file JavaScript chính của bạn
  output: {
    filename: 'bundle.js', // Tên file output
    path: path.resolve(__dirname, 'public/js'), // Đường dẫn tới thư mục output
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Rule để xử lý file CSS
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'development', // Chế độ development để dễ debug
  watch: true, // Tự động watch và bundle lại khi file thay đổi
};
