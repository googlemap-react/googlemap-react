import {useEffect} from 'react'
import {GoogleMapObjectWithSetOptions} from '../common/types'

const useMemoizedOptions = (
  instance: GoogleMapObjectWithSetOptions | undefined,
  opts: any,
  prevOpts: string,
  setPrevOpts: React.Dispatch<React.SetStateAction<string>>,
) => {
  useEffect(() => {
    if (
      instance === undefined ||
      opts === undefined ||
      JSON.stringify(opts) === prevOpts
    )
      return
    instance.setOptions(opts)
    setPrevOpts(JSON.stringify(opts))
  }, [instance, opts])
}

export default useMemoizedOptions
