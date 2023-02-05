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
    arr: t => t.constructor === Array,
}
M.Ease = {
    linear: t => t,
    cb: t => t ** 3 - 3 * t ** 2 + 3 * t,
    o3: t => (--t) * t * t + 1
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
M.Cl = (el, action, css) => {
    if (M.Is.und(el)) return
    let s = M.SelectAll(el), n = M.L(s)
    action = action === 'a' ? 'add' : action === 'r' ? 'remove' : 'toggle'
    for (let i = 0; i < n; i++) {
        s[i].classList[action](css)
    }
}
M.Tg = (t, i = false) => i ? t.currentTarget : t.target
M.Pn = t => t.parentNode
M.Sp = t => t.stopPropagation()

// Main
!function () {
    "use strict"

    class i {
        constructor() {
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

    class gl {
        constructor() {
            M.Bind(this, ['mM', 'tM', 'loop', 'onResize'])
            this.c = M.Select('#gl')
            this.t = {
                x: M.W.w / 2,
                y: M.W.h / 2
            }
            this.ctx = this.c.getContext('2d')
            this.r = _D.isD ? 150 : 100
            this.raf = new M.Raf(this.loop)
            this.i = 1
            this._e()


        }

        onResize() {
            requestAnimationFrame(() => {
                this.init()
            })
        }

        init() {
            this.c.width = M.W.w
            this.c.height = M.W.h
            this.drawBg()
            this.drawText()
            this.i && this.drawLight()
            this.i || this.loop()
        }

        intro() {

            new M.Delay(1500, () => {
                M.Cl('#overlay', 'a', 'is-active')
                let T = new M.TL()
                const D = [700, 1500, 1000, 1000, 1500, 1000]
                for (let i = 0; i < M.L(D); i++) {
                    T.add({
                        el: '',
                        delay: D[i],
                        cb: () => {
                            M.Cl('#overlay', 't', 'is-hidden')
                            M.Cl('.lamp', 't', 'is-active')
                        }
                    })
                }

                T
                    .add({
                        el: '',
                        delay: 800,
                        cb: () => {
                            this.loop()
                            this.run()
                            M.Cl('.lamp', 'a', 'is-rm')
                            M.Cl('.spider_web', 'r', 'is-hidden')

                        }
                    })
                    .add({
                        el:'.txt_notice0',
                        p:{
                            y:[105,0,'%']
                        },
                        d:1000,
                        e:'o3',
                    })
                    .add({
                        el:'.txt_notice0',
                        p:{
                            y:[0,-105,'%']
                        },
                        d:750,
                        delay:1750,
                        e:'o3',
                    })
                    .add({
                        el:'.txt_notice1',
                        p:{
                            y:[105,0,'%']
                        },
                        d:1000,
                        delay:750,
                        e:'o3',
                    })
                    .add({
                        el:'.txt_notice1',
                        p:{
                            y:[0,-105,'%']
                        },
                        d:750,
                        delay:1750,
                        e:'o3',
                    })
                    .add({
                        el: '',
                        delay: 800,
                        cb: () => {
                            M.Cl('#overlay', 'a', 'is-hidden')
                            this.i = 0
                            this.t = {
                                x: M.W.w / 2,
                                y: M.W.h / 2
                            }
                        }
                    })
                    .play()
            }).run()
        }

        loop() {
            this.clear()
            this.drawBg()
            this.drawText()
            this.drawTorch()
            const d = Math.abs(this.t.x - _M.mouse.x)
            if (d < 0.5 && this.raf.on) this.raf.stop()
        }

        clear() {
            const xy = M.W
            this.ctx.fillRect(0, 0, xy.w, xy.h)
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

        drawTorch(r = this.r, ctx = this.ctx) {
            const _ = _M.mouse
            this.t.x = M.Lerp(this.t.x, _.x, 0.1)
            this.t.y = M.Lerp(this.t.y, _.y, 0.1)
            this.clearCircle(ctx, this.t.x, this.t.y, r)

        }

        clearCircle(ctx, x, y, r) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI, true);
            ctx.clip();
            ctx.clearRect(x - r, y - r, 2 * r, 2 * r);
            ctx.restore();
        }

        drawLight(ctx = this.ctx) {
            let e = M.Select('.w-text'),
                gbcr = e.getBoundingClientRect(),
                r = gbcr.right,
                b = gbcr.bottom ,
                t = gbcr.top + 50,
                l = gbcr.left,
                xy = M.W,
                s1 = xy.w,
                x1 = -(xy.h - (t / (s1 - l)) * s1) / (t / (s1 - l)),
                x2 = -(xy.h - (b / (s1 - r)) * s1) / (b / (s1 - r))
            ctx.save()
            ctx.beginPath()
            ctx.moveTo(s1, 0)
            ctx.lineTo(x1, xy.h)
            ctx.lineTo(x2, xy.h)
            ctx.lineTo(s1, 0)
            ctx.clip()
            ctx.clearRect(0, 0, xy.w, xy.h)
            ctx.restore()
        }

        mM(e) {
            const t = _M.mouse
            t.x = e.clientX
            t.y = e.clientY
            this.cb(e)
        }

        tM(e) {
            M.PD(e);
            const t = _M.mouse
            let T = (e.targetTouches) ? e.targetTouches[0] : e,
                d = T.pageY > M.W.h - this.r * 0.5 ? this.r * 0.5 : this.r * 1.75
            t.x = T.pageX
            t.y = T.pageY - d
            this.cb(e)
        }

        cb() {
            this.raf.on || this.raf.run()
        }

        _e() {
            M.E(window, 'resize', this.onResize, 'a')
        }

        e(o) {
            M.E(window, 'mousemove', this.mM, o)
            _D.isM && M.E(window, "touchmove", this.tM, o, {passive: false})
        }

        run() {
            this.e('a')
        }
    }

    class b {
        constructor() {
            M.Bind(this, ['on'])
            this.i = new i
            this.on()
        }

        _init() {
            _M.e.gl = new gl

        }

        init() {
            _M.e.gl.init()
        }

        intro() {
            this.i.intro()
            _M.e.gl.intro()

        }

        run() {

        }

        on() {
            this._init()
            this.init()
            this.intro()
            this.run()
        }

    }

    (_M.e.b = new b);

    console.log('\n %c Made with ❤️ by La2spaille – https://la2spaille.studio/  %c \n ', 'border: 1px solid #000;color: #fff; background: #000; padding:5px 0;', '')
}()