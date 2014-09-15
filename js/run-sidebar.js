/**
 * @fileoverview Run sidebar.
 */


window.console.log('sidebar running');

chrome.permissions.getAll(function(x) {
  console.log(x);
});

