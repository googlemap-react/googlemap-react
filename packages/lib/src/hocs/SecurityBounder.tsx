import React, {useEffect, useState} from 'react'

const validate = () =>
  window.hasOwnProperty('google') && google.maps && google.maps.visualization

const withSecurityBounder = (WrappedComponent: any) => (props: any) => {
  const [visLoaded, setVisLoaded] = useState(false)
  useEffect(() => {
    if (validate()) {
      setVisLoaded(true)
      return
    }
    const timer = setInterval(() => {
      if (validate()) {
        setVisLoaded(true)
        clearInterval(timer)
      }
    }, 500)
  }, [])

  return <>{visLoaded ? <WrappedComponent {...props} /> : null}</>
}

export default withSecurityBounder
