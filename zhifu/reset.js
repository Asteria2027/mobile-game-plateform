!function (N, M) {
		      function L() {
		        var a = I.getBoundingClientRect().width;
		        a / F > 750 && (a = 750 * F);
		        var d = a / 3.75;
		        I.style.fontSize = d + "px", D.rem = N.rem = d
  }
  var K, J = N.document, I = J.documentElement, H = J.querySelector('meta[name="viewport"]'), G = J.querySelector('meta[name="flexible"]'), F = 0, E = 0, D = M.flexible || (M.flexible = {});
  if (H) {
    var C = H.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
    C && (E = parseFloat(C[1]), F = parseInt(1 / E))
  } else {
    if (G) {
      var B = G.getAttribute("content");
  if (B) {
    var A = B.match(/initial\-dpr=([\d\.]+)/), z = B.match(/maximum\-dpr=([\d\.]+)/);
        A && (F = parseFloat(A[1]), E = parseFloat((1 / F).toFixed(2))), z && (F = parseFloat(z[1]), E = parseFloat((1 / F).toFixed(2)))
      }
    }
  }
  if (!F && !E) {
    var y = N.navigator.userAgent, x = (!!y.match(/android/gi), !!y.match(/iphone/gi)), w = x && !!y.match(/OS 9_3/), v = N.devicePixelRatio;
    F = x && !w ? v >= 3 && (!F || F >= 3) ? 3 : v >= 2 && (!F || F >= 2) ? 2 : 1 : 1, E = 1 / F
  }
  if (I.setAttribute("data-dpr", F), !H) {
if (H = J.createElement("meta"), H.setAttribute("name", "viewport"), H.setAttribute("content", "initial-scale=" + E + ", maximum-scale=" + E + ", minimum-scale=" + E + ", user-scalable=no"), I.firstElementChild) {
  I.firstElementChild.appendChild(H)
} else {
  var u = J.createElement("div");
      u.appendChild(H), J.write(u.innerHTML)
    }
  }
  N.addEventListener("resize", function () {
    clearTimeout(K), K = setTimeout(L, 300)
  }, !1), N.addEventListener("pageshow", function (b) {
    b.persisted && (clearTimeout(K), K = setTimeout(L, 300))
  }, !1), "complete" === J.readyState ? J.body.style.fontSize = 12 * F + "px" : J.addEventListener("DOMContentLoaded", function () {
  J.body.style.fontSize = 12 * F + "px"
}, !1), L(), D.dpr = N.dpr = F, D.refreshRem = L, D.rem2px = function (d) {
var c = parseFloat(d) * this.rem;
return "string" == typeof d && d.match(/rem$/) && (c += "px"), c
  }, D.px2rem = function (d) {
    var c = parseFloat(d) / this.rem;
    return "string" == typeof d && d.match(/px$/) && (c += "rem"), c
  }
}(window, window.lib || (window.lib = {}));
function UrlSearch() {
	var str = window.location.href;
	var num = str.indexOf("?");
	str = str.substr(num + 1);
	if(str.indexOf("?") == -1) {} else {
		num = str.indexOf("?");
		str = str.substr(num + 1);
	}
	var arr = str.split("&")
	for(i = 0; i < arr.length; i++) {
		num = arr[i].indexOf("=");
		if(num > 0) {
			name = arr[i].substring(0, num);
			value = arr[i].substr(num + 1);
			this[name] = value;
		}
	}
}
