window.M = {}
M.Mo = class {
    constructor(o) {
        M.Bind(this, ['run', 'rRaf', 'uProp'])
        this.r = new M.Raf(this.run)
        this.o = this.init(o)
    }

    init(o) {
        let i = {
            el: M.SelectAll(o.el),
            d: {
                origin: o.d || 0,
                curr: 0
            },
            delay: o.delay || 0,
            cb: o.cb || !1,
            r: o.r || 2,
            e: {
                curve: o.e || "linear"
            },
            prog: 0,
            progE: 0,
            elapsed: 0
        }
        i.el = M.Is.arr(i.el) ? i.el : [i.el]
        i.elL = M.L(i.el)
        i.up = M.Has(o, 'update') ? t => o.update(i) : this.uProp
        let p = o.p || !1
        if (p) {
            i.prop = {}
            i.propLi = []
            let k = Object.keys(p)
            i.propL = M.L(k)
            let n = i.propL
            for (; n--;) {
                const c = k[n]
                i.prop[n] = {
                    name: c,
                    origin: {
                        start: p[c][0],
                        end: p[c][1],
                    },
                    curr: p[c][0],
                    start: p[c][0],
                    end: p[c][1],
                    unit: p[c][2] || '%'
                }
                i.propLi[c.charAt(0)] = n
            }

        }
        return i
    }

    uProp() {
        const p = this.o.prop
        let li = this.o.propLi
        let n = this.o.propL
        for (; n--;) {
            let ob = p[n]


            ob.curr = this.lerp(ob.start, ob.end)

            let x = M.Has(li, 'x') ? p[li.x].curr + p[li.x].unit : 0,
                y = M.Has(li, 'y') ? p[li.y].curr + p[li.y].unit : 0,
                r = M.Has(li, 'r') ? p[li.r].name + '(' + p[li.r].curr + 'deg)' : 0,
                s = M.Has(li, 's') ? p[li.s].name + '(' + p[li.s].curr + ')' : 0,
                xy = x + y === 0 ? 0 : 'translate3d(' + x + ',' + y + ', 0)'
            var t = xy + r + s === 0 ? 0 : [xy, r, s].filter(t => t !== 0).join(" "),
                o = M.Has(li, 'o') ? p[li.o].curr : -1,
                g = M.Has(li, 'g') ? 'grayscale(' + p[li.g].curr + ')' : -1
        }
        n = this.o.elL
        for (; n-- && M.Is.def(this.o.el[n]);) {
            t !== 0 && (this.o.el[n].style.transform = t)
            o >= 0 && (this.o.el[n].style.opacity = o)
            g !== 0 && (this.o.el[n].style.filter = g)
        }
    }

    run(t) {
        if (this.o.prog === 1) {
            this.pause()
            this.o.up()
            this.o.cb && this.o.cb()
        } else {
            this.o.elapsed = M.Clamp(t, 0, this.o.d.curr)
            this.o.prog = M.Clamp(this.o.elapsed / this.o.d.curr, 0, 1)
            this.o.progE = this.o.e.calc(this.o.prog)
            this.o.up()
        }
    }

    update(o) {
        let t = o || {},
            s = M.Has(t, 'reverse') ? "start" : "end"
        if (M.Has(this.o, 'prop')) {
            let n = this.o.propL
            for (; n--;) {
                let p = this.o.prop[n]
                p.end = p.origin[s]
                p.start = p.curr
            }
        }
        this.o.d.curr = t.d ?? M.R(this.o.d.origin - this.o.d.curr + this.o.elapsed)
        this.o.e.curve = t.e || this.o.e.curve
        this.o.e.calc = M.Ease[this.o.e.curve]
        this.o.delay = (M.Has(t, 'delay') ? t : this.o).delay
        this.o.cb = (M.Has(t, 'cb') ? t : this.o).cb
        this.o.prog = this.progE = this.o.d.curr === 0 ? 1 : 0
        this.delay = new M.Delay(this.o.delay, this.rRaf)
    }

    rRaf() {
        this.r.run()
    }

    play(t) {
        this.pause()
        this.update(t)
        this.delay.run()
    }

    pause() {
        this.r.stop()
        this.delay && this.delay.stop()
    }

    lerp(s, e) {
        return M.R(M.Lerp(s, e, this.o.progE), this.o.r)
    }
}
M.TL = class {
    constructor() {
        this.arr = []
        this.delay = 0
    }

    add(o) {
        this.delay += M.Has(o, "delay") ? o.delay : 0
        o.delay = this.delay
        this.arr.push(new M.Mo(o))
        return this
    }

    play(t) {
        this.arr.forEach(el => {
            el.play()
        })
    }
}
M.Raf = class {
    constructor(loop) {
        M.Bind(this, ['t', 'run', 'stop'])
        this.loop = loop
        this.id = this.s = null
        this.on = !1
    }

    run() {
        this.on = !0
        this.s = performance.now()
        this.id = requestAnimationFrame(this.t)
    }

    stop() {
        this.on = !1
        cancelAnimationFrame(this.id)
    }

    t(t) {
        if (!this.on) return
        this.loop(t - this.s)
        this.id = requestAnimationFrame(this.t)
    }
}
M.Delay = class {
    constructor(d, cb) {
        this.d = d
        this.cb = cb
        M.Bind(this, ["loop"])
        this.r = new M.Raf(this.loop)
    }

    run() {
        this.d === 0 ? this.cb() : this.r.run()
    }

    stop() {
        this.r.stop()
    }

    loop(e) {
        let t = M.Clamp(e, 0, this.d)
        if (t === this.d) {
            this.stop()
            this.cb()
        }
    }
}
M.Scope = class {
    constructor(el, r, o) {
        M.Bind(this, ['cb'])
        this.el = M.Select(el)
        this.r = r
        this.o = o
    }

    e(a) {
        M.E(document, 'scroll', this.cb, a)
        M.E(window, 'load', this.cb, a)
        M.E(document, 'vLoad', this.cb, a)
    }

    observe() {
        this.e('a')

    }

    unobserve() {
        this.e('r')

    }

    visible() {
        const r = this.r, h = this.el.offsetHeight
        let t = this.el.getBoundingClientRect().top,
            b = this.el.getBoundingClientRect().bottom,
            vH = (innerHeight - t) / h

        return (vH > r) && (b > 0);

    }


    cb() {
        if (this.visible()) {
            this.o.css && this.cl()
            this.o.cb && this.o.cb()
            this.unobserve()
        }
    }

    cl() {
        this.o.css && M.Cl(this.el, 'r', this.o.css)
    }
}
M.W = class {
    static get w() {
        return innerWidth
    }

    static get h() {
        return innerHeight
    }
}
M.Is = {
    def: t => t !== undefined,
    und: t => t === undefined,
    null: t => t === null,
    str: t => "string" == typeof t,
    obj: t => t === Object(t),
    arr: t => t.constructor === Array,
    img: t => t.tagName === "IMG",
    imgLoad: t => t.complete === true, // A gérer avec un RAF
    interval: (t, inf, sup) => t >= inf && t <= sup
}
M.Ease = {
    linear: t => t,
    cb: t => t ** 3 - 3 * t ** 2 + 3 * t,
    o3: t => (--t) * t * t + 1
}
M.XY = {
    accX: 0, accY: 0, offsetTop: function (el) {
        this.accY = 0
        if (el.offsetParent) {
            this.accY = this.offsetTop(el.offsetParent)
        }
        return el.offsetTop + this.accY
    }, offsetLeft: function (el) {
        this.accX = 0
        if (el.offsetParent) {
            this.accX = this.offsetLeft(el.offsetParent)
        }
        return el.offsetLeft + this.accX
    }

}
M.G = {
    root: r => M.Is.def(r) ? r : document,
    s: (r, t, el) => {
        let l = M.G.root(r)["getElement" + t](el)
        return t === "ById" ? l : Array.from(l)
    },
    id: (el, r) => M.G.s(r, "ById", el),
    class: (el, r) => M.G.s(r, "sByClassName", el),
    tag: (el, r) => M.G.s(r, "sByTagName", el),
    attr: el => document.querySelector(el)
}
M.Pe = {
    f: (t, r) => {
        t.style.pointerEvents = r
    }, all: t => {
        M.Pe.f(t, "all")
    }, none: t => {
        M.Pe.f(t, "none")
    }
}
M.Index = (el, arr) => {
    let n = M.L(arr);
    for (let i = 0; i < n; i++)
        if (el === arr[i])
            return i;
    return -1
}
M.Clamp = (t, inf, sup) => Math.max(inf, Math.min(sup, t))
M.Lerp = (s, e, a) => s * (1 - a) + a * e
M.Has = (t, r) => t.hasOwnProperty(r)
M.Rand = (a, b) => Math.random() * (b - a) + a
M.Fetch = o => {
    let t = "json" === o.type;
    const s = t ? "json" : "text"
        , p = {
        method: o.method,
        headers: new Headers({
            "Content-type": t ? "application/x-www-form-urlencoded" : "text/html"
        }),
        mode: "same-origin"
    }
    t && (p.body = o.body)
    fetch(o.url, p)
        .then(r => {
            if (r.ok) return r[s]()
        })
        .then(r => {
            o.success(r)
        })
}
M.PD = t => {
    t.cancelable && t.preventDefault()
}
M.Bind = (t, f) => {
    for (let i = 0; i < M.L(f); i++) {
        t[f[i]] = t[f[i]].bind(t)
    }
}
M.Select = el => {
    if (!M.Is.str(el)) return el
    let s = el.substring(1),
        c = el.charAt(0) === "#" ? M.G.id(s) : el.charAt(0) === "." ? M.G.class(s) : M.G.tag(el)
    if (M.Is.null(c)) return
    c = M.Is.arr(c) ? c : [c]
    return c[0]
}
M.SelectAll = el => {
    if (!M.Is.str(el)) {
        if (M.Is.arr(el)) {
            return el
        } else {
            return [el]
        }
    }
    let s = el.substring(1),
        c = el.charAt(0) === "#" ? M.G.id(s) : el.charAt(0) === "." ? M.G.class(s) : M.G.tag(el)
    if (M.Is.null(c)) return
    return M.Is.arr(c) ? c : [c]
}
M.Ga = (t, r) => t.getAttribute(r)
M.T = (t, x, y, u) => {
    u = M.Is.und(u) ? "%" : u
    const xyz = "translate3d(" + x + u + "," + y + u + ",0)"
    let s = t.style
    s['transform'] = xyz
    s['mozTransform'] = xyz
    s['msTransform'] = xyz
}
M.O = (t, r) => {
    t = M.Select(t)
    t.style.opacity = r
}
M.D = (t, r) => {
    r = r === 'n' ? 'none' : 'flex'
    let s = M.Select(t).style
    s['display'] = r
}
M.S = (t, p, r) => {
    let s = M.Select(t).style
    s[p] = r

}
M.R = (t, r) => {
    r = M.Is.und(r) ? 100 : 10 ** r
    return Math.round(t * r) / r
}
M.E = (el, e, cb, o, opt) => {
    let s = M.SelectAll(el),
        n = M.L(s)
    o = o === 'r' ? 'remove' : 'add'
    for (let i = 0; i < n; i++) {
        s[i][o + "EventListener"](e, cb, opt)
    }
}
M.L = t => t.length
M.De = (t, s) => {
    const cE = new CustomEvent(s)
    t.dispatchEvent(cE)
}
M.Cl = (el, action, css) => {
    if (M.Is.und(el)) return
    let s = M.SelectAll(el), n = M.L(s)
    action = action === 'a' ? 'add' : action === 'r' ? 'remove' : 'toggle'
    for (let i = 0; i < n; i++) {
        s[i].classList[action](css)
    }
}
M.Cr = el => document.createElement(el)
M.Tg = (t, i = false) => i ? t.currentTarget : t.target,
    M.Pn = t => t.parentNode
