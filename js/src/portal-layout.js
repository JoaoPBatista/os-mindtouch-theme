function resizeDialog() {
    var a = osjs(".ui-dialog.ui-widget.ui-widget-content.ui-corner-all.Popup.ui-draggable");
    (null == _thisId || _thisId != a.attr("id")) && (_thisId = a.attr("id"), _startWidth = a.css("width")), osjs(window).width() < parseInt(_startWidth) ? a.css({
        left: "0%",
        width: "99%"
    }) : a.css({
        left: Math.abs(osjs(window).width() / 2 - parseInt(_startWidth) / 2) + "px",
        width: _startWidth
    })
}

function ShowValidationMessage(a, b) {
    return osjs(".popup-holder" + b).show(), osjs(".MainBackground" + b).show(), osjs("#" + a).css({
        top: Math.abs($(window).height() / 2 - $("#" + a).height() / 2),
        left: Math.abs($(window).width() / 2 - $("#" + a).width() / 2)
    }), !1
}

function ValidateCancel(a, b) {
    osjs(".popup-holder" + b).hide(), osjs(".MainBackground" + b).hide()
}

function ValidateConfirmation(a, b, c) {
    return osjs(".popup-holder" + b).hide(), osjs(".MainBackground" + b).hide(), "" != c && document.getElementById(b).setAttribute("onclick", c), osjs("#" + b).click(), "" != c && document.getElementById(b).setAttribute("onclick", "return ShowValidationMessage('" + a + "','" + b + "')"), !0
}
var _startWidth, _thisId;
osjs(document).ready(function() {
    resizeDialog(), osjs(window).resize(function() {
        resizeDialog()
    })
}), $(function(a) {
    var b = window.RichWidgets = window.RichWidgets || {},
        c = ".Menu_DropDownButton",
        d = ".Menu_TopMenu",
        e = ".Menu_DropDownPanel",
        f = "open",
        g = a(document.body),
        h = a([]),
        i = function(a) {
            a.addClass(f), b.DropDownMenus.customOpenFunction ? a.find(e).each(function() {
                b.DropDownMenus.customOpenFunction(this)
            }) : a.find(e).show(), h = h.add(a)
        },
        j = function(a) {
            a.removeClass(f), b.DropDownMenus.customCloseFunction ? a.find(e).each(function() {
                b.DropDownMenus.customCloseFunction(this)
            }) : a.find(e).hide(), h = h.not(a)
        };
    g.delegate(d, "click", function(b) {
        var d = a(this),
            g = d.closest(c);
        if (g.length) {
            var h = g.find(e);
            h.text().length && (g.hasClass(f) ? j(g) : i(g), b.preventDefault())
        }
    }), a(document.body).bind("click", function(b) {
        var d = a(b.target).closest(c);
        h.not(d).each(function() {
            var b = a(this);
            b.hasClass(f) && j(b)
        })
    }), a(c).has(e + " a").find(".MenuItemArrow").each(function() {
        var b = a(this);
        b.first("a").append(' <span class="Menu_DropDownArrow"/>')
    }), b.DropDownMenus = {
        closeAllMenus: function() {
            h.each(function() {
                j(a(this))
            })
        },
        toggleMenu: function(a) {
            a.hasClass(f) ? j(a) : i(a)
        },
        customOpenFunction: function(b) {
            a(b).slideDown(50)
        },
        customCloseFunction: null
    }
}), $(function(a) {
    var b = window.RichWidgets = window.RichWidgets || {},
        c = ".Application_Menu",
        d = "MenuSlider_Toggler_Overlay",
        e = ".MenuSlider_Toggler",
        f = function(c) {
            a("body").toggleClass("MenuSlider_IsOpen"), a("body").toggleClass("no-scroll"), b.MenuSlider.onMenuStateChanged && b.MenuSlider.onMenuStateChanged(), c.stopPropagation()
        };
    if (!a(c).has("a").length) return void a(e).hide();
    a(e).bind("click", f);
    var g = a('<div class="' + d + '">').bind("click", f).bind("swiperight", f);
    a("body").append(g), a(".Application_Menu").bind("swiperight", f), b.MenuSlider = {
        isMenuOpen: function() {
            return a("body").hasClass("MenuSlider_IsOpen")
        },
        toggleMenu: f,
        onMenuStateChanged: null
    }
}), $(function() {
    $(".no-scroll").on("touchmove", function(a) {
        a.preventDefault()
    }, !1)
}), ! function(a) {
    var b = function(a, b) {
        this.init("tooltip", a, b)
    };
    b.prototype = {
        constructor: b,
        init: function(b, c, d) {
            var e, f;
            this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.enabled = !0, "click" == this.options.trigger ? this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)) : "manual" != this.options.trigger && (e = "hover" == this.options.trigger ? "mouseenter" : "focus", f = "hover" == this.options.trigger ? "mouseleave" : "blur", this.$element.on(e + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(f + "." + this.type, this.options.selector, a.proxy(this.leave, this))), this.options.selector ? this._options = a.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        },
        getOptions: function(b) {
            return b = a.extend({}, a.fn[this.type].defaults, b, this.$element.data()), b.delay && "number" == typeof b.delay && (b.delay = {
                show: b.delay,
                hide: b.delay
            }), b
        },
        enter: function(b) {
            var c = a(b.currentTarget)[this.type](this._options).data(this.type);
            return c.options.delay && c.options.delay.show ? (clearTimeout(this.timeout), c.hoverState = "in", this.timeout = setTimeout(function() {
                "in" == c.hoverState && c.show()
            }, c.options.delay.show), void 0) : c.show()
        },
        leave: function(b) {
            var c = a(b.currentTarget)[this.type](this._options).data(this.type);
            return this.timeout && clearTimeout(this.timeout), c.options.delay && c.options.delay.hide ? (c.hoverState = "out", void(this.timeout = setTimeout(function() {
                "out" == c.hoverState && c.hide()
            }, c.options.delay.hide))) : c.hide()
        },
        show: function() {
            var a, b, c, d, e, f, g;
            if (this.hasContent() && this.enabled) {
                switch (a = this.tip(), this.setContent(), this.options.animation && a.addClass("fade"), f = "function" == typeof this.options.placement ? this.options.placement.call(this, a[0], this.$element[0]) : this.options.placement, b = /in/.test(f), a.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).insertAfter(this.$element), c = this.getPosition(b), d = a[0].offsetWidth, e = a[0].offsetHeight, b ? f.split(" ")[1] : f) {
                    case "bottom":
                        g = {
                            top: c.top + c.height,
                            left: c.left + c.width / 2 - d / 2
                        };
                        break;
                    case "top":
                        g = {
                            top: c.top - e,
                            left: c.left + c.width / 2 - d / 2
                        };
                        break;
                    case "left":
                        g = {
                            top: c.top + c.height / 2 - e / 2,
                            left: c.left - d
                        };
                        break;
                    case "right":
                        g = {
                            top: c.top + c.height / 2 - e / 2,
                            left: c.left + c.width
                        }
                }
                a.offset(g).addClass(f).addClass("in")
            }
        },
        setContent: function() {
            var a = this.tip(),
                b = this.getTitle();
            a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
        },
        hide: function() {
            function b() {
                var b = setTimeout(function() {
                    c.off(a.support.transition.end).detach()
                }, 500);
                c.one(a.support.transition.end, function() {
                    clearTimeout(b), c.detach()
                })
            }
            var c = this.tip();
            return c.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? b() : c.detach(), this
        },
        fixTitle: function() {
            var a = this.$element;
            (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").removeAttr("title")
        },
        hasContent: function() {
            return this.getTitle()
        },
        getPosition: function(b) {
            return a.extend({}, b ? {
                top: 0,
                left: 0
            } : this.$element.offset(), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            })
        },
        getTitle: function() {
            var a, b = this.$element,
                c = this.options;
            return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
        },
        tip: function() {
            return this.$tip = this.$tip || a(this.options.template)
        },
        validate: function() {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        },
        enable: function() {
            this.enabled = !0
        },
        disable: function() {
            this.enabled = !1
        },
        toggleEnabled: function() {
            this.enabled = !this.enabled
        },
        toggle: function(b) {
            var c = a(b.currentTarget)[this.type](this._options).data(this.type);
            c[c.tip().hasClass("in") ? "hide" : "show"]()
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    }, a.fn.tooltip = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("tooltip"),
                f = "object" == typeof c && c;
            e || d.data("tooltip", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.tooltip.Constructor = b, a.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover",
        title: "",
        delay: 0,
        html: !1
    }
}(window.jQuery);