// pages/city/city.js
const app = getApp();
let globalData = app.globalData;
let utils = require('../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //城市参数
    cityParams: {
      key: '',
      location: '',
      range: 'world', //world cn
      number: 20, //0-20
    },
    likeCityList: [], //猜测喜欢的城市列表
    cityList: [], //搜索后的城市列表
    location: '', //搜索的城市名
    isShow: false, //是否显示搜索后的城市列表
  },

  //获取喜欢的城市列表
  getLikeCityList() {
    let likeCityList = [{
        id: '101010100',
        name: '北京市'
      },
      {
        id: '101280101',
        name: '广州市'
      },
      {
        id: '101020100',
        name: '上海市'
      },
      {
        id: '101280601',
        name: '深圳市'
      },
      {
        id: '101210101',
        name: '杭州市'
      },
      {
        id: '101200101',
        name: '武汉市'
      },
      {
        id: '101250101',
        name: '长沙市'
      },
      {
        id: '101050101',
        name: '哈尔滨'
      },
      {
        id: '101291602',
        name: '西双版纳'
      }
    ];
    this.setData({
      likeCityList: likeCityList
    })
  },

  //搜索城市
  bindConfirm() {
    wx.showLoading({
      title: '加载中',
    })
    let that = this,
      params = that.data.cityParams,
      obj = {
        key: globalData.key,
        location: that.data.location
      };
    Object.assign(params, obj);
    utils.requestAjax.get('https://geoapi.qweather.com/v2/city/lookup', params)
      .then((res) => {
        wx.hideLoading();
        if (res.data.code != 200) {
          that.setData({
            cityList: [],
            isShow: true,
          })
          return
        }
        that.setData({
          cityList: res.data.location,
          isShow: true,
        })
      })
  },

  //键盘输入监听
  bindInput(e) {
    let that = this;
    var value = e.detail.value;
    if (!value) {
      that.setData({
        cityList: [],
        isShow: false,
      })
      return
    }
    that.setData({
      location: value
    })
  },

  //点击选择城市
  bindChoose(e) {
    let id = e.currentTarget.dataset.id,
      name = e.currentTarget.dataset.name;
    globalData.cityId = id;
    globalData.cityName = name;
    wx.switchTab({
      url: '/pages/weather/weather',
      success(res) {
        let page = getCurrentPages().pop();
        if (page == undefined || page == null) {
          return
        }
        page.onLoad();
      }
    })
  },

  //重置值
  resetValues() {
    this.setData({
      cityList: [],
      location: '',
      isShow: false,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLikeCityList();
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
    this.resetValues();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.resetValues();
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