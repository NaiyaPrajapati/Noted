function isLogin() {
  if (
    localStorage.getItem("token") != null &&
    localStorage.getItem("email") != null &&
    localStorage.getItem("username") != null
  ) {
    return true;
  }
  return false;
}

export default isLogin;
