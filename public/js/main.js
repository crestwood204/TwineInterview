$(document).ready(() => {
  (function setActiveTab() {
    const url = window.location.href.trim().split('?')[0].split('/');
    const endpoint = url[url.length - 1];
    if (endpoint === '') {
      $('#home_page').addClass('active');
    }
  }());
});
