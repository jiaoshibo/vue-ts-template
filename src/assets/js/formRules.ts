// 电话
let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/

//座机
var officePhoneReg = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}(-\d{1,4})?$/

// 必须为数字
let numberReg = /^\d+$|^\d+[.]?\d+$/

// 必须为字母
let ENReg = /^[a-zA-Z]+$/

// 联系人
let contactsReg = /^[\u0391-\uFFE5A-Za-z0-9\d]+$/

// 邮箱
let emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/

let ipAddressReg = /(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))/

let postalCode = /[0-9]\d{5}(?!\d)$/

//版本号校验
let version = /^[\u4e00-\u9fa5a-zA-Z0-9\.\_]{2,20}$/

// From表单验证规则  可用于公用的校验部分
export const FormValidate = {

  /** 只能数字的验证 */
  validateNumber (rule:any[], value:any, callback: (arg0?: Error) => void) {
    if (value) {
      if (!numberReg.test(value)) {
        callback(new Error('只能输入数字'))
      } else {
        callback()
      }
    } else {
      callback()
    }
  },
  /** 端口号验证 */
  validatePort (rule:any[], value:any, callback: (arg0?: Error) => void) {
    if (value) {
      if (!numberReg.test(value)) {
        callback(new Error('只能输入数字'))
      } else if (value < 1 || value > 65535) {
        callback(new Error('端口号范围应在1-65535之间'))
      } else {
        callback()
      }
    } else {
      callback()
    }
  },
  validateVersion (rule:any[], value:any, callback: (arg0?: Error) => void) {
    if (value) {
      if (!version.test(value)) {
        callback(new Error('只能输入中英文、数字、下划线、小数点，长度为2至20'))
      }  else {
        callback()
      }
    } else {
      callback()
    }
  },
  /** 只能字母的验证 */
  validateEN (rule:any[], value:any, callback: (arg0?: Error) => void) {
    if (value) {
      if (!ENReg.test(value)) {
        callback(new Error('只能输入英文字母'))
      } else {
        callback()
      }
    } else {
      callback()
    }
  },

  /** 联系人 */
  validateContacts (rule:any[], value:any, callback: (arg0?: Error) => void) {
    if (!value) {
      return callback(new Error('请输入名称'))
    }
    if (!contactsReg.test(value)) {
      callback(new Error('格式不正确'))
    } else {
      callback()
    }
  },

  /** 邮箱的验证规则 */
  validateEmail (rule:any[], value:any, callback: (arg0?: Error) => void) {
    if (value) {
      if (!emailReg.test(value)) {
        callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    } else {
      callback()
    }
  },

  /** 手机号码的验证 */
  validatePhone (rule:any[], value:any, callback: (arg0?: Error) => void) {
    if (value) {
      if (!phoneReg.test(value)) {
        callback(new Error('手机号码格式不正确'))
      } else {
        callback()
      }
    } else {
      callback()
    }
  },
  /** 座机电话 */
  validateOfficePhone (rule:any[], value:any, callback: (arg0?: Error) => void) {
    if (value) {
      if (!officePhoneReg.test(value)) {
        callback(new Error('座机电话号码格式不正确'))
      } else {
        callback()
      }
    } else {
      callback()
    }
  },

  validatePhoneOrOffice (rule:any[], value:any, callback: (arg0?: Error) => void) {
    //不必填，但只要输入会校验格式
    if (value) {
      if (!(phoneReg.test(value) || officePhoneReg.test(value))) {
        callback(new Error('手机号码或者座机电话号码格式不正确'))
      } else {
        callback()
      }
    } else {
      callback()
    }

  },

  /** 邮政编码 */
  validatePosotalCode (rule:any[], value:any, callback: (arg0?: Error) => void) {
    //不必填，但只要输入会校验格式
    if (value) {
      if (!postalCode.test(value)) {
        callback(new Error('邮政编码应为6位数字'))
      } else {
        callback()
      }
    } else {
      callback()
    }

  },

  /** 身份证的验证规则 */
  validateIdentifyId (rule:any[], value:any, callback: (arg0?: Error) => void) {
    if (!value) {
      return callback(new Error('身份证不能为空'))
    }
    if (checkCode(value)) {
      var date = value.substring(6, 14)
      if (checkDate(date)) {
        if (checkProv(value.substring(0, 2))) {
          callback()
        }
      }
    } else {
      callback(new Error('请输入正确的身份证号码'))
    }
  },

  /**
   * ip 地址验证规则
   */
  validateIpAddress (rule:any[], value:any, callback: (arg0?: Error) => void) {
    if (value) {
      if (!ipAddressReg.test(value)) {
        return callback(new Error('请输入正确的IP地址'))
      } else {
        callback()
      }
    } else {
      callback()
    }
  }
}
/**
 * 检查身份编码
 * @param val 
 * @returns 
 */
function checkCode(val:any) {
  var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
  var code = val.substring(17)
  if (p.test(val)) {
    var sum = 0
    for (var i = 0; i < 17; i++) {
      sum += val[i] * factor[i]
    }
    if (parity[sum % 11] == code.toUpperCase()) {
      return true
    }
  }
  return false
}

/**
 * 检查日期
 * @param val 
 * @returns 
 */
var checkDate = function (val:any) {
  var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/
  if (pattern.test(val)) {
    var year = val.substring(0, 4)
    var month = val.substring(4, 6)
    var date = val.substring(6, 8)
    var date2 = new Date(year + '-' + month + '-' + date)
    if (date2 && date2.getMonth() == (parseInt(month) - 1)) {
      return true
    }
  }
  return false
}


/**
 * 检查省份
 * @param val 
 * @returns 
 */
var checkProv = function (val:any) {
  var pattern = /^[1-9][0-9]/
  var provs = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门'
  }
  if (pattern.test(val)) {
    // if (provs[val]) {
    //   return true
    // }
  }
  return false
}