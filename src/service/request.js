import axios from 'axios'
import {Message, Loading, MessageBox} from 'element-ui'



const service = axios.create({
    timeout: 50 * 1000,
    headers: {
      common: {
        Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjEyIiwibG9naW5OYW1lIjoiYWRtaW4iLCJkZXBhcnRtZW50Q29kZSI6IjAwMSIsInNjb3BlIjpbXSwibmFtZSI6Iui2hee6p-euoeeQhuWRmCIsInRlbmFudElkIjoic3lzdGVtIiwiaWQiOiIxIiwiaXNBZG1pbiI6dHJ1ZSwiZXhwIjoxNjU5OTYzNTEzLCJqdGkiOiIwZjUzNTNlNC0zMzAxLTRlY2EtYmZmMS1hMDE3MjQ3ZjdiZjIiLCJjbGllbnRfaWQiOiJpc2xhbmQifQ.Uazkkn0Si9jwvjFBv_q1uQF5LF1taf5mcdnAnbCF-50'
      }
    }
})



// 请求拦截器
service.interceptors.request.use(
    config => {
        config.headers['Access-Control-Allow-Origin'] = '*'
        config.headers.ajaxCall = true // 添加该参数可避免url重定向到login
        let token = localStorage.token
        try {
            token = token ? JSON.parse(token).token : null
        } catch (e) {
            console.error(e)
        }
        if (token) {
            config.headers.Authorization = token
        }

        if (config.url.includes('/web/')) {
            config.params.ajaxCall = true
        }
        // else {
        //   // 请求路径白名单验证，不需要验证token就可以发送
        //   for (let i = 0; i < whiteList.length; i++) {
        //     if (config.url.indexOf(whiteList[i]) !== -1) {
        //       return config
        //     }
        //   }
        //   router.push('/login')
        //   c.error('无登录信息', config.url)
        //   return
        // }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

const errorStats = ['A0200', 'A0001', 'A0201', 'A0210', 'A0220', 'A0300', 'A0301']

// 接收拦截器
// eslint-disable-next-line no-unused-vars
let messageBoxInstance = null;
service.interceptors.response.use(
    // eslint-disable-next-line complexity
    response => {
        fitQueue(response.config)
        const res = response.data
        // 下载请求执行的逻辑
        if (response.status === 200 && response.config.responseType === 'blob') {
            if (typeof response.config.blobCallback === 'function') {
                response.config.blobCallback(response)
            }
            return res
        } else {
            // 处理积木报表的错误
            if (response.config.url.indexOf('/zwjd-system/jmreport/show') !== -1) {
                if (res.code !== 200) {
                    const msg = res.msg || res.detail || '接口请求错误'
                    MessageBox.alert(msg, '警告', {
                        confirmButtonText: '确认',
                        showClose: false,
                        type: 'error'
                    })
                } else {
                    res.data = res.result
                }
            } else if (!res.data && Number(res.status) !== 200 && Number(res.code) !== 1) {
                const msg = res.msg || res.detail || '接口请求错误'
                MessageBox.alert(msg, '警告', {
                    confirmButtonText: '确认',
                    showClose: false,
                    type: 'error'
                }).then(() => {
                    if (errorStats.includes(res.status)) {
                        localStorage.clear()
                        location.href = './management.html#/login'
                    }
                })
                if (res.data === null) {
                    res.data = []
                }
            }

            // 数据正常
            if (response.config.url === '/common-data/get/all') {
                // 解析JSON列表
                return res.data.map(v => {
                    const item = JSON.parse(v.data)
                    item.databaseId = v.id
                    return item
                })
            }
            if (response.config.url === '/common-data/get') {
                // 解析JSON数据
                return JSON.parse(res.data)
            }
            return res.data
        }
    },
    error => {
        console.log(error, 'errorerrorerrorerrorerrorerror')
        // if (store.state.global.full) {
        //     return Promise.reject(error)
        // }
        if (!error.response || !error.response.config) {
            messageBoxInstance = MessageBox.alert('接口请求错误', '警告', {
                confirmButtonText: '确认',
                showClose: false,
                type: 'error'
            })
        }
        fitQueue(error.response.config)
        const status = error.response.status

        if (status === 401) {
            Message({
                message: '401: 会话过期，无操作权限，请重新登录' || 'Error: ' + status,
                type: 'error',
                duration: 5 * 1000
            })
        } else if ([1000, 10004, 403].indexOf(status) > -1) {
            if (location.href.includes('localhost')) {
                messageBoxInstance = MessageBox.alert(
                    '登录信息已失效，请重新登录',
                    '警告',
                    {
                        confirmButtonText: '确认',
                        showClose: false,

                        type: 'error'
                    }
                ).then(() => {
                    location.href = './management.html#/login'
                })
                // eslint-disable-next-line consistent-return
                return
            }
            return Promise.reject(error)
        } else {
            // showDialog('错误：网络异常，请联系运维管理员')
            let msg = '接口请求错误'
            // eslint-disable-next-line max-len
            if (error.response.data && errorStats.includes(error.response.data.status)) {
                localStorage.clear()
                msg = error.response.data.msg
                location.href = './management.html#/login'
            }
            messageBoxInstance = MessageBox.alert(msg, '警告', {
                confirmButtonText: '关闭',
                showClose: false,
                type: 'error'
            }).then(() => {
                // location.href = './web/login.do'
                // location.href = './management.html#/login'
            })
        }
        return Promise.reject(error)
    }
)

// eslint-disable-next-line init-declarations
let loadingInstance
const queue = []

function wrapFn() {
    // 开发中禁用遮罩
    // 交互配置
    const config = arguments[0] || {}
    // 每个请求默认开启遮罩
    // let showModal = ueConfig.showModal === undefined ? true : ueConfig.showModal
    /**
   * 请求的headers中hideLoading:true时不显示加载中遮罩，否则一律显示
   */
    const showModal = !config.headers || !config.headers.hideLoading
    if (showModal) {
        const _time = new Date().getTime()
        queue.push(_time)
        if (arguments[0].headers) {
            arguments[0].headers._time = _time
        } else {
            arguments[0].headers = {
                _time
            }
        }
    // c.log('queue:%s  %s', _time, arguments[0].url)
    }

    if (queue.length > 0) {
        loadingInstance = Loading.service({
            background: 'rgba(0, 0, 0, 0.5)'
        })
    }

    return service.call(this, arguments[0])
}

// 将完成的请求从队列中去除
function fitQueue(conf) {
    // 延迟300毫秒再去除，用于连续请求的时候，不会出现遮罩层闪烁的体验
    setTimeout(() => {
    // c.log('fitQueue', conf.headers._time)
        if (!conf.headers) {
            return
        }
        const matchIndex = queue.indexOf(conf.headers._time)
        if (matchIndex > -1) {
            queue.splice(matchIndex, 1)
        }
        if (loadingInstance && queue.length === 0) {
            loadingInstance.close()
        }
    // c.log('fitQueue', queue)
    }, 300)
}

export default wrapFn
