/**
 * @file 超小的promise实现
 * @author liyinan
 * @version 1.0
 * @date 2015-06-12
 */
define(function (require) {
  var Deferred = function () {
    if (!this instanceof Deferred) {
      return new Deferred();
    }

    var successCallbacks = [];
    var failCallbacks = [];
    var finalData = [];
    var errorMsg = "";
    var status = {
      pendding: 1,
      resolved: 2,
      rejected: 3,
    };
    var state = status.pendding;

    function handleResolve() {
      var _this = this;
      for (var i = 0; i < successCallbacks.length; i++) {
        (function (i) {
          if (finalData && finalData[0] && finalData[0].then) {
            // 最终值为promise的情况
            finalData[0].then(function () {
              successCallbacks[i].apply(_this, arguments);
            });
          } else {
            setTimeout(function () {
              successCallbacks[i].apply(_this, finalData);
            }, 0);
          }
        })(i);
      }
    }

    function handleReject() {
      var _this = this;
      for (var i = 0; i < failCallbacks.length; i++) {
        (function (i) {
          setTimeout(function () {
            failCallbacks[i].apply(_this, finalData);
          }, 0);
        })(i);
      }
    }

    function then(successCallback, failCallback) {
      var deferred = Deferred();
      if (state === status.resolved) {
        // 状态已经是resolved，直接执行successCallback
        var _this = this;
        setTimeout(function () {
          successCallback.apply(_this, finalData);
        }, 0);
      } else if (state === status.reject) {
        // 状态已经是rejected，直接执行failCallback
        var _this = this;
        setTimeout(function () {
          failCallback.call(_this, errorMsg);
        }, 0);
      } else {
        // 状态时pendding，把成功失败回调压入栈
        if (successCallback) {
          successCallbacks.push(function () {
            // 当前deferred resolved，执行回调，并把返回值传递给下一个promise
            deferred.resolve(successCallback.apply(_this, arguments));
          });
        }
        if (failCallback) {
          failCallbacks.push(function (errMsg) {
            // 执行失败回调
            failCallback(errMsg);
            // errMsg不应向下传递，下一个then的errMsg为undefined
            deferred.reject();
          });
        }
      }
      return deferred.promise();
    }

    var deferred = {
      resolve: function () {
        var data = Array.prototype.slice.call(arguments, 0);
        if (state === status.pendding) {
          finalData = data;
          state = status.resolved;
          handleResolve.call(this);
        }
      },
      reject: function (errMsg) {
        if (state === status.pendding) {
          errorMsg = errMsg;
          state = status.rejected;
          handleReject.call(this);
        }
      },
      then: then,
      promise: function () {
        return {
          then: then,
        };
      },
    };

    return deferred;
  };

  function when() {
    var allCount = arguments.length;
    var count = 0;
    var deferred = Deferred();
    var result = [];

    for (var i = 0; i < allCount; i++) {
      var promise = arguments[i];
      (function (i) {
        promise.then(
          function (data) {
            count++;
            result[i] = data;
            if (count === allCount) {
              deferred.resolve.apply(deferred, result);
            }
          },
          function () {
            deferred.reject();
          }
        );
      })(i);
    }

    return deferred.promise();
  }

  return {
    Deferred: Deferred,
    when: when,
  };
});
