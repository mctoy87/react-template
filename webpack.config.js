// чтобы правильно прописывать пути
const path = require('path');
// экспортируем плагины. Пишем с большой буквы т.к. такм нах-ся классы, которые будем вызывать через new
const HtnmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPligin = require('mini-css-extract-plugin');

// определим какой mode(сборка production или development)
const mode = process.env.NODE__ENV || 'development';
// создаем сами настройки
module.exports = {
  mode,
  // позволяет на проде не использовать sourcemap
  devTool: mose === 'development' ? 'eval' : false,
  // входной файл - где нах-ся весь проект (+ остальные папки/файлы = может расширение === '.js')
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  // выходной файл - куда возвращаем конечный рез-т
  output: {
    // путь 
    path: path.resolve(__dirname, 'dist'),
    // очищаем
    clean: true,
    // назв-е меняется только в хэшем
    filename: '[name][contenthash].js',
    // шрифты, картинки
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  resolve: {
    // чтобы при импорте не указывать расширения
    // .ts и .tsx это typeScript файлы
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    // запускается только если пропишем команду serve
    port: 3000,
    // браузер сразу откроет  
    open:true, 
    // горячая перезагрузка
    hot: true,
  },
  plugins: [
    // плагины внутрь принимают настройки
    new HtnmlWebpackPlugin({
      // складываем в папку 'public'(можно в 'src'). Позволяем обрабатывать html если что-то подключено
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new MiniCssExtractPligin(),
  ],
  module: {
    rules: [
      {
        // позволяет обрабатывать '.js', '.jsx', '.ts', '.tsx'
        test: /\.[tj]sx?$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          }
        },
      },
      {
        // позволяет обрабатывать '.sass', '.scss', '.css'
        test: /\.(sa|sc|c)ss$/i,
        // работает справа налево:
        // 1) 'sass-loader' обработает scss||sass (если есть)
        // 2)  'postcss-loader' добавит префиксы. Для него нужны настройки!
        // 3) 'css-loader' все собирает
        // 4) MiniCssExtractPligin положит его в отдельный файл
        use: [MiniCssExtractPligin.loader, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: ['postcss-preset-env'],
            }
          }
        }, 'sass-loader'],
      }
    ],
  }
};