M.C = t => t.childrenM.Sp = t => t.stopPropagation()
M.In = t => location.href.includes(t)
M.__ = (p, v, t) => {
    const el = t ? M.Select(t) : document.documentElement
    el.style.setProperty(p, v)
}
M.g__ = (p) => {
    let root = document.documentElement,
        v = root.style.getPropertyValue(p)
    return v.split('px')[0]
}

!function () {
    "use strict"

    class i {
        constructor() {
            this.p = new p
        }

        intro(d = _M.delay) {
            new M.TL()
                .add({
                    el: '',
                    delay: d,
                    cb: () => M.Cl('.m-intro', 'r', 'm-intro')
                })
                .play()
        }

    }

    class d {
        constructor(o) {
            this.data = o
        }

        get() {
            let t = this.data[_M.route.new.url]
            return M.Is.und(t) ? false : t
        }
    }

    class t {
        constructor() {
            M.Bind(this, ["update", "removeOld", "insertNew", "vLoad", "onPopstate"])
            this.l = new l
            this.cache = ''
            this.a = M.SelectAll('._a')
            this.r = new M.Raf(this.vLoad)
            this.init()
        }

        vLoad() {
            if (document.readyState == 'complete') {
                M.De(document, 'vLoad')
                this.r.stop()
            }
        }

        init() {
            var t = _M
            M.Fetch({
                url: origin + "/brain?xhr=true",
                type: "html",
                method: 'GET',
                success: r => {
                    r = JSON.parse(r)
                    const c = t.config
                    c.routes = r.routes
                    this.cache = new d(r.cache)
                    this.layer = M.Select('#main')
                }
            })
        }

        update(e) {
            M.PD(e)
            let tg = M.Tg(e),
                p = tg.pathname
            for (let l of this.a) {
                M.Cl(l.parentNode, 'r', 'is-active')
            }
            M.Cl(tg.parentNode, 'a', 'is-active')
            p !== _M.route.new.url && this.switch(p)
        }

        onPopstate() {
            let p = location.pathname
            for (let l of this.a) {
                if (l.pathname != p)
                    M.Cl(l.parentNode, 'r', 'is-active')
                else
                    M.Cl(l.parentNode, 'a', 'is-active')

            }
            p !== _M.route.new.url && this.switch(p, false)

        }

        switch(u, h = true) {
            const t = _M
            let p = t.config.routes[u]
            t.route.old = t.route.new
            t.route.new = {
                url: u,
                page: p
            }
            h && history.pushState({path: u}, '', u)
            h && t.was.push({
                ...t.route.old
            })
            console.log(_M.was)
            this.c()
        }

        c() {
            this.insertNew()
            let _old = this.layer.children[0],
                _new = this.layer.children[1],
                _i = new i,
                t = _M.e.s
            t.stop()
            let tl = new M.TL()
            tl
                .add({
                    el: _new,
                    p: {o: [0, 0]},
                })
                .add({
                    el: _old,
                    p: {o: [1, 0]},
                    d: 500,
                    delay: 200
                })
                .add({
                    el: _old,
                    cb: () => {
                        this.removeOld()
                    },
                    delay: 700
                })
                .add({
                    el: _new,
                    p: {o: [0, 1]},
                    d: 500,
                    cb: () => {
                        t.init()
                        _i.intro()
                        t.run()
                    }
                })
                .add({
                    el: '',
                    cb: () => {
                        _M.e.b.on()
                    },
                    delay: 500
                })
                .play()
        }

        insertNew() {
            let N = this.cache.get()
            document.title = N.title
            this.add(N.html)
        }

        removeOld() {
            let O = this.layer.children
            O[0].parentNode.removeChild(O[0])
        }

        e() {
            M.E('._a', 'click', this.update)
            M.E(window, 'popstate', this.onPopstate)
        }

        add(el) {
            this.layer.insertAdjacentHTML("beforeend", el)
        }

        run() {
            this.e()
            this.vLoad()
        }
    }

    class l {
        constructor() {
            M.Bind(this, ['loop', 'intro', 'outro'])
            this.r = new M.Raf(this.loop)
            this.init()
            this.intro()
        }

        loop() {
        }

        init() {
        }

        outro() {
        }

        intro() {
        }

        update() {
        }

    }

    class p {
        constructor(el) {
            M.Bind(this, ['close'])
            this.el = M.Select(el)
        }

        show() {
            _M.e.s.stop()
            this.run()
        }

        close(e) {

        }

        run() {
            this.e('a')
        }

        e(o) {
        }
    }

    class n {
        constructor() {
            M.Bind(this, ["open", "close"])
        }

        e(o) {
            M.E(".open_nav", 'click', this.open, o)
            M.E(".close_nav", 'click', this.close, o)
        }

        run() {
            this.e('a')
        }

        open(e) {
            this.cb(e, 'a')
        }

        close(e) {
            this.cb(e, 'r')
        }

        cb(e, o) {
            e.stopPropagation()
            M.Cl(".w-nav_header", o, 'is-active')
            M.Cl(".open_nav", o, 'is-active')
            M.Cl(".close_nav", o, 'is-active')
        }
    }

    class s {
        constructor() {
            M.Bind(this, ["w", "key", "tS", "tM", "onScroll", "loop", "run", "resize", "loop"])
            _M.scroll = {
                x: 0,
                y: 0,
                deltaX: 0,
                deltaY: 0,
                origin: null,
            }
            this.options = {
                mM: 1,
                tM: 2,
                fM: 50,
                kS: 240,
                speed: 0.5,
                preventTouch: false
            }
            this.scrollY = 0
            this.isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
            this.isScrolling = false;
            this.hasScrollTicking = false

        }

        get max() {
            const p = M.Select('.page')
            return p.scrollHeight - innerHeight
        }


        rRaf() {
            this.t = Date.now()
            this.isScrolling = true
            this.loop()
        }

        pause() {
            cancelAnimationFrame(this.loopId)
            this.isScrolling = false
            _M.scroll.y = M.R(_M.scroll.y)

        }

        cb(e) {

            if (e.ctrlKey) return
            let smooth = !!e.changedTouches ? false : true
            if (!smooth) return
            if (e.buttons === 4) return

            M.PD(e)
            requestAnimationFrame(() => {
                const t = _M.scroll
                t.y = M.Clamp(t.y + t.deltaY, 0, this.max)
                t.originalEvent = e
                if (!this.isScrolling) this.rRaf();
            })


        }

        loop() {
            if (this.isScrolling) {
                if (!this.hasScrollTicking) {
                    this.loopId = requestAnimationFrame(() => this.loop())
                    this.hasScrollTicking = true
                }

                scrollTo(0, this.scrollY)
                this._scrollY()
                const d = Math.abs(this.scrollY - _M.scroll.y),
                    _t = Date.now() - this.t
                if (_t > 100 && d < 0.5) {
                    this.pause();
                }
                this.hasScrollTicking = false

            }

        }

        run() {
            let root = document.documentElement
            M.Cl(root, 'r', 's')
            this.e('a')
        }

        stop() {
            let root = document.documentElement
            M.Cl(root, 'a', 's')
            this.e('r')
        }

        init() {
            this.scrollY = _M.scroll.y = scrollY
        }

        w(e) {
            const t = _M.scroll
            t.deltaX = e.deltaX
            t.deltaY = e.deltaY
            if (this.isFirefox && e.deltaMode == 1) {
                t.deltaX *= this.options.fM;
                t.deltaY *= this.options.fM;
            }
            t.deltaX *= this.options.mM
            t.deltaY *= this.options.mM
            this.cb(e)
        }

        tS(e) {
            let T = (e.targetTouches) ? e.targetTouches[0] : e
            this.tsX = T.pageX
            this.tsY = T.pageY
        }

        tM(e) {
            const t = _M
            let T = (e.targetTouches) ? e.targetTouches[0] : e
            t.scroll.deltaX = (T.pageX - this.tsX) * this.options.tM
            t.scroll.deltaY = (T.pageY - this.tsY) * this.options.tM
            this.tsX = T.pageX
            this.tsY = T.pageY
            this.cb(e)
        }

        key(e) {
            const t = _M.scroll;
            t.deltaX = t.deltaY = 0;
            let key = [
                    {c: 37, d: 'x', s: -1},
                    {c: 39, d: 'x', s: 1},
                    {c: 38, d: 'y', s: -1},
                    {c: 40, d: 'y', s: 1}
                ],
                n = M.L(key);
            for (let i = 0; i < n; i++) {
                if (e.keyCode === key[i].c) {
                    t[key[i].d === "x" ? "deltaX" : "deltaY"] = this.options.kS * key[i].s
                }
            }

            (t.deltaX || t.deltaY) && this.cb(e)
        }

        _scrollY() {
            this.scrollY = M.Lerp(this.scrollY, _M.scroll.y, 0.1)
        }

        resize(e) {
            requestAnimationFrame(() => {
                const t = _M.scroll
                t.y = M.R(M.Clamp(t.y, 0, this.max), 0)
                if (!this.isScrolling) this.rRaf();
            })

        }

        onScroll() {
            if (!this.isScrolling) {
                this.scrollY = _M.scroll.y = scrollY
            }

        }

        e(o) {
            M.E(document, "keydown", this.key, o)
            M.E(window, "wheel", this.w, o, {passive: false})
            M.E(window, "touchstart", this.tS, o, {passive: false})
            M.E(window, "touchmove", this.tM, o)
            M.E(window, "scroll", this.onScroll, o)
            M.E(window, "resize", this.resize, o)
            M.E(window, "orientationchange", this.resize, o)
        }

        scrollTo(y) {
            _M.scroll.y = y
            this.rRaf()

        }

    }

    class P {
        constructor(el) {
            M.Bind(this, ['onScroll'])
            this.el = el
            this.o = JSON.parse(this.el.dataset.options)
            this.r = this.o.s
            this.c = this.o.c
            this.elementY = M.XY.offsetTop(this.el) + this.el.offsetHeight / 2
            this.el.style.willChange = 'transform'
            this.s = new M.Scope(el, 0)
            this.run()
        }

        static init() {
            M.SelectAll('.P').map(
                (el) => {
                    return new P(el)
                }
            )
        }

        t(el, x, y) {
            let xyz = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,${x},${y},0,1)`;
            el.style.setProperty('webkitTransform', xyz);
            el.style.setProperty('msTransform', xyz);
            el.style.setProperty('transform', xyz);
        }

        cb() {
            const screnY = scrollY + innerHeight / 2;
            const d = this.elementY - screnY;
            if (this.c && d < 0) {
                this.t(this.el, 0, d * -1 * this.r)

            } else if (!this.c) {
                this.t(this.el, 0, d * -1 * this.r)
            }

        }

        onScroll(f = false) {
            f || this.cb();
            (this.s.visible()) && (requestAnimationFrame(() => this.cb()));

        }

        e(o) {
            M.E(document, "scroll", this.onScroll, o)

        }

        run() {
            this.onScroll(true)
            this.e('a')
        }

    }

    class S {
        constructor() {
        }

        static init() {
            let b = M.G.class("_s--text"), m = M.L(b)
            for (let i = 0; i < m; i++) {
                new M.Scope(
                    b[i], 1, {
                        cb: () => {
                            let mo = new M.Mo({
                                el: b[i],
                                p: {y: [105, 0, '%']},
                                d: .7 * 1000,
                                e: 'o3'
                            })
                            mo.play()
                        }
                    }).observe()

            }
            let c = M.G.class("_s--o"), o = M.L(c)
            for (let i = 0; i < o; i++) {
                new M.Scope(c[i], 0.7, {
                    cb: () => {
                        let mo = new M.Mo({
                            el: c[i],
                            p: {o: [0, 1]},
                            d: .7 * 1000,
                            delay: .25 * 1000,
                            e: 'o3'
                        })
                        mo.play()
                    }
                }).observe()
            }
        }
    }

    class T {
        constructor(el) {
            M.Bind(this, ['open', 'close'])
            this.id = el.id
            this.run()
        }

        static init() {
            return M.SelectAll('.T').map(
                (el) => {
                    return new T(el)
                }
            )
        }

        run() {
            this.e('a')
        }

        open(e) {
            M.Sp(e);
            _M.e.s.stop();
            this.cl('a');
            if (this.id === 'search') M.Select('#searchInput').focus();
        }

        close(e) {
            M.Sp(e);
            _M.e.s.run();
            this.cl('r');
        }

        e(a) {
            M.E(M.Select("#" + this.id + "-open"), 'click', this.open, a);
            M.E("." + this.id + "-close", 'click', this.close, a);
        }

        cl(o) {
            M.Cl(M.Select("#" + this.id), o, "is-active");
            M.Cl(M.Select("#overlay"), o, "is-active");
        }
    }

    class gl {
        constructor() {
            M.Bind(this, ['mM', 'loop', 'onResize'])
            this.c = M.Select('#gl')
            this.t = {
                x: M.W.w /2,
                y: M.W.h / 2
            }
            this.ctx = this.c.getContext('2d')
            this.r = new M.Raf(this.loop)
            this._e()

        }

        onResize() {
            requestAnimationFrame(() => {
                this.c.width = M.W.w
                this.c.height = M.W.h
                this.drawBg()
                this.drawText()
            })
        }

        init() {
            this.c.width = M.W.w
            this.c.height = M.W.h
            this.drawBg()
            this.drawText()
            this.drawLight()

        }

        intro() {
            new M.Delay(1500,()=> {
                M.Cl('#overlay','a','is-active')
                new M.TL()
                    .add({
                        el: '',
                        delay: 700,
                        cb: () => {
                            M.Cl('#overlay','a','is-hidden')
                        }
                    })
                    .add({
                        el: '',
                        delay: 1000,
                        cb: () => {
                            M.Cl('#overlay','r','is-hidden')

                        }
                    })
                    .add({
                        el: '',
                        delay: 500,
                        cb: () => {
                            M.Cl('#overlay','a','is-hidden')
                        }
                    })
                    .add({
                        el: '',
                        delay: 500,
                        cb: () => {
                            M.Cl('#overlay','r','is-hidden')

                        }
                    })
                    .add({
                        el: '',
                        delay: 1000,
                        cb: () => {
                            M.Cl('#overlay','a','is-hidden')

                        }
                    })
                    .add({
                        el: '',
                        delay: 1000,
                        cb: () => {
                            M.Cl('#overlay','r','is-hidden')

                        }
                    })
                    .add({
                        el: '',
                        delay: 500,
                        cb: () => {
                            this.loop()
                            this.run()

                        }
                    })
                    .add({
                        el: '',
                        delay: 1000,
                        cb: () => {
                            M.Cl('#overlay','a','is-hidden')
                            console.log('hey')

                        }
                    })
                    .play()
            }).run()
        }

        loop() {
            this.clear()
            this.drawBg()
            this.drawText()
            this.drawTorch(150)
            const d = Math.abs(this.t.x - _M.mouse.x)
            if (d < 0.5 && this.r.on) this.r.stop()
        }

        clear() {
            const xy = M.W
            this.ctx.fillRect(0, 0, xy.w, xy.h)
        }

        clearCircle(ctx, x, y, r) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI, true);
            ctx.clip();
            ctx.clearRect(x - r, y - r, 2 * r, 2 * r);
            ctx.restore();
        }

        drawBg(ctx = this.ctx) {
            const xy = M.W
            ctx.fillStyle = '#181719';
            ctx.fillRect(0, 0, xy.w, xy.h);
        }

        drawText(ctx = this.ctx) {
            ctx.fillStyle = '#FCFCFC';
            ctx.font = "600 24px/1.33  Satoshi-Variable";
            ctx.fillText("404 NOT FOUND", 32, 56);
        }

        drawTorch(r, ctx = this.ctx) {
            const _ = _M.mouse
            this.t.x = M.Lerp(this.t.x, _.x, 0.1)
            this.t.y = M.Lerp(this.t.y, _.y, 0.1)
            this.clearCircle(ctx, this.t.x, this.t.y, r)


        }


        drawLight(s1 = M.W.w, s2 = 0, x1 = -M.W.w * 0.95, x2 = M.W.w * 0.55, ctx = this.ctx) {
            const xy = M.W
            ctx.save()
            ctx.beginPath()
            ctx.moveTo(s1, s2)
            ctx.lineTo(x2, xy.h)
            ctx.lineTo(x1, xy.h)
            ctx.lineTo(s1, s2)
            ctx.clip()
            ctx.clearRect(0, 0, xy.w, xy.h)
            ctx.restore()
        }

        run() {
            this.e('a')
        }

        _e() {
            M.E(window, 'resize', this.onResize, 'a')
        }

        e(o) {
            M.E(window, 'mousemove', this.mM, o)
        }

        mM(e) {
            const t = _M.mouse
            t.x = e.clientX
            t.y = e.clientY
            this.cb(e)
        }

        cb() {
            this.r.on || this.r.run()
        }

    }

    class b {
        constructor() {
            M.Bind(this, ['on'])
            this.i = new i
            this.l = new l
            this.n = new n
            this.t = new t
            this.on()
        }

        _init() {
            _M.e.s = new s
            _M.e.gl = new gl
            _M.E.S = S.init()
            _M.E.T = T.init()
            _M.E.P = _D.isM || P.init()

        }

        init() {
            this.setHH()
            _M.e.s.init()
            _M.e.gl.init()
        }

        intro() {
            this.i.intro()
            _M.e.gl.intro()

        }

        run() {
            _M.e.s.stop()
            this.n.run()
            this.t.run()

        }

        setHH() {
            let h = M.Select('#header')
            h = h.offsetHeight
            M.__('--header-height', h + 'px')

        }

        on() {
            this._init()
            this.init()
            this.intro()
            this.run()
        }

    }

    (_M.e.b = new b)

    console.log('\n %c Made with ❤️ by La2spaille  %c \n ', 'border: 1px solid #000;color: #fff; background: #000; padding:5px 0;', '')
}()