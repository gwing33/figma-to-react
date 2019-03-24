# Figma to React

This is a test project for building react components.

Make sure to copy over the `src/config.ts.example` and put in some figma credentials. Make sure your figma file you're using as a component.

```
$ npm i
$ npm run build
```

---

### To-dos

- [x] Fetch Figma file
- [x] Find Figma file components
- [x] Clean & format component names
- [x] Write out react component, somewhere
- [x] Setup sketchbook to render component
- [ ] Build out a simple styled-components for each `Figma.Node`, also build the actual component out.

### Thoughts

- Initially focusing on building out react component.
- Fetch a file and find the component nodes
- Build out the component nodes into React components.
- Currently only focusing on building out `Figma.Node` types that are `COMPONENT`. This way we can mostly avoid layout.
- We probably want different renderers for the various node types (e.g. `TEXT` vs `RECTANGLE`)
