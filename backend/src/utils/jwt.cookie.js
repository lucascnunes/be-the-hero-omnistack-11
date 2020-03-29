module.exports = function (request) {
  if (request.cookies && request.cookies.access_token) {
    return request.cookies.access_token;
  }
  return null;
}