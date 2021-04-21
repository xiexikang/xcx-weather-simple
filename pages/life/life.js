// pages/life/life.js
const app = getApp();
let globalData = app.globalData;
let utils = require('../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster:'http://cdn-leo-img.hellorobotedu.com/2b12f93eae34454995f5ecc3b95ce337',
    //生活指数列表
    lifeList: [],
  },

   //初始化
   init() {
    this.getLifeList();
  },

  //生活指数
  getLifeList() {
    wx.showLoading({
      title: '加载中',
    })
    let that = this, params = {};
    Object.assign(params, {
      key: globalData.key,
      location:globalData.cityId,
      type: 0
    });
    utils.requestAjax.get('https://devapi.qweather.com/v7/indices/1d', params)
      .then((res) => {
        console.log(res)
        wx.hideLoading();
        if (res.data.code != 200) {
          return
        }
        that.setData({
          lifeList: res.data.daily
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})