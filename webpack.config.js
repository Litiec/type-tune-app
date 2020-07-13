const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports =(env)=>{
    const isProduction = env ==='production';
    const mode = isProduction ? 'production' : 'development';
    const MiniCssExtract = new MiniCssExtractPlugin({
        filename: 'styles.css'
    });
    return {
        mode: mode,
        entry:'./src/app.js',
        output:{
            path: path.join(__dirname,'public','dist'),
            filename:'bundle.js'
        },
        module:{
            rules:[{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },{
                test:/\.s?css$/,
                use:[MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options:{sourceMap:true}
                },{
                    loader: 'sass-loader',
                    options:{sourceMap:true}
                }]
            }]
        },
        plugins:[MiniCssExtract],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer:{
            contentBase: path.join(__dirname,'public'),
            historyApiFallback:true,
            publicPath:'/dist/'
        }
    };

};


