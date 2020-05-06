/**
 * 过滤特殊字符
 */
export function stripscript(s) {
  const pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]"
  );
  let rs = "";
  for (let i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, "");
  }
  return rs;
}

/**
 * 验证---用户名
 * @param str
 */
export function regUserName(str) {
  let reg = /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
  return reg.test(str);
}

/**
 * 验证---密码
 * @param str
 */
export function regPassWord(str) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return reg.test(str);
}

/**
 * 验证---验证码
 * @param str
 */
export function regCode(str) {
  let reg = /^[0-9A-Za-z]{6}$/;
  return reg.test(str);
}
