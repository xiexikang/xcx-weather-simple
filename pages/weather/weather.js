// pages/weather/weather.js
const app = getApp();
let globalData = app.globalData;
let utils = require('../../utils/utils.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //天气参数
    weatherParams: {
      key: '', //密钥
      location: 101190701, //默认江苏盐城
    },
    cityName: '盐城市', //当前城市名
    //天气信息
    weatherInfo: {},
    //未来3天天气列表
    dailyList: [],
    //生活指数列表
    lifeList: [],
  },

  //初始化
  init() {
    if (app.globalData.cityId) {
      let location = 'weatherParams.location';
      this.setData({
        [location]: app.globalData.cityId,
        cityName: app.globalData.cityName
      })
    }
    this.getWeather();
  },

  //获取今日天气
  getWeather() {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    let params = that.data.weatherParams;
    Object.assign(params, {
      key: globalData.key
    });
    utils.requestAjax.get('https://devapi.qweather.com/v7/weather/now', params)
      .then((res) => {
        wx.hideLoading();
        if (res.data.code != 200) {
          return
        }
        that.setData({
          weatherInfo: res.data.now
        })
      })
    that.getThreeWeather(params);
    that.getLifeList(params);
  },

  //未来3天
  getThreeWeather(params) {
    let that = this;
    utils.requestAjax.get('https://devapi.qweather.com/v7/weather/3d', params)
      .then((res) => {
        if (res.data.code != 200) {
          return
        }
        that.setData({
          dailyList: res.data.daily
        })
      })
  },

  //生活指数
  getLifeList(params) {
    let that = this;
    Object.assign(params, {
      type: 0
    });
    utils.requestAjax.get('https://devapi.qweather.com/v7/indices/1d', params)
      .then((res) => {
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
    this.init();
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