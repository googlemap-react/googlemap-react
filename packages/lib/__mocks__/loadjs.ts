let path = ''
let dep = ''

const loadjs = (paths: string, arg1: string) => {
  path = paths
  dep = arg1
}

loadjs.isDefined = (deps: string) => {
  return deps === dep
}

loadjs.ready = (deps: string, args: {success: Function; error: Function}) => {
  setTimeout(() => {
    if (path.split('=')[1] === '') args.error()
    else args.success()
  }, 200)
}

loadjs.reset = () => {
  path = ''
  dep = ''
}

loadjs.self = () => loadjs

export default loadjs
