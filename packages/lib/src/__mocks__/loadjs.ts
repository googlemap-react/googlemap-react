const loadjs: any = (path: string, dep: string) => {
  loadjs.path = path
  loadjs.dep = dep
}

loadjs.isDefined = (dep: string) => {
  return dep === loadjs.dep
}

loadjs.ready = (dep: string, args: {success: Function; error: Function}) => {
  setTimeout(() => {
    if (loadjs.path.split('=')[1] === '') args.error()
    else args.success()
  }, 200)
}

loadjs.reset = () => {
  loadjs.path = ''
  loadjs.dep = ''
}

loadjs.self = () => loadjs

export default loadjs
