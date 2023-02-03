# Template of la2spaille

## Regle en HTML
```html
<section>
  <div class="l-rl">
    <div class="l-tb">
      <div class="w-name"></div>
      <div class="w-name"></div>
    </div>
  </div>
</section>
```

## Regle en CSS
Base en css
```SCSS
 * {
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  box-sizing: border-box;
  background: none;

  &::selection {
    background: var(--primary);
    color: var(--light)
  }
}
::after,::before {
  box-sizing: border-box;
}

img,
video,
iframe {
  max-inline-size: 100%;
  block-size: auto;
}

ul, ol {
  list-style: none;
}

svg {
  pointer-events: none;
}

span, a, strong {
  display: inline-block;
}

a, button, span {
  color: inherit;
  text-transform: inherit;
}

a {
  white-space: nowrap;
  text-decoration: none;
}

h1, h2, h3 {
  font-family: var(--font-family-primary);
}

button {
  cursor: pointer;
  display: flex;
}

html {
  -webkit-text-size-adjust: none;
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
}

body {
  position: relative;
  min-height: 100vh;
  font-family: var(--font-family-secondary);
  @media not screen and (pointer: coarse) {
    overscroll-behavior: none
  }
}


#app {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
  @media not screen and (pointer: coarse) {
    position: fixed;
  }

}

.page {
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  will-change: transform;
}


@media screen and (min-width: 1024px) {
  .ua-mobile {
    display: none;
  }
}

@media screen and (max-width: 1024px) {
  .ua-desktop {
    display: none;
  }
}



```
## Components
- c : component
    -  &-img : img
    -  &-card : card
    -  &-cta : call to action (btn/input/form)
    -  &-br : border-radius
- w : wrapper
    - &--flex : layouts flexbox wrapper
        - &-sb : space-between
        - &-ul : flex-direction -> column
    - &--grid : layouts-grid wrapper
    - &-text : for text area
    - &-name_surname : simple wrapper
- l : layout;
    - &-name_surname : simple layout wrapper
    - &-rl : padding(right, left)
    - &-tb : padding(top, bottom)


## SCSS
≠ Generic & No Generic