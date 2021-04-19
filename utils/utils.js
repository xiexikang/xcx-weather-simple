//请求方法
const requestAjax = {
  get(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'get',
        url: url,
        data: data,
        header: {
          "content-type": "application/json"
        },
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'post',
        url: url,
        data: data,
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
}

module.exports = {
  requestAjax,
}