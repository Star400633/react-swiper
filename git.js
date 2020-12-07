// 此文件与项目业务和打包无关，只是本地自动提交合并代码的小工具 提交代码时在项目目录下运行 node git.js即可
const shell = require('shelljs')
const inquirer = require('inquirer')
const { exec, echo, exit } = shell

// 主函数
main()

async function main () {
  await exec(`git status`)
  const quesList = [
    "提交当前分支代码并推送到远程",
    "提交当前分支代码并合并到dev分支",
    "提交当前分支代码并合并到release分支",
    "提交当前分支代码并合并到sandbox分支",
  ]
  const promptList = [{
    type: 'rawlist',
    message: '请输入您想要的操作:',
    name: 'optType',
    choices: quesList,
    filter: function(val) { return (quesList.indexOf(val)+1) },
  }]
  const optType = await inquirer.prompt(promptList).then(answers => {
    return answers.optType
  })
  const commitMsg = await inquirer.prompt({
    name: 'commitMsg', message: '请输入本次提交内容:'
  }).then(answers => {
    return answers.commitMsg
  })
  
  const crtBrh = await getGitBranch()
  switch(optType) {
    case 1:
      exec(`git add ./ && git commit -m "${commitMsg}" && git push`)
      exit(1)
      break
    case 2:
      mergeBranch('dev', crtBrh, commitMsg).then(res => {
        res ? echo(`操作成功~`) : echo('操作失败，请检查代码~')
        exit(1)
      })
      break
    case 3:
      mergeBranch('release', crtBrh, commitMsg).then(res => {
        res ? echo(`操作成功~`) : echo('操作失败，请检查代码~')
        exit(1)
      })
      break
    case 4:
      mergeBranch('sandbox', crtBrh, commitMsg).then(res => {
        res ? echo(`操作成功~`) : echo('操作失败，请检查代码~')
        exit(1)
      })
      break
    default:
      console.log('无法识别的操作类型~')
  }
}

// 获取git分支名
function getGitBranch () {
  return new Promise(function (resolve, reject) {
    exec(`git symbolic-ref --short -q HEAD`, function (code, stdout, stderr) {
      if (code === 0) {
        resolve(stdout.trim())
      } else {
        reject(stderr)
      }
    })
  })
}

/**
 * 合并分支
 * @param target 目标分支 其他分支要合并到此分支上
 * @param crt 合并分支 即把此分支上的代码合并到 target 上面
 * @param msg 合并信息
 */
function mergeBranch(target, crt, msg='') {
  return new Promise(resolve => {
    exec(`git add ./ && git commit -m "${msg}" && git push`)
    exec(`git checkout ${target} && git pull`)
    exec(`git merge -m "Merge branch ${crt} into ${target}" ${crt}`)
    exec(`git push && git checkout ${crt}`)
    resolve(true)
  })
}
