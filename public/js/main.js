$(document).ready(() => {
  (function setActiveTab() {
    const url = window.location.href.trim().split('?')[0].split('/');
    const endpoint = url[url.length - 1];
    if (endpoint === 'analytics') {
      $('#home_page').removeClass('active');
      $('#analytics_page').addClass('active');
    } else {
      $('#analytics_page').removeClass('active');
      $('#home_page').addClass('active');
    }
  }());
});
