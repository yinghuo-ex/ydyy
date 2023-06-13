// 导入axios配置
import service from '../utils/request'

// 登录
export function loginTosystem (username, password) {
  return service.get('/login/loginTosystem', {
    headers: { 'Content-Type': 'application/json' },
    params: {
      username: username,
      password: password
    }
  })
}
