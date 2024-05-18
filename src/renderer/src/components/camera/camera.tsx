import { ReactNode, useEffect, useRef } from 'react'
// import styles from './camera.module.scss'
const Camera = (): ReactNode => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true
      })
      .then((mediaStream) => {
        const video = videoRef?.current
        if (video) {
          video.srcObject = mediaStream
          video.onloadedmetadata = (): void => {
            video.play()
          }
        }
      })
  }, [])

  return (
    <main className="w-screen h-screen flex">
      <video className=" object-cover " ref={videoRef}></video>
    </main>
  )
}

export default Camera
