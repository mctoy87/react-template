// чтобы правильно прописывать пути
const path = require('path');
// экспортируем плагины. Пишем с большой буквы т.к.
// там нах-ся классы, которые будем вызывать через new
const HtnmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// определим какой mode(сборка production или development)
const mode = process.env.NODE_ENV || 'development';
// создаем сами настройки
module.exports = {
  mode,
  // позволяет на проде не использовать sourcemap
  devtool: mode === 'development' ? 'eval' : false,
  // входной файл - где нах-ся весь проект
  // (+ остальные папки/файлы = может расширение === '.js')
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
    open: true,
    // горячая перезагрузка
    hot: true,
  },
  plugins: [
    // плагины внутрь принимают настройки
    new HtnmlWebpackPlugin({
      // складываем в папку 'public'(можно в 'src').
      // Позволяем обрабатывать html если что-то подключено
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        // позволяет обрабатывать '.js', '.jsx', '.ts', '.tsx'
        test: /\.[tj]sx?$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
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
        // 4) MiniCssExtractPlugin положит его
        // в отдельный файл(а не оставит в html)
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: ['postcss-preset-env'],
            }
          }
        }, 'sass-loader'],
      },
      {
        // позволяет обрабатывать '.jpg', '.jpeg', '.gif', svg, png
        test: /\.(jpg|jpeg|gif|svg|png)$/i,
        // обработка с помощью встроенного в webpack ресурса
        // укажим тип и он поймет что нужно положить в assets
        type: 'asset/resource'
      },
      {
        // позволяет обрабатывать '.woff', '.woff2'
        test: /\.(woff|woff2)$/i,
        // обработка с помощью встроенного в webpack ресурса
        // укажим тип и он поймет что нужно положить в assets
        type: 'asset/resource',
        // чтобы не кидать шрифты в корень, а выбрать папку и имя
        generator: {
          filename: 'fonts/[hash][ext]',
        }
      },
      {
        // позволяет обрабатывать '.jpg', '.jpeg', '.gif', svg, png
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  }
};
