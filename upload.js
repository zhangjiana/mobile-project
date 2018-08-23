const Client = require('ssh2-sftp-client')
const ora = require('ora')
const path = require('path')
const glob = require('glob')
const sftp = new Client()

// 本地目录
const localPath = path.join(__dirname, 'dist').replace(/\\/g, '/')
// 远程目录
const remotePath = '/var/www/html/mobile-project'
// 允许上传的文件扩展名
const allowFiles = ['html', 'css', 'js', 'png', 'jpg', 'jpeg', 'gif', 'eot', 'svg', 'ttf', 'woff', 'map']

const spinner = ora('开始上传...').start()

// 连接 sftp
sftp.connect({
    host: '47.98.222.11',
    port: '22',
    username: 'root',
    password: 'zjlp216503%'
}).then(() => {
    // 先删除目录
    return sftp.rmdir(remotePath, true)
}).then(() => {
    // 再创建目录
    return Promise.all([
        sftp.mkdir(`${remotePath}/css`, true),
        sftp.mkdir(`${remotePath}/js`, true)
    ])
}).then(() => {
    // 上传所有匹配到的文件
    const files = glob.sync(`${localPath}/**/*.{${allowFiles.join(',')}}`)
    console.log(files)
    return Promise.all(
        files.map(localFile => {
            const remoteFile = localFile.replace(localPath, remotePath)
            return sftp.put(localFile, remoteFile)
        })
    )
}).then(() => {
    spinner.succeed('上传完成')
    process.exit()
}).catch(err => {
    spinner.fail('上传失败')
    process.exit()
})

