import { useConfig } from '@/common/context/config_provider'
import { ReactNode, useEffect, useRef } from 'react'

const Camera = (): ReactNode => {
  const { devicesId } = useConfig()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: devicesId ? { deviceId: devicesId } : true
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

  return <video className=" object-cover w-screen h-screen" ref={videoRef}></video>
}

export default Camera
