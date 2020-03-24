module.exports = {
  /**
   * @description 管理员菜单
   */
  menu_admin: [
    {
      "name": "网站管理",
      "icon": "website",
      "path": "website",
      "component": "website",
      "children": [
        {
          "name": "轮播图管理",
          "icon": "carousel",
          "path": "carousel",
          "component": "carousel"
        },
        {
          "name": "位置管理",
          "icon": "location",
          "path": "location",
          "component": "location"
        },
        {
          "name": "推荐驾校管理",
          "icon": "recommendshcool",
          "path": "recommendshcool",
          "component": "recommendshcool"
        },
        {
          "name": "文章管理",
          "icon": "article",
          "path": "article",
          "component": "article"
        },
        {
          "name": "优惠劵管理",
          "icon": "voucher",
          "path": "voucher",
          "component": "voucher"
        }
      ]
    },
    {
      "name": "用户管理",
      "icon": "user",
      "path": "user",
      "component": "user",
      "children": []
    },
    {
      "name": "驾校",
      "icon": "school",
      "path": "school",
      "component": "school",
      "children": []
    },
    {
      "name": "教练",
      "icon": "coach",
      "path": "coach",
      "component": "coach",
      "children": []
    },
    {
      "name": "入驻审核",
      "icon": "audit",
      "path": "audit",
      "component": "audit",
      "children": [
        {
          "name": "驾校入驻审核",
          "icon": "schoolin",
          "path": "schoolin",
          "component": "schoolin"
        },
        {
          "name": "教练入驻审核",
          "icon": "coachin",
          "path": "coachin",
          "component": "coachin"
        },
        {
          "name": "入驻电话管理",
          "icon": "phone",
          "path": "phone",
          "component": "phone"
        }
      ]
    }
  ],
  /**
   * @description 学校菜单
   */
  menu_school: [
    {
      "name": "驾校信息",
      "icon": "information",
      "path": "information",
      "component": "information",
      "children": []
    },
    {
      "name": "驾校课程",
      "icon": "course",
      "path": "course",
      "component": "course",
      "children": []
    },
    {
      "name": "驾校评论",
      "icon": "comment",
      "path": "comment",
      "component": "comment",
      "children": []
    },
    {
      "name": "报名咨询",
      "icon": "school_consult",
      "path": "school_consult",
      "component": "school_consult",
      "children": []
    },
    // {
    //   "name": "驾校代金卷",
    //   "icon": "voucher",
    //   "path": "voucher",
    //   "component": "voucher",
    //   "children": []
    // },
    {
      "name": "学生预约",
      "icon": "appointment",
      "path": "appointment",
      "component": "appointment",
      "children": []
    },
    {
      "name": "教练管理",
      "icon": "coach",
      "path": "coach",
      "component": "coach",
      "children": []
    }
  ]
};


