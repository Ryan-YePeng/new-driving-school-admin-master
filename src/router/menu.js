module.exports = {
  /**
   * @description 管理员菜单
   */
  menu_admin: [
    {
      "id": 1,
      "name": "网站管理",
      "icon": "website",
      "path": "website",
      "component": "website",
      "children": [
        {
          "id": 1,
          "name": "轮播图管理",
          "icon": "carousel",
          "path": "carousel",
          "component": "carousel"
        },
        {
          "id": 2,
          "name": "导航栏管理",
          "icon": "navigation",
          "path": "navigation",
          "component": "navigation"
        },
        {
          "id": 3,
          "name": "代金券管理",
          "icon": "voucher",
          "path": "voucher",
          "component": "voucher"
        },
        {
          "id": 4, "name":
              "位置管理",
          "icon": "location",
          "path": "location",
          "component": "location"
        },
        {
          "id": 5,
          "name": "推荐驾校管理",
          "icon": "recommendshcool",
          "path": "recommendshcool",
          "component": "recommendshcool"
        },
        {
          "id": 10,
          "name": "文章管理",
          "icon": "article",
          "path": "article",
          "component": "article"
        }
      ]
    },
    {
      "id": 2,
      "name": "用户管理",
      "icon": "user",
      "path": "user",
      "component": "user",
      "children": []
    },
    {
      "id": 3,
      "name": "驾校",
      "icon": "school",
      "path": "school",
      "component": "school",
      "children": []
    },
    {
      "id": 4,
      "name": "教练",
      "icon": "coach",
      "path": "coach",
      "component": "coach",
      "children": []
    },
    {
      "id": 5,
      "name": "审核",
      "icon": "audit",
      "path": "audit",
      "component": "audit",
      "children": [
        {
          "id": 6,
          "name": "驾校入驻列表",
          "icon": "schoolin",
          "path": "schoolin",
          "component": "schoolin"
        },

        {
          "id": 11,
          "name": "教练入驻审核",
          "icon": "coachin",
          "path": "coachin",
          "component": "coachin"
        }
      ]
    },
    {
      "id": 6,
      "name": "信息管理",
      "icon": "info",
      "path": "info",
      "component": "info",
      "children": [
        {
          "id": 12,
          "name": "订单管理",
          "icon": "order",
          "path": "order",
          "component": "order"
        },
        {
          "id": 13,
          "name": "表单管理",
          "icon": "form",
          "path": "form",
          "component": "form"
        }
      ]
    },
    {
      "id": 7,
      "name": "账号管理",
      "icon": "account",
      "path": "account",
      "component": "account",
      "children": []
    }
  ],
  /**
   * @description 学校菜单
   */
  menu_school: [
    {
      "id": 8,
      "name": "驾校信息",
      "icon": "information",
      "path": "information",
      "component": "information",
      "children": []
    },
    {
      "id": 9,
      "name": "驾校课程",
      "icon": "course",
      "path": "course",
      "component": "course",
      "children": []
    },
    {
      "id": 10,
      "name": "学生预约",
      "icon": "appointment",
      "path": "appointment",
      "component": "appointment",
      "children": []
    },
    {
      "id": 11,
      "name": "驾校评论",
      "icon": "comment",
      "path": "comment",
      "component": "comment",
      "children": []
    },
    {
      "id": 12,
      "name": "驾校咨询",
      "icon": "school_consult",
      "path": "school_consult",
      "component": "school_consult",
      "children": []
    },
    {
      "id": 13,
      "name": "教练咨询",
      "icon": "coach_consult",
      "path": "coach_consult",
      "component": "coach_consult",
      "children": []
    },
    {
      "id": 14,
      "name": "驾校订单",
      "icon": "order",
      "path": "order",
      "component": "order",
      "children": []
    },
    {
      "id": 15,
      "name": "驾校代金卷",
      "icon": "voucher",
      "path": "voucher",
      "component": "voucher",
      "children": []
    }
  ]
};


