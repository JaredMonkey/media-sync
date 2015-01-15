! function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "undefined" != typeof exports ? module.exports = t() : e.Autolinker = t()
}(this, function() {
    var e = function(e) {
        e = e || {};
        for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t])
    };
    return e.prototype = {
        constructor: e,
        newWindow: !0,
        stripPrefix: !0,
        twitter: !0,
        email: !0,
        urls: !0,
        className: "",
        matcherRegex: function() {
            var e = /(^|[^\w])@(\w{1,15})/,
                t = /(?:[\-;:&=\+\$,\w\.]+@)/,
                n = /(?:[A-Za-z]{3,9}:(?:\/\/)?)/,
                r = /(?:www\.)/,
                i = /[A-Za-z0-9\.\-]*[A-Za-z0-9\-]/,
                s = /\.(?:international|construction|contractors|enterprises|photography|productions|foundation|immobilien|industries|management|properties|technology|christmas|community|directory|education|equipment|institute|marketing|solutions|vacations|bargains|boutique|builders|catering|cleaning|clothing|computer|democrat|diamonds|graphics|holdings|lighting|partners|plumbing|supplies|training|ventures|academy|careers|company|cruises|domains|exposed|flights|florist|gallery|guitars|holiday|kitchen|neustar|okinawa|recipes|rentals|reviews|shiksha|singles|support|systems|agency|berlin|camera|center|coffee|condos|dating|estate|events|expert|futbol|kaufen|luxury|maison|monash|museum|nagoya|photos|repair|report|social|supply|tattoo|tienda|travel|viajes|villas|vision|voting|voyage|actor|build|cards|cheap|codes|dance|email|glass|house|mango|ninja|parts|photo|shoes|solar|today|tokyo|tools|watch|works|aero|arpa|asia|best|bike|blue|buzz|camp|club|cool|coop|farm|fish|gift|guru|info|jobs|kiwi|kred|land|limo|link|menu|mobi|moda|name|pics|pink|post|qpon|rich|ruhr|sexy|tips|vote|voto|wang|wien|wiki|zone|bar|bid|biz|cab|cat|ceo|com|edu|gov|int|kim|mil|net|onl|org|pro|pub|red|tel|uno|wed|xxx|xyz|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)\b/,
                o = /(?:[\-A-Za-z0-9+&@#\/%?=~_()|!:,.;]*[\-A-Za-z0-9+&@#\/%=~_()|])?/;
            return new RegExp(["(", e.source, ")", "|", "(", t.source, i.source, s.source, ")", "|", "(", "(?:", "(?:", n.source, i.source, ")", "|", "(?:", "(.?//)?", r.source, i.source, ")", "|", "(?:", "(.?//)?", i.source, s.source, ")", ")", o.source, ")"].join(""), "gi")
        }(),
        protocolRelativeRegex: /(.)?\/\//,
        htmlRegex: function() {
            var e = /[0-9a-zA-Z:]+/,
                t = /[^\s\0"'>\/=\x01-\x1F\x7F]+/,
                n = /(?:".*?"|'.*?'|[^'"=<>`\s]+)/;
            return new RegExp(["<(/)?", "(" + e.source + ")", "(?:", "\\s+", t.source, "(?:\\s*=\\s*" + n.source + ")?", ")*", "\\s*", ">"].join(""), "g")
        }(),
        urlPrefixRegex: /^(https?:\/\/)?(www\.)?/i,
        link: function(e) {
            return this.processHtml(e)
        },
        processHtml: function(e) {
            for (var t, n, r = this.htmlRegex, i = 0, s = 0, o = []; null !== (t = r.exec(e));) {
                var u = t[0],
                    a = t[2],
                    f = !!t[1];
                n = e.substring(i, t.index), i = t.index + u.length, "a" === a ? f ? (s = Math.max(s - 1, 0), 0 === s && o.push(n)) : (s++, o.push(this.processTextNode(n))) : o.push(0 === s ? this.processTextNode(n) : n), o.push(u)
            }
            if (i < e.length) {
                var l = this.processTextNode(e.substring(i));
                o.push(l)
            }
            return o.join("")
        },
        processTextNode: function(e) {
            var t = this,
                n = this.matcherRegex,
                r = this.twitter,
                i = this.email,
                s = this.urls;
            return e.replace(n, function(e, n, o, u, a, l, c, h) {
                var p = n,
                    v = o,
                    m = u,
                    g = a,
                    y = l,
                    w = c || h,
                    E = "",
                    S = "";
                if (p && !r || g && !i || y && !s || y && -1 === y.indexOf(".") || y && /^[A-Za-z]{3,9}:/.test(y) && !/:.*?[A-Za-z]/.test(y) || w && /^[\w]\/\//.test(w)) return e;
                var x = e.charAt(e.length - 1);
                if (")" === x) {
                    var T = e.match(/\(/g),
                        N = e.match(/\)/g),
                        C = T && T.length || 0,
                        k = N && N.length || 0;
                    k > C && (e = e.substr(0, e.length - 1), S = ")")
                }
                var L, A = e,
                    O = e;
                if (p) L = "twitter", E = v, A = "https://twitter.com/" + m, O = "@" + m;
                else if (g) L = "email", A = "mailto:" + g, O = g;
                else if (L = "url", w) {
                    var M = new RegExp("^" + t.protocolRelativeRegex.source),
                        _ = w.match(M)[1] || "";
                    E = _ + E, A = A.replace(M, "//"), O = O.replace(M, "")
                } else /^[A-Za-z]{3,9}:/i.test(A) || (A = "http://" + A);
                var D = t.createAnchorTag(L, A, O);
                return E + D + S
            })
        },
        createAnchorTag: function(e, t, n) {
            var r = this.createAnchorAttrsStr(e, t);
            return n = this.processAnchorText(n), "<a " + r + ">" + n + "</a>"
        },
        createAnchorAttrsStr: function(e, t) {
            var n = ['href="' + t + '"'],
                r = this.createCssClass(e);
            return r && n.push('class="' + r + '"'), this.newWindow && n.push('target="_blank"'), n.join(" ")
        },
        createCssClass: function(e) {
            var t = this.className;
            return t ? t + " " + t + "-" + e : ""
        },
        processAnchorText: function(e) {
            return this.stripPrefix && (e = this.stripUrlPrefix(e)), e = this.removeTrailingSlash(e), e = this.doTruncate(e)
        },
        stripUrlPrefix: function(e) {
            return e.replace(this.urlPrefixRegex, "")
        },
        removeTrailingSlash: function(e) {
            return "/" === e.charAt(e.length - 1) && (e = e.slice(0, -1)), e
        },
        doTruncate: function(e) {
            var t = this.truncate;
            return t && e.length > t && (e = e.substring(0, t - 2) + ".."), e
        }
    }, e.link = function(t, n) {
        var r = new e(n);
        return r.link(t)
    }, e
});
(function(e) {
    e.fn.autoGrowInput = function(t) {
        t = e.extend({
            maxWidth: 1e3,
            minWidth: 0,
            comfortZone: 70
        }, t);
        this.filter("input:text").each(function() {
            var n = t.minWidth || e(this).width(),
                r = "",
                i = e(this),
                s = e("<tester/>").css({
                    position: "absolute",
                    top: -9999,
                    left: -9999,
                    width: "auto",
                    fontSize: i.css("fontSize"),
                    fontFamily: i.css("fontFamily"),
                    fontWeight: i.css("fontWeight")
                }),
                o = function() {
                    if (r === (r = i.val())) {
                        return
                    }
                    var e = r.replace(/&/g, "&").replace(/\s/g, "&nbsp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    s.html(e);
                    var o = s.width(),
                        u = o + t.comfortZone >= n ? o + t.comfortZone : n,
                        a = i.width(),
                        f = u < a && u >= n || u > n && u < t.maxWidth;
                    if (f) {
                        i.width(u - 69)
                    }
                };
            s.insertAfter(i);
            e(this).bind("input", o);
            o()
        });
        return this
    }
})(jQuery);
! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(e) : "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = e() : window.Sortable = e()
}(function() {
    "use strict";

    function e(e, n) {
        this.el = e, this.options = n = n || {}, n.group = n.group || Math.random(), n.store = n.store || null, n.handle = n.handle || null, n.draggable = n.draggable || e.children[0] && e.children[0].nodeName || (/[uo]l/i.test(e.nodeName) ? "li" : "*"), n.ghostClass = n.ghostClass || "sortable-ghost", n.ignore = n.ignore || "a, img", n.onAdd = t(this, n.onAdd || O), n.onUpdate = t(this, n.onUpdate || O), n.onRemove = t(this, n.onRemove || O), n.onStart = t(this, n.onStart || O), n.onEnd = t(this, n.onEnd || O), e[x] = n.group;
        for (var r in this) "_" === r.charAt(0) && (this[r] = t(this, this[r]));
        i(e, "add", n.onAdd), i(e, "update", n.onUpdate), i(e, "remove", n.onRemove), i(e, "start", n.onStart), i(e, "stop", n.onEnd), i(e, "mousedown", this._onTapStart), i(e, "touchstart", this._onTapStart), k && i(e, "selectstart", this._onTapStart), i(e, "dragover", this._onDragOver), i(e, "dragenter", this._onDragOver), _.push(this._onDragOver), n.store && this.sort(n.store.get(this))
    }

    function t(e, t) {
        var n = M.call(arguments, 2);
        return t.bind ? t.bind.apply(t, [e].concat(n)) : function() {
            return t.apply(e, n.concat(M.call(arguments)))
        }
    }

    function n(e, t, n) {
        if ("*" === t) return e;
        if (e) {
            n = n || N, t = t.split(".");
            var r = t.shift().toUpperCase(),
                i = new RegExp("\\s(" + t.join("|") + ")\\s", "g");
            do
                if (!("" !== r && e.nodeName != r || t.length && ((" " + e.className + " ").match(i) || []).length != t.length)) return e;
            while (e !== n && (e = e.parentNode))
        }
        return null
    }

    function r(e) {
        e.dataTransfer.dropEffect = "move", e.preventDefault()
    }

    function i(e, t, n) {
        e.addEventListener(t, n, !1)
    }

    function s(e, t, n) {
        e.removeEventListener(t, n, !1)
    }

    function o(e, t, n) {
        if (e)
            if (e.classList) e.classList[n ? "add" : "remove"](t);
            else {
                var r = (" " + e.className + " ").replace(/\s+/g, " ").replace(" " + t + " ", "");
                e.className = r + (n ? " " + t : "")
            }
    }

    function u(e, t, n) {
        if (e && e.style) {
            if (void 0 === n) return N.defaultView && N.defaultView.getComputedStyle ? n = N.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), void 0 === t ? n : n[t];
            e.style[t] = n + ("string" == typeof n ? "" : "px")
        }
    }

    function a(e, t, n) {
        if (e) {
            var r = e.getElementsByTagName(t),
                i = 0,
                s = r.length;
            if (n)
                for (; s > i; i++) n(r[i], i);
            return r
        }
        return []
    }

    function f(e) {
        return e.draggable = !1
    }

    function l() {
        L = !1
    }

    function c(e, t) {
        var n = e.lastElementChild.getBoundingClientRect();
        return t.clientY - (n.top + n.height) > 5
    }

    function h(e) {
        for (var t = e.innerHTML + e.className + e.src, n = t.length, r = 0; n--;) r += t.charCodeAt(n);
        return r.toString(36)
    }
    var p, d, v, m, g, y, b, w, E, S, x = "Sortable" + (new Date).getTime(),
        T = window,
        N = T.document,
        C = T.parseInt,
        k = !!N.createElement("div").dragDrop,
        L = !1,
        A = function(e, t) {
            var n = N.createEvent("Event");
            return n.initEvent(e, !0, !0), n.item = t, n
        },
        O = function() {},
        M = [].slice,
        _ = [];
    return e.prototype = {
        constructor: e,
        _applyEffects: function() {
            o(p, this.options.ghostClass, !0)
        },
        _onTapStart: function(e) {
            var t = e.touches && e.touches[0],
                s = (t || e).target,
                o = this.options,
                u = this.el;
            if (o.handle && (s = n(s, o.handle, u)), s = n(s, o.draggable, u), s && "selectstart" == e.type && "A" != s.tagName && "IMG" != s.tagName && s.dragDrop(), s && !p && s.parentNode === u) {
                E = e, s.draggable = !0, Array.prototype.forEach.call(o.ignore.split(","), function(e) {
                    a(s, e.trim(), f)
                }), t && (E = {
                    target: s,
                    clientX: t.clientX,
                    clientY: t.clientY
                }, this._onDragStart(E, !0), e.preventDefault()), i(this.el, "dragstart", this._onDragStart), i(this.el, "dragend", this._onDrop), i(N, "dragover", r);
                try {
                    N.selection ? N.selection.empty() : window.getSelection().removeAllRanges()
                } catch (l) {}
            }
        },
        _emulateDragOver: function() {
            if (S) {
                u(d, "display", "none");
                var e = N.elementFromPoint(S.clientX, S.clientY),
                    t = e,
                    n = this.options.group,
                    r = _.length;
                if (t)
                    do {
                        if (t[x] === n) {
                            for (; r--;) _[r]({
                                clientX: S.clientX,
                                clientY: S.clientY,
                                target: e,
                                rootEl: t
                            });
                            break
                        }
                        e = t
                    } while (t = t.parentNode);
                u(d, "display", "")
            }
        },
        _onTouchMove: function(e) {
            if (E) {
                var t = e.touches[0],
                    n = t.clientX - E.clientX,
                    r = t.clientY - E.clientY,
                    i = "translate3d(" + n + "px," + r + "px,0)";
                S = t, u(d, "webkitTransform", i), u(d, "mozTransform", i), u(d, "msTransform", i), u(d, "transform", i), e.preventDefault()
            }
        },
        _onDragStart: function(e, t) {
            var n = e.target,
                r = e.dataTransfer;
            if (v = this.el, p = n, m = n.nextSibling, w = this.options.group, t) {
                var s, o = n.getBoundingClientRect(),
                    a = u(n);
                d = n.cloneNode(!0), u(d, "top", o.top - C(a.marginTop, 10)), u(d, "left", o.left - C(a.marginLeft, 10)), u(d, "width", o.width), u(d, "height", o.height), u(d, "opacity", "0.8"), u(d, "position", "fixed"), u(d, "zIndex", "100000"), v.appendChild(d), s = d.getBoundingClientRect(), u(d, "width", 2 * o.width - s.width), u(d, "height", 2 * o.height - s.height), i(N, "touchmove", this._onTouchMove), i(N, "touchend", this._onDrop), i(N, "touchcancel", this._onDrop), this._loopId = setInterval(this._emulateDragOver, 150)
            } else r.effectAllowed = "move", r.setData("Text", n.textContent), i(N, "drop", this._onDrop);
            p.dispatchEvent(A("start", p)), setTimeout(this._applyEffects)
        },
        _onDragOver: function(e) {
            if (!L && w === this.options.group && (void 0 === e.rootEl || e.rootEl === this.el)) {
                var t = this.el,
                    r = n(e.target, this.options.draggable, t);
                if (0 === t.children.length || t.children[0] === d || t === e.target && c(t, e)) t.appendChild(p);
                else if (r && r !== p && void 0 !== r.parentNode[x]) {
                    g !== r && (g = r, y = u(r), b = r.getBoundingClientRect());
                    var i, s = b,
                        o = s.right - s.left,
                        a = s.bottom - s.top,
                        f = /left|right|inline/.test(y.cssFloat + y.display),
                        h = (f ? (e.clientX - s.left) / o : (e.clientY - s.top) / a) > .5,
                        v = r.offsetWidth > p.offsetWidth,
                        m = r.offsetHeight > p.offsetHeight,
                        E = r.nextSibling;
                    L = !0, setTimeout(l, 30), i = f ? r.previousElementSibling === p && !v || h > .5 && v : r.nextElementSibling !== p && !m || h > .5 && m, i && !E ? t.appendChild(p) : r.parentNode.insertBefore(p, i ? E : r)
                }
            }
        },
        _onDrop: function(e) {
            clearInterval(this._loopId), s(N, "drop", this._onDrop), s(N, "dragover", r), s(this.el, "dragend", this._onDrop), s(this.el, "dragstart", this._onDragStart), s(this.el, "selectstart", this._onTapStart), s(N, "touchmove", this._onTouchMove), s(N, "touchend", this._onDrop), s(N, "touchcancel", this._onDrop), e && (e.preventDefault(), e.stopPropagation(), d && d.parentNode.removeChild(d), p && (f(p), o(p, this.options.ghostClass, !1), v.contains(p) ? p.nextSibling !== m && p.dispatchEvent(A("update", p)) : (v.dispatchEvent(A("remove", p)), p.dispatchEvent(A("add", p))), p.dispatchEvent(A("stop", p))), v = p = d = m = E = S = g = y = w = null, this.options.store && this.options.store.set(this))
        },
        toArray: function() {
            for (var e, t = [], n = this.el.children, r = 0, i = n.length; i > r; r++) e = n[r], t.push(e.getAttribute("data-id") || h(e));
            return t
        },
        sort: function(e) {
            var t = {},
                n = this.el;
            this.toArray().forEach(function(e, r) {
                t[e] = n.children[r]
            }), e.forEach(function(e) {
                t[e] && (n.removeChild(t[e]), n.appendChild(t[e]))
            })
        },
        destroy: function() {
            var e = this.el,
                t = this.options;
            s(e, "add", t.onAdd), s(e, "update", t.onUpdate), s(e, "remove", t.onRemove), s(e, "start", t.onStart), s(e, "stop", t.onEnd), s(e, "mousedown", this._onTapStart), s(e, "touchstart", this._onTapStart), s(e, "selectstart", this._onTapStart), s(e, "dragover", this._onDragOver), s(e, "dragenter", this._onDragOver), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(e) {
                e.removeAttribute("draggable")
            }), _.splice(_.indexOf(this._onDragOver), 1), this._onDrop(), this.el = null
        }
    }, e.utils = {
        on: i,
        off: s,
        css: u,
        find: a,
        bind: t,
        closest: n,
        toggleClass: o
    }, e.version = "0.4.0", e
});
var peerJSKey = "esu07ebv3ni885mi";
var ambassadorID;
var peerID;
var peerName;
var peer;
var hostConnection;
var timeoutTime = 2e4;
var refreshTime = 6e4;
var connectedToNetwork = true;
var timeoutTimeout;
var refreshInterval;
var initialPeerList = {};
var functionsForTypes = {};
var connectedPeers = {};
var recoveryPeerList = [];
var nicknames = {};
if (/^#(.+)$/.exec(window.location.hash)) {
    ambassadorID = /^#(.+)$/.exec(window.location.hash)[1]
}
if (localStorage.getItem("lastConnected")) {
    console.log("Last connected object found!");
    var lastConnected = JSON.parse(localStorage.getItem("lastConnected"));
    if (lastConnected[ambassadorID]) {
        console.log("Detected re-opened session, restoring...");
        ambassadorID = lastConnected[ambassadorID]
    }
}
var containsSymbols = function(e) {
    if (e.indexOf("<") >= 0 || e.indexOf(">") >= 0 || e.indexOf('"') >= 0 || e.indexOf("&") >= 0) {
        return true
    } else {
        return false
    }
};
var onMessageType = function(e, t) {
    functionsForTypes[e] = t
};
var clearMessageType = function(e) {
    delete functionsForTypes[e]
};
var sendData = function(e, t, n) {
    if (connectedPeers[e]) {
        var r = connectedPeers[e];
        r.send({
            type: t,
            data: n
        });
        return true
    } else {
        console.log("No such target!");
        return false
    }
};
var requestData = function(e) {
    for (var t in connectedPeers) {
        sendData(t, e, "request");
        return
    }
};
var broadcastData = function(e, t) {
    for (var n in connectedPeers) {
        sendData(n, e, t)
    }
};
var getUsername = function(e) {
    if (nicknames[e]) {
        return nicknames[e]
    } else {
        console.log("Could not find user!");
        return e
    }
};
var disconnectedFromNetwork = function(e) {};
var reconnectedToNetwork = function() {};
var peerDisconnected = function(e, t) {
    console.log("Peer disconnected: " + e)
};
var peerConnected = function(e) {
    console.log("Peer connected: " + e)
};
var disconnectedInterval;
var peerError = function(e, t) {
    if (peer.disconnected && !disconnectedInterval) {
        connectedToNetwork = false;
        disconnectedFromNetwork();
        disconnectedInterval = setInterval(function() {
            if (peer.disconnected) {
                peer.reconnect()
            } else {
                reconnectedToNetwork();
                clearInterval(disconnectedInterval);
                disconnectedInterval = null
            }
        }, 1e3)
    }
};
var receivedData = function(e, t, n) {
    console.log("Received data from " + e + " type " + t + " data", n)
};
var receivedUnhandledData = function(e, t, n) {
    console.log("Received unhandeled data from " + e + " type " + t + " data", n)
};
var fatalError = function(e) {
    console.log("Fatal error", e)
};
var registerPeerConnection = function(e, t) {
    console.log("Registered new peer: " + e.peer);
    connectedPeers[e.peer] = e;
    e.on("data", function(e) {
        if (e["type"] && e["data"]) {
            if (functionsForTypes[e["type"]]) {
                functionsForTypes[e["type"]](this.peer, e["data"])
            } else {
                receivedUnhandledData(this.peer, e["type"], e["data"])
            }
            receivedData(this.peer, e["type"], e["data"])
        }
    });
    e.on("close", function() {
        if (window.navigator.onLine) {
            var e = getUsername(this.peer);
            delete connectedPeers[this.peer];
            delete nicknames[this.peer];
            initialPeerList = {};
            peerDisconnected(this.peer, e)
        } else if (connectedToNetwork) {
            recoveryPeerList = [];
            for (var t in connectedPeers) {
                recoveryPeerList[nicknames[t]] = t
            }
            connectedToNetwork = false;
            disconnectedFromNetwork();
            var n = setInterval(function() {
                if (window.navigator.onLine) {
                    clearInterval(n);
                    if (peer.disconnected) {
                        peer.reconnect()
                    }
                    connectedPeers = {};
                    nicknames = {};
                    connectToAllPeers(recoveryPeerList);
                    setTimeout(function() {
                        connectedToNetwork = true;
                        reconnectedToNetwork()
                    }, 3e3)
                }
            }, 1e3)
        }
    });
    e.on("error", function(e) {
        peerError(this.peer, e)
    });
    if (t) {
        nicknames[e.peer] = t
    }
    if (connectedToNetwork) {
        for (var n in initialPeerList) {
            if (initialPeerList[n] == e.peer) {
                return
            }
        }
        peerConnected(e.peer)
    }
};
var connectToAllPeers = function(e) {
    var t = {};
    for (var n in e) {
        if (e[n] == ambassadorID && connectedToNetwork) {
            nicknames[ambassadorID] = n
        } else {
            var r = peer.connect(e[n], {
                label: peerName
            });
            t[e[n]] = n;
            r.on("open", function() {
                registerPeerConnection(this, t[this.peer])
            });
            r.on("error", function(e) {
                peerError(this.peer, e)
            })
        }
    }
};
var connect = function(e, t) {
    var n = false;
    var r = false;
    peerName = e.trim();
    peer = new Peer({
        key: peerJSKey
    });
    console.log("Peer object created!");
    peer.on("open", function(e) {
        if (!n) {
            n = true;
            console.log("Peer open and ready!");
            peerID = e;
            refreshInterval = setInterval(function() {
                if (peer.disconnected) {
                    peer.reconnect()
                } else {
                    peer.disconnect();
                    setTimeout(function() {
                        peer.reconnect()
                    }, 500)
                }
            }, refreshTime);
            peer.on("connection", function(e) {
                e.on("open", function() {
                    var t = e.label.trim();
                    if (t.length > 4 && t.length < 21) {
                        if (containsSymbols(t)) {
                            console.log("Username with symbols!");
                            e.send({
                                type: "registration-error",
                                data: "Username contains forbidden symbols!"
                            })
                        }
                        if (t == peerName) {
                            console.log("Username already taken!");
                            e.send({
                                type: "registration-error",
                                data: "Username already taken!"
                            });
                            return
                        }
                        for (var n in nicknames) {
                            if (nicknames[n] == t) {
                                console.log("Username already taken!");
                                e.send({
                                    type: "registration-error",
                                    data: "Username already taken!"
                                });
                                return
                            }
                        }
                        registerPeerConnection(e, t)
                    } else {
                        console.log("Invalid username!");
                        e.send({
                            type: "registration-error",
                            data: "Username must be 5 to 20 characters long!"
                        })
                    }
                })
            });
            window.location.hash = peerID;
            onMessageType("peer-list", function(e) {
                console.log("Peer listing request from " + e);
                var t = {};
                for (var n in connectedPeers) {
                    if (n != e) {
                        t[nicknames[n]] = n
                    }
                }
                t[peerName] = peerID;
                sendData(e, "peer-list-response", t)
            });
            if (ambassadorID) {
                hostConnection = peer.connect(ambassadorID, {
                    label: peerName
                });
                hostConnection.on("open", function() {
                    n = true;
                    console.log("Connected to host! Requesting peer list...");
                    registerPeerConnection(hostConnection);
                    onMessageType("registration-error", function(e, t) {
                        if (e == ambassadorID) {
                            peer.destroy();
                            connectedPeers = {};
                            clearInterval(refreshInterval);
                            clearTimeout(timeoutTimeout);
                            fatalError(t)
                        }
                    });
                    onMessageType("peer-list-response", function(e, n) {
                        console.log("Receive peer-list");
                        if (e == ambassadorID) {
                            clearMessageType("peer-list-response");
                            clearMessageType("registration-error");
                            r = true;
                            initialPeerList = n;
                            connectToAllPeers(n);
                            t();
                            t = function() {}
                        }
                    });
                    hostConnection.send({
                        type: "peer-list",
                        data: "request"
                    })
                });
                clearTimeout(timeoutTimeout);
                timeoutTimeout = setTimeout(function() {
                    if (!r) {
                        console.log("Heads up! Failed to connect to ambassador");
                        t();
                        t = function() {}
                    }
                }, timeoutTime)
            } else {
                t();
                t = function() {}
            }
        } else {}
    });
    peer.on("disconnected", function() {});
    peer.on("error", function(e) {
        if (e.type == "peer-unavailable") {
            clearTimeout(timeoutTimeout);
            console.log("Heads up! Failed to connect to ambassador");
            t();
            t = function() {}
        } else {
            peerError(peerID, e)
        }
    });
    timeoutTimeout = setTimeout(function() {
        if (!n) {
            peer.destroy();
            connectedPeers = {};
            fatalError("Peer registeration failed!")
        }
    }, timeoutTime);
    startLoginCountdown()
};
window.onbeforeunload = function(e) {
    localStorage.setItem("volume", mediaVolume.toString());
    for (var t in connectedPeers) {
        var n = {};
        n[peerID] = t;
        localStorage.setItem("lastConnected", JSON.stringify(n));
        peer.destroy();
        break
    }
};
var quick = function(e) {
    connect(e, function() {
        console.log("Connected!")
    })
};
var loginInterval;
var usernameError = function(e) {
    clearInterval(loginInterval);
    $("#username-field button").attr("disabled", false);
    $("#username-field button").text("Connect");
    $("#username-field input").attr("data-content", e);
    $("#username-field input").attr("disabled", false);
    $("#username-field input").popover("show")
};
fatalError = usernameError;
$("#username-field button").click(function(e) {
    $("#username-field input").popover("destroy");
    var t = $("#username-field input");
    if (containsSymbols(t.val())) {
        usernameError("Username contains forbidden symbols!");
        return
    }
    connect(t.val(), function() {
        $("#login-area").fadeOut(500);
        setTimeout(function() {
            $("#interaction-area").fadeIn(500);
            runEverything(t.val())
        }, 500)
    });
    $("#username-field input").attr("disabled", true);
    $(this).attr("disabled", true);
    $(this).text("Connecting...")
});
$("#username-field input").on("keyup", function(e) {
    if ($(this).val().length > 4 && $(this).val().length < 21) {
        $("#username-field button").attr("disabled", false);
        if (e.which == 13) {
            $("#username-field button").click()
        }
    } else {
        $("#username-field button").attr("disabled", true)
    }
});
var startLoginCountdown = function() {
    var e = 20;
    loginInterval = setInterval(function() {
        $("#username-field button").text("Connecting (" + e + ")");
        e--;
        if (e <= 0) {
            clearInterval(loginInterval)
        }
    }, 1e3)
};
var colorPool = ["#ecc132", "#ed5548", "#1abc9c", "#ad4ede"];
var colorPoolIndex = 0;
var systemColor = "#555555";
var meColor = "#3498db";
var userColors = {};
var myUsername;
var lastUser;
var lastDiv;
var sanatize = function(e) {
    return e.replace(/&/g, "&").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")
};
var getUserColor = function(e) {
    if (e == "System") {
        return systemColor
    } else if (e == myUsername) {
        return meColor
    }
    if (!userColors[e]) {
        userColors[e] = colorPool[colorPoolIndex % colorPool.length];
        colorPoolIndex++
    }
    return userColors[e]
};
var isAtBottom = function() {
    var e = $("#chat-area #message-area");
    if (e.scrollTop() >= e[0].scrollHeight - e.height() - 20) {
        return true
    } else {
        return false
    }
};
var displayMessage = function(e, t) {
    var n = $("#chat-area #message-area");
    var r = isAtBottom();
    if (t == "System") {
        var i = getUserColor(t);
        n.append("<span class='username' style='color: " + i + ";'>" + e + "</span>");
        lastDiv = null;
        lastUser = null
    } else if (lastUser == t) {
        lastDiv.append("<span>" + Autolinker.link(sanatize(e)) + "</span><br>")
    } else {
        var i = getUserColor(t);
        n.append("<span class='username' style='color: " + i + ";'>" + t + "</span>");
        lastDiv = $("<div class='message'></div>");
        lastUser = t;
        n.append(lastDiv);
        lastDiv.css("borderColor", i);
        lastDiv.append("<span>" + Autolinker.link(sanatize(e)) + "</span><br>")
    }
    if (r) {
        n.scrollTop(n[0].scrollHeight)
    }
};
var slideDown = false;
$("#chat-area #connected-list-area button").click(function() {
    if (slideDown) {
        $("#chat-area #connected-list-area #connected-list").hide();
        $("#chat-area #connected-list-area button").removeClass("active");
        $("#chat-area #connected-list-area button").blur()
    } else {
        $("#chat-area #connected-list-area button").addClass("active");
        var e = $("#chat-area #connected-list-area #connected-list ul");
        e.html("");
        e.append("<li style='color: " + getUserColor(myUsername) + ";'>" + myUsername + " (You)</li>");
        for (var t in nicknames) {
            e.append("<li style='color: " + getUserColor(nicknames[t]) + ";'>" + nicknames[t] + "</li>")
        }
        $("#chat-area #connected-list-area #connected-list").show()
    }
    slideDown = !slideDown
});
var startChat = function(e) {
    var t = $("#chat-area #connected-list-area button .badge");
    disconnectedFromNetwork = function() {
        displayMessage("Connection lost!", "System");
        $("#chat-area #input-box input").attr("disabled", true);
        $("#chat-area #input-box input").val("- Disconnected -")
    };
    reconnectedToNetwork = function() {
        displayMessage("Re-connected!", "System");
        $("#chat-area #input-box input").attr("disabled", false);
        $("#chat-area #input-box input").val("")
    };
    peerConnected = function(e) {
        var n = getUsername(e);
        displayMessage(n + " has joined the room!", "System");
        t.text((1 + Object.keys(nicknames).length).toString())
    };
    peerDisconnected = function(e, n) {
        displayMessage(n + " has left the room!", "System");
        t.text((1 + Object.keys(nicknames).length).toString())
    };
    onMessageType("chat-message", function(e, t) {
        if (typeof t == "string") {
            displayMessage(t, getUsername(e))
        }
    });
    myUsername = e;
    $("#chat-area #input-box input").on("keyup", function(e) {
        if (e.which == 13 && $(this).val().trim().length > 0) {
            displayMessage($(this).val(), myUsername);
            broadcastData("chat-message", $(this).val());
            $(this).val("")
        }
    });
    displayMessage(e + " has joined the room!", "System");
    t.text((1 + Object.keys(nicknames).length).toString());
    setInterval(function() {
        t.text((1 + Object.keys(nicknames).length).toString())
    }, 1e3)
};
var displayDivID = "content-display-area";
var peopleReadyToPlay = [];
var latency = 100;
var addToReadyToPlay = function(e) {
    for (var t in peopleReadyToPlay) {
        if (e == peopleReadyToPlay[t]) {
            return false
        }
    }
    peopleReadyToPlay.push(e);
    return true
};
var MediaObject = function(e, t, n) {
    if (n) console.log("Playing catch up?");
    this.active = false;
    this.type = e;
    this.code = t;
    this.player = false;
    this.element = false;
    this.skipEvent = false;
    this.skipSeek = false;
    this.catchUp = n;
    this.state = "loading";
    this.buffering = false;
    this.broadcastOnNextUpdate = false;
    this.altCurrentTime = false;
    if (e && t) {
        this.displayMedia()
    }
    onMessageType("media-data", function(e) {
        return function(t, n) {
            console.log("Set state: ", n);
            e.setSerializedState(t, n)
        }
    }(this));
    onMessageType("request-media-data", function(e) {
        return function(t) {
            console.log("Received media data request");
            if (e.active) {
                e.sendUpdate(t)
            } else {
                console.log("Not active!")
            }
        }
    }(this))
};
MediaObject.prototype.displayMedia = function() {
    if (this.code) {
        if (this.type == "youtube") {
            this.active = true;
            this.player = new YT.Player(displayDivID, {
                height: "450px",
                width: "100%",
                videoId: this.code,
                events: {
                    onReady: onYoutubePlayerReady,
                    onStateChange: onYoutubePlayerStateChange
                }
            });
            $("#" + displayDivID).attr("src", $("#" + displayDivID).attr("src") + "&rel=0");
            return true
        } else if (this.type == "soundcloud") {
            this.active = true;
            this.element = $('<iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=' + this.code + '&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=true"></iframe>');
            $("#" + displayDivID).append(this.element);
            this.player = SC.Widget(this.element.get(0));
            this.player.bind(SC.Widget.Events.READY, onSCPlayerReady)
        } else if (this.type == "html5") {
            this.active = true;
            console.log("HTML player created");
            this.element = $("<video id='html5player' src='" + this.code + "' controls='true' autoplay='true' preload='auto'></video>");
            $("#" + displayDivID).append(this.element);
            this.player = this.element.get(0);
            this.pause();
            onHTML5PlayerReady(this)
        }
    } else {
        console.log("Attempt to display media without a code");
        return false
    }
};
MediaObject.prototype.getSerializedState = function() {
    console.log("Creating serialized data");
    var e = {};
    e["time"] = this.getCurrentTime();
    e["state"] = this.state;
    e["code"] = this.code;
    e["type"] = this.type;
    return e
};
MediaObject.prototype.setSerializedState = function(e, t) {
    console.log("Setting state from message...");
    if (t["type"] == this.type && t["code"] == this.code) {
        console.log("Updating currently playing media");
        if (t["state"]) {
            if (t["state"] == "paused") {
                this.seekTo(t["time"]);
                this.pause()
            } else if (t["state"] == "playing") {
                this.seekTo(t["time"]);
                this.play()
            } else if (t["state"] == "ready") {
                addToReadyToPlay(e);
                if ((peopleReadyToPlay.length == Object.keys(connectedPeers).length) && this.state != "playing") {
                    console.log("Everyone ready! Playing...");
                    this.play()
                }
            }
        }
    } else {
        console.log("Unknown media! Requesting for queue update...");
        requestData("request-queue-data")
    }
};
MediaObject.prototype.broadcastUpdate = function() {
    broadcastData("media-data", this.getSerializedState())
};
MediaObject.prototype.sendUpdate = function(e) {
    sendData(e, "media-data", this.getSerializedState())
};
MediaObject.prototype.play = function() {
    if (this.state != "playing") {
        this.skipEvent = true;
        if (this.type == "youtube") {
            this.player.playVideo()
        } else if (this.type == "soundcloud") {
            this.player.play()
        } else if (this.type == "html5") {
            this.player.play()
        }
    }
};
MediaObject.prototype.pause = function() {
    if (this.state != "paused") {
        this.skipEvent = true;
        if (this.type == "youtube") {
            this.player.pauseVideo()
        } else if (this.type == "soundcloud") {
            this.player.pause()
        } else if (this.type == "html5") {
            this.player.pause()
        }
    }
};
MediaObject.prototype.seekTo = function(e) {
    this.skipSeek = true;
    if (this.type == "youtube") {
        if (Math.abs(this.getCurrentTime() - e) > 1) {
            this.player.seekTo(e, true)
        } else {
            this.skipSeek = false
        }
    } else if (this.type == "soundcloud") {
        this.player.seekTo(e * 1e3)
    } else if (this.type == "html5") {
        this.player.currentTime = e
    }
};
MediaObject.prototype.getCurrentTime = function() {
    if (this.type == "youtube") {
        return this.player.getCurrentTime()
    } else if (this.type == "soundcloud") {
        return this.altCurrentTime
    } else if (this.type == "html5") {
        return this.player.currentTime
    }
};
MediaObject.prototype.getVolume = function() {
    if (this.type == "youtube") {
        return this.player.getVolume()
    } else if (this.type == "soundcloud") {
        return mediaVolume
    } else if (this.type == "html5") {
        return this.player.volume * 100
    }
};
MediaObject.prototype.setVolume = function(e) {
    if (this.type == "youtube") {
        this.player.setVolume(e)
    } else if (this.type == "soundcloud") {
        this.player.setVolume(e / 100)
    } else if (this.type == "html5") {
        this.player.volume = e / 100
    }
};
MediaObject.prototype.destroy = function() {
    if (this.type == "youtube") {
        console.log("Destroying player...");
        this.player.destroy();
        clearInterval(seekInterval);
        clearInterval(volumeInterval)
    }
    if (this.element) {
        this.element.remove()
    }
    peopleReadyToPlay = [];
    this.active = false;
    this.type = false;
    this.code = false;
    this.player = false;
    this.element = false;
    this.skipEvent = false;
    this.skipSeek = false;
    this.catchUp = false;
    this.state = "loading";
    this.buffering = false;
    this.broadcastOnNextUpdate = false;
    this.altCurrentTime = false
};
MediaObject.prototype.onPause = function() {
    if (this.state == "loading") {
        this.state = "ready"
    } else if (this.state != "ready") {
        this.state = "paused";
        if (!this.skipEvent) {
            this.broadcastUpdate()
        } else {
            this.skipEvent = false
        }
    }
};
MediaObject.prototype.onPlay = function() {
    if (this.state == "loading") {
        this.readyToPlay()
    } else {
        this.state = "playing";
        if (this.buffering) {
            this.buffering = false;
            setTimeout(function() {
                requestData("request-media-data")
            }, 500)
        }
        if (!this.skipEvent) {
            this.broadcastUpdate()
        } else {
            this.skipEvent = false
        }
    }
};
MediaObject.prototype.onBuffering = function() {
    this.buffering = true
};
MediaObject.prototype.onStop = function() {
    this.state = "stopped";
    if (queueObject.currentlyPlaying < queueObject.queue.length - 1) {
        queueObject.play(queueObject.currentlyPlaying + 1)
    }
};
MediaObject.prototype.onSeek = function() {
    if (!this.skipSeek) {
        console.log("Detected seek");
        if (this.type == "youtube") {
            this.broadcastUpdate()
        } else if (this.type == "soundcloud") {
            this.broadcastOnNextUpdate = true
        }
    } else {
        this.skipSeek = false
    }
};
MediaObject.prototype.onVolumeChange = function() {
    mediaVolume = this.getVolume();
    updateVolumeBar()
};
MediaObject.prototype.readyToPlay = function() {
    console.log("Ready to play!");
    this.state = "ready";
    this.setVolume(mediaVolume);
    this.pause();
    this.broadcastUpdate();
    if (this.catchUp) {
        console.log("BUT WAIT! CHATCHUP!");
        requestData("request-media-data");
        this.catchUp = false
    } else {
        if (peopleReadyToPlay.length >= Object.keys(connectedPeers).length) {
            console.log("Everyone already ready! Playing...");
            setTimeout(function(e) {
                return function() {
                    e.play()
                }
            }(this), latency)
        }
    }
};
currentMedia = new MediaObject;
var contentSelectorStr = "#interaction-area #content-area #content-selector ";
var contentArea = $("#interaction-area #content-area #content-display-area");
var mediaVolume = 0;
var seekInterval;
var volumeInterval;
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var onYoutubePlayerReady = function() {
    currentMedia.play();
    var e;
    seekInterval = setInterval(function() {
        if (e && currentMedia.state == "playing") {
            if (!(currentMedia.getCurrentTime() >= e && currentMedia.getCurrentTime() <= e + 2)) {
                currentMedia.onSeek()
            }
        }
        e = currentMedia.getCurrentTime()
    }, 1e3);
    volumeInterval = setInterval(function() {
        mediaVolume = currentMedia.player.getVolume();
        updateVolumeBar()
    }, 500)
};
var onYoutubePlayerStateChange = function(e) {
    var t = e.data;
    if (t == 1) {
        if (currentMedia.state == "loading") {
            console.log("Volume set");
            currentMedia.player.setVolume(mediaVolume)
        }
        if (currentMedia.state != "playing") {
            currentMedia.onPlay()
        }
    } else if (t == 2) {
        currentMedia.onPause()
    } else if (t == 0) {
        currentMedia.onStop()
    } else if (t == 3) {
        currentMedia.onBuffering()
    }
};
var onSCPlayerReady = function() {
    currentMedia.player.bind(SC.Widget.Events.PLAY, function(e) {
        currentMedia.altCurrentTime = e.currentPosition / 1e3;
        currentMedia.onPlay()
    });
    currentMedia.player.bind(SC.Widget.Events.PAUSE, function(e) {
        currentMedia.altCurrentTime = e.currentPosition / 1e3;
        currentMedia.onPause()
    });
    currentMedia.player.bind(SC.Widget.Events.FINISH, function(e) {
        currentMedia.altCurrentTime = e.currentPosition / 1e3;
        currentMedia.onStop()
    });
    currentMedia.player.bind(SC.Widget.Events.SEEK, function(e) {
        currentMedia.altCurrentTime = e.currentPosition / 1e3;
        currentMedia.onSeek()
    });
    currentMedia.player.bind(SC.Widget.Events.PLAY_PROGRESS, function(e) {
        currentMedia.altCurrentTime = e.currentPosition / 1e3;
        if (currentMedia.broadcastOnNextUpdate) {
            currentMedia.broadcastUpdate();
            currentMedia.broadcastOnNextUpdate = false
        }
    })
};
var onHTML5PlayerReady = function(e) {
    e.player.addEventListener("seeked", function() {
        e.onSeek()
    });
    e.player.addEventListener("play", function() {
        e.onPlay()
    });
    e.player.addEventListener("pause", function() {
        e.onPause()
    });
    e.player.addEventListener("volumechange", function() {
        e.onVolumeChange()
    });
    e.player.addEventListener("canplay", function() {
        console.log("Metdata loaded");
        if (e.state == "loading") {
            e.play()
        }
    });
    e.player.addEventListener("ended", function() {
        e.onStop()
    })
};
if (localStorage.getItem("volume")) {
    mediaVolume = Number(localStorage.getItem("volume"))
}
var rangeSlider = $("#content-area #content-selector #volume-controls #volume-slider").noUiSlider({
    start: 50,
    connect: "lower",
    range: {
        min: 0,
        max: 100
    }
});
rangeSlider.on("slide", function() {
    mediaVolume = rangeSlider.val();
    currentMedia.setVolume(mediaVolume);
    if (mediaVolume < 1) {
        $(contentSelectorStr + "#volume-state-icon").removeClass("glyphicon-volume-up");
        $(contentSelectorStr + "#volume-state-icon").removeClass("glyphicon-volume-down");
        $(contentSelectorStr + "#volume-state-icon").addClass("glyphicon-volume-off")
    } else if (mediaVolume < 50) {
        $(contentSelectorStr + "#volume-state-icon").removeClass("glyphicon-volume-up");
        $(contentSelectorStr + "#volume-state-icon").addClass("glyphicon-volume-down");
        $(contentSelectorStr + "#volume-state-icon").removeClass("glyphicon-volume-off")
    } else {
        $(contentSelectorStr + "#volume-state-icon").addClass("glyphicon-volume-up");
        $(contentSelectorStr + "#volume-state-icon").removeClass("glyphicon-volume-down");
        $(contentSelectorStr + "#volume-state-icon").removeClass("glyphicon-volume-off")
    }
});
var updateVolumeBar = function() {
    rangeSlider.val(mediaVolume);
    if (mediaVolume < 1) {
        $(contentSelectorStr + "#volume-state-icon").removeClass("glyphicon-volume-up");
        $(contentSelectorStr + "#volume-state-icon").removeClass("glyphicon-volume-down");
        $(contentSelectorStr + "#volume-state-icon").addClass("glyphicon-volume-off")
    } else if (mediaVolume < 50) {
        $(contentSelectorStr + "#volume-state-icon").removeClass("glyphicon-volume-up");
        $(contentSelectorStr + "#volume-state-icon").addClass("glyphicon-volume-down");
        $(contentSelectorStr + "#volume-state-icon").removeClass("glyphicon-volume-off")
    } else {
        $(contentSelectorStr + "#volume-state-icon").addClass("glyphicon-volume-up");
        $(contentSelectorStr + "#volume-state-icon").removeClass("glyphicon-volume-down");
        $(contentSelectorStr + "#volume-state-icon").removeClass("glyphicon-volume-off")
    }
};
updateVolumeBar();
var youtubeMatcher = /www\.youtube\.com\/watch\?v=([^&]+)/;
var hiddenDivID = "hidden-test-area";
var Queue = function() {
    nextButton.attr("disabled", true);
    previousButton.attr("disabled", true);
    this.queue = [];
    this.currentlyPlaying = 0;
    onMessageType("queue-data", function(e) {
        return function(t, n) {
            console.log("Update queue: ", n);
            e.setSerializedQueue(n)
        }
    }(this));
    onMessageType("request-queue-data", function(e) {
        return function(t) {
            console.log("Received queue update request");
            e.sendUpdate(t)
        }
    }(this))
};
Queue.prototype.play = function(e, t) {
    if (e < this.queue.length) {
        this.currentlyPlaying = e
    } else {
        this.currentlyPlaying = this.queue.length - 1
    }
    if (queueOpen) drawQueue();
    updateButtons();
    if (currentMedia.active) {
        currentMedia.destroy()
    }
    if (!t) {
        this.broadcastUpdate()
    }
    if (this.queue.length > 0) {
        if (t) {
            currentMedia = new MediaObject(this.queue[this.currentlyPlaying].type, this.queue[this.currentlyPlaying].code, true)
        } else {
            currentMedia = new MediaObject(this.queue[this.currentlyPlaying].type, this.queue[this.currentlyPlaying].code)
        }
    } else {
        currentMedia.destroy()
    }
};
Queue.prototype.setSerializedQueue = function(e) {
    console.log("Received serialized queue");
    if (typeof e["queue"] == "object" && typeof e["playing"] == "number") {
        var t;
        if (this.queue[this.currentlyPlaying]) {
            t = this.queue[this.currentlyPlaying].code
        }
        this.queue = e["queue"];
        if (this.currentlyPlaying != e["playing"] || !this.queue[e["playing"]] || t != this.queue[e["playing"]].code) {
            console.log("New song, playing...");
            this.play(e.playing, true)
        }
        if (queueOpen) drawQueue();
        updateButtons()
    }
};
Queue.prototype.getSerializedQueue = function() {
    var e = {};
    e["queue"] = this.queue;
    e["playing"] = this.currentlyPlaying;
    return e
};
Queue.prototype.getMetadata = function(e, t, n) {
    if (e == "youtube") {
        var r = new YT.Player(hiddenDivID, {
            height: "500px",
            width: "500px",
            videoId: t,
            events: {
                onReady: function(e) {
                    return function(t) {
                        var n = t.target.B.videoData.title;
                        if (n.length > 0) {
                            t.target.playVideo()
                        } else {
                            console.log("YouTube: Invalid video");
                            e(false)
                        }
                    }
                }(n),
                onStateChange: function(e) {
                    return function(t) {
                        if (t.data == 1) {
                            t.target.setVolume(0);
                            var n = t.target.B.videoData.title;
                            var i = t.target.getDuration();
                            r.destroy();
                            r = null;
                            $("#" + hiddenDivID).html("");
                            if (n.length > 0) {
                                console.log("YouTube: Valid video");
                                e(n, i)
                            } else {
                                console.log("YouTube: Invalid video???");
                                e(false)
                            }
                        }
                    }
                }(n)
            }
        })
    } else if (e == "soundcloud") {
        var i = $('<iframe width="500px" height="500px" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=' + t + '&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=true"></iframe>');
        $("#" + hiddenDivID).append(i);
        var r = SC.Widget(i.get(0));
        var s = setTimeout(function(e, t) {
            return function() {
                console.log("Soundcloud: Could not find song!");
                t.unbind(SC.Widget.Events.READY);
                t = null;
                i.remove();
                i = null;
                $("#" + hiddenDivID).html("");
                e(false)
            }
        }(n, r), 5e3);
        r.bind(SC.Widget.Events.READY, function(e, t) {
            return function() {
                t.getCurrentSound(function(e) {
                    return function(n) {
                        console.log("Soundcloud: Found title " + n.title);
                        clearTimeout(s);
                        t = null;
                        i.remove();
                        i = null;
                        $("#" + hiddenDivID).html("");
                        e(n.title, n.duration / 1e3)
                    }
                }(e))
            }
        }(n, r))
    } else if (e == "html5") {
        console.log("Waiting for HTML event...");
        var o = $("<audio id='html5audio' src='" + t.replace(/&/g, "&") + "'></audio>");
        $("#" + hiddenDivID).append(o);
        o.get(0).addEventListener("error", function(e) {
            return function() {
                console.log("HTML: Invalid audio");
                o.remove();
                $("#" + hiddenDivID).html("");
                e(false)
            }
        }(n));
        o.get(0).addEventListener("loadedmetadata", function(e, t) {
            return function() {
                console.log("HTML: Valid audio");
                var n = o.get(0).duration;
                o.remove();
                $("#" + hiddenDivID).html("");
                e(t.substr(t.lastIndexOf("/") + 1), n)
            }
        }(n, t))
    } else {
        console.log("Did not specify type???");
        return false
    }
};
Queue.prototype.getTypeAndCode = function(e) {
    if (e.indexOf("http") < 0) {
        e = "http://" + e
    }
    if (youtubeMatcher.exec(e)) {
        var t = youtubeMatcher.exec(e)[1];
        return ["youtube", t]
    } else if (e.indexOf("//soundcloud.com") > 0) {
        console.log("Matched soundcloud audio");
        return ["soundcloud", e]
    } else {
        return ["html5", e]
    }
};
Queue.prototype.broadcastUpdate = function() {
    broadcastData("queue-data", this.getSerializedQueue())
};
Queue.prototype.sendUpdate = function(e) {
    sendData(e, "queue-data", this.getSerializedQueue())
};
Queue.prototype.addToLast = function(e, t, n, r) {
    this.queue.push({
        type: e,
        code: t,
        title: n,
        duration: r
    });
    if (currentMedia.state == "stopped" && this.currentlyPlaying == this.queue.length - 2) {
        this.play(queue.length - 1)
    } else if (this.queue.length == 1) {
        this.play(0)
    } else {
        this.broadcastUpdate()
    }
    if (queueOpen) drawQueue();
    updateButtons()
};
Queue.prototype.addNext = function(e, t, n, r) {
    this.queue.splice(this.currentlyPlaying + 1, 0, {
        type: e,
        code: t,
        title: n,
        duration: r
    });
    if (currentMedia.state == "stopped" && this.currentlyPlaying == this.queue.length - 2) {
        this.play(this.queue.length - 1)
    } else if (this.queue.length == 1) {
        this.play(0)
    } else {
        this.broadcastUpdate()
    }
    if (queueOpen) drawQueue();
    updateButtons()
};
Queue.prototype.addNow = function(e, t, n, r) {
    this.queue.splice(this.currentlyPlaying + 1, 0, {
        type: e,
        code: t,
        title: n,
        duration: r
    });
    this.play(this.currentlyPlaying + 1);
    if (queueOpen) drawQueue();
    updateButtons()
};
Queue.prototype.delete = function(e) {
    this.queue.splice(e, 1);
    if (e == this.currentlyPlaying) {
        this.play(this.currentlyPlaying)
    }
    this.broadcastUpdate();
    if (queueOpen) drawQueue();
    updateButtons()
};
var queueButton = $(contentSelectorStr + "#queue-button");
var queueContainer = $(contentSelectorStr + "#queue-manager-container");
var queueList = $(contentSelectorStr + "#queue-manager ul");
var scrollingQueueArea = $(contentSelectorStr + "#queue-manager-container #queue-manager");
var nextButton = $(contentSelectorStr + "button#next-media-button");
var previousButton = $(contentSelectorStr + "button#previous-media-button");
var queueInputField = $(contentSelectorStr + "input[placeholder='Enter a URL...']");
var queueNowButton = $(contentSelectorStr + "#queue-manager-container button#queue-now-button");
var queueNextButton = $(contentSelectorStr + "#queue-manager-container button#queue-next-button");
var queueLastButton = $(contentSelectorStr + "#queue-manager-container button#queue-last-button");
var sortObject;
var queueOpen = false;
var queueObject = new Queue;
var secondsToMinutes = function(e) {
    var t = Math.floor(e % 60 + .5).toString();
    if (t.length == 1) {
        t = "0" + t
    }
    return Math.floor(e / 60).toString() + ":" + t
};
var updateQueueFromDOM = function() {
    var e = [];
    var t;
    var n = $(contentSelectorStr + "#queue-manager ul li").get();
    for (key in n) {
        if (Number($(n[key]).attr("order")) == queueObject.currentlyPlaying) {
            t = e.length
        }
        e.push(queueObject.queue[Number($(n[key]).attr("order"))])
    }
    queueObject.queue = e;
    queueObject.currentlyPlaying = t;
    drawQueue()
};
var drawQueue = function() {
    queueList.html("");
    for (key in queueObject.queue) {
        var e = queueObject.queue[key];
        var t;
        var n = true;
        var r = "doc";
        if (key < queueObject.currentlyPlaying) {
            t = $("<li class='list-group-item previous' order='" + key + "'></li>")
        } else if (key == queueObject.currentlyPlaying) {
            t = $("<li class='list-group-item active' order='" + key + "'></li>");
            n = false
        } else {
            t = $("<li class='list-group-item' order='" + key + "'></li>")
        }
        if (e.type == "youtube") {
            r = "youtube-play"
        } else if (e.type == "soundcloud") {
            r = "soundcloud"
        }
        t.append("<span class='icon-" + r + " media-icon'></span>");
        var i = $("<span class='media-name'>" + e.title + " [" + secondsToMinutes(e.duration) + "]</span>");
        $("#" + hiddenDivID).append(i);
        if (i.height() > 50) {
            var s = 70;
            var o = e.title.substr(0, s);
            o = o.substr(0, o.lastIndexOf(" "));
            console.log(s);
            i = $("<span class='media-name'>" + o + "... [" + secondsToMinutes(e.duration) + "]</span>")
        } else if (i.height() < 30) {
            i = $("<span class='media-name single-line'>" + e.title + " [" + secondsToMinutes(e.duration) + "]</span>")
        }
        $("#" + hiddenDivID).html("");
        t.append(i);
        var u = $("<button type='button' class='close pull-right delete-button'><span class='glyphicon glyphicon-remove'></span>");
        u.click(function(e) {
            return function() {
                queueObject.delete(Number(e))
            }
        }(key));
        t.append(u);
        if (n) {
            var a = $("<button type='button' class='close pull-right play-button'><span class='glyphicon glyphicon-play'></span></button>");
            a.click(function(e) {
                return function() {
                    queueObject.play(Number(e))
                }
            }(key));
            t.append(a)
        }
        queueList.append(t)
    }
    setTimeout(function() {
        if ($(contentSelectorStr + "#queue-manager ul li.active").position()) scrollingQueueArea.scrollTop($(contentSelectorStr + "#queue-manager ul li.active").position().top + scrollingQueueArea.scrollTop() - 63)
    }, 10);
    if (!sortObject) {
        sortObject = new Sortable(queueList.get(0), {
            onEnd: updateQueueFromDOM
        })
    }
};
queueButton.click(function() {
    if (!queueOpen) {
        $(this).addClass("active");
        drawQueue();
        queueContainer.fadeIn(200)
    } else {
        queueInputField.popover("hide");
        $(this).removeClass("active");
        queueContainer.fadeOut(200);
        $(this).blur()
    }
    queueOpen = !queueOpen
});
var disableQueueInput = function() {
    queueInputField.popover("hide");
    queueInputField.val("Processing...");
    queueInputField.attr("disabled", true);
    queueNowButton.attr("disabled", true);
    queueNextButton.attr("disabled", true);
    queueLastButton.attr("disabled", true)
};
var enableQueueInput = function() {
    queueInputField.val("");
    queueInputField.attr("disabled", false);
    queueNowButton.attr("disabled", false);
    queueNextButton.attr("disabled", false);
    queueLastButton.attr("disabled", false)
};
var queueInputError = function() {
    setTimeout(function() {
        queueInputField.popover("show")
    }, 200);
    enableQueueInput()
};
queueNowButton.click(function() {
    if (queueInputField.val().trim().length > 1) {
        var e = queueObject.getTypeAndCode(queueInputField.val().trim());
        queueObject.getMetadata(e[0], e[1], function(e, t) {
            return function(n, r) {
                if (n) {
                    console.log("Success!");
                    queueObject.addNow(e, t, n, r);
                    enableQueueInput()
                } else {
                    queueInputError()
                }
            }
        }(e[0], e[1]));
        disableQueueInput()
    }
});
queueNextButton.click(function() {
    if (queueInputField.val().trim().length > 1) {
        var e = queueObject.getTypeAndCode(queueInputField.val().trim());
        queueObject.getMetadata(e[0], e[1], function(e, t) {
            return function(n, r) {
                if (n) {
                    console.log("Success!");
                    queueObject.addNext(e, t, n, r);
                    enableQueueInput()
                } else {
                    queueInputError()
                }
            }
        }(e[0], e[1]));
        disableQueueInput()
    }
});
queueLastButton.click(function() {
    if (queueInputField.val().trim().length > 1) {
        var e = queueObject.getTypeAndCode(queueInputField.val().trim());
        queueObject.getMetadata(e[0], e[1], function(e, t) {
            return function(n, r) {
                if (n) {
                    console.log("Success!");
                    queueObject.addToLast(e, t, n, r);
                    enableQueueInput()
                } else {
                    queueInputError()
                }
            }
        }(e[0], e[1]));
        disableQueueInput()
    }
});
nextButton.click(function() {
    queueObject.play(queueObject.currentlyPlaying + 1)
});
previousButton.click(function() {
    queueObject.play(queueObject.currentlyPlaying - 1)
});
var updateButtons = function() {
    if (queueObject.currentlyPlaying == queueObject.queue.length - 1) {
        nextButton.attr("disabled", true)
    } else {
        nextButton.attr("disabled", false)
    }
    if (queueObject.currentlyPlaying == 0) {
        previousButton.attr("disabled", true)
    } else {
        previousButton.attr("disabled", false)
    }
    if (queueObject.queue.length < 1) {
        nextButton.attr("disabled", true);
        previousButton.attr("disabled", true)
    }
};
var isMobile = function(e) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) return true
}(navigator.userAgent || navigator.vendor || window.opera);
var heightOffset = 170;
window.onresize = function() {
    if (window.innerWidth <= 992) {
        $("#chat-area #message-area").height(window.innerHeight - heightOffset);
        if (window.innerWidth <= 420) {
            $("#chat-area").css("marginLeft", "0");
            $("#chat-area").css("left", "0")
        } else {
            $("#chat-area").removeAttr("style")
        }
    } else {
        if (window.innerHeight <= 620) {
            $("#chat-area #message-area").height(window.innerHeight - heightOffset - 20)
        } else {
            $("#chat-area").removeAttr("style");
            $("#chat-area #message-area").removeAttr("style")
        }
    }
};
$("#header-area h1").dblclick(function() {
    console.log("Double click!");
    $("#header-area h1").hide();
    $("#header-area").append("<input class='title-edit'></input>");
    var e = $("#header-area input");
    e.val($("#header-area h1").text());
    e.autoGrowInput().focus().select();
    var t = function(t) {
        if (t.which) {
            if (!(t.which == 13)) {
                return
            }
        }
        if (e.val().trim().length > 1) {
            $("#header-area h1").text(e.val()).show();
            e.remove();
            broadcastData("title-rename", e.val())
        } else {
            $("#header-area h1").show();
            e.remove()
        }
    };
    e.blur(t);
    e.on("keydown", t)
});
$("#chat-area #input-box input").focus(function() {
    if (isMobile) {
        $("#header-area").hide();
        $("#chat-area").css("top", 10);
        heightOffset = 100
    }
});
$("#chat-area #input-box input").blur(function() {
    if (isMobile) {
        $("#header-area").show();
        $("#chat-area").removeAttr("style");
        heightOffset = 170;
        window.onresize()
    }
});
window.onresize();
var setupInteractionResponses = function() {
    onMessageType("title-rename", function(e, t) {
        if (typeof t == "string") {
            $("#header-area h1").text(t)
        }
    });
    onMessageType("request-title", function(e) {
        console.log("Requested title");
        sendData(e, "title-rename", $("#header-area h1").text())
    })
};
var runEverything = function(e) {
    setupInteractionResponses();
    requestData("request-title");
    requestData("request-queue-data");
    startChat(e)
}
