/**
 * 设置token
 * @param token
 * @returns
 */
export const setToken = (token) => window.localStorage.setItem("auth_token", token);
/**
 * 获取token
 * @returns
 */
export const getToken = () => window.localStorage.getItem("auth_token");
/**
 * 获取token
 * @returns
 */
export const clearToken = () => window.localStorage.removeItem("auth_token");
