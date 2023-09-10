const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isEnvProduction = process.env.NODE_ENV === "production";
const isEnvDevelopment = process.env.NODE_ENV === "";

const imageInlineSizeLimit = parseInt(
    process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
  );

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js",
        clean: true
    },
    mode: process.env.NODE_ENV || "development",
    resolve: {
        modules: [
            path.resolve(__dirname, "public"),
            "node_modules"
        ]
    },
    devServer: {
        static: path.join(__dirname, '/public'),
        devMiddleware: {
            publicPath: '/'
        },
        port: 3000,
        hot: true,
        liveReload: true,
        historyApiFallback: true,
        open: true,

    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                      presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                  }
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"]
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                type: 'asset',
                parser: {
                  dataUrlCondition: {
                    maxSize: imageInlineSizeLimit,
                  },
                },
              },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
            hash: true
        })
    ],
};
