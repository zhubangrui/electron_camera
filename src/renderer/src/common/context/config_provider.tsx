import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

type IDevice = {
  deviceId: string
  groupId: string
  kind: string
  label: string
}
type IParams = { type: 'devices_id' | 'shape' | 'title'; value: string | IDevice }

interface IConfig {
  devices: IDevice[]
  devicesId: string
  shape: string
  setConfigData: (params: IParams) => void
}
const ConfigContext = createContext<IConfig>({
  devices: [],
  devicesId: '',
  shape: '',
  setConfigData: () => {}
})
const ConfigProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const [devices, setDevices] = useState<IDevice[]>([])
  const [devicesId, setDevicesId] = useState('')
  const [shape, setShape] = useState('Round')

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter((i) => i.kind.includes('video'))
        if (videoDevices.length) {
          setDevices(videoDevices)
          setDevicesId(videoDevices[0].deviceId)
        }
      })
      .catch((err) => {
        console.error(`${err.name}: ${err.message}`)
      })
  }, [])
  useEffect(() => {
    console.log(shape)
    window.electron.ipcRenderer.send('shape', shape)
  }, [shape])
  const setConfigData = (params: IParams): void => {
    switch (params.type) {
      case 'devices_id': {
        setDevicesId(params.value as string)
        break
      }
      case 'shape': {
        setShape(params.value as string)
        break
      }
      default:
        throw new Error('error')
    }
  }
  const data = {
    devices,
    devicesId,
    shape,
    setConfigData
  }
  return <ConfigContext.Provider value={data}>{children}</ConfigContext.Provider>
}
export const useConfig = (): IConfig => {
  return useContext(ConfigContext)
}

export default ConfigProvider
