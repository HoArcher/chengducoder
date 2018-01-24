// 基础配置信息
let Config = {

};

// 不同环境下采用不同环境
let ConfigEvn = {}

// 开发版本
if (process.env.NODE_ENV === `development`) {
    ConfigEvn = {api: 'http://api.test.ucuxin.com/'}
}

// 正式版本
if (process.env.NODE_ENV === `production`) {
    ConfigEvn = {api: 'http://api.ucuxin.com/'}
}

Object.assign(Config, ConfigEvn)
export default Config
