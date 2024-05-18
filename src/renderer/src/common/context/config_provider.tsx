import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

type IParams = { type: 'devices_id' | 'shape' | 'title'; value: string }
interface IConfig {
  devicesId: string
  shape: string
  title: string
  setConfigData: (params: IParams) => void
}
const ConfigContext = createContext<IConfig>({
  devicesId: '',
  title: '',
  shape: '',
  setConfigData: () => {}
})
const ConfigProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const [devicesId, setDevicesId] = useState('123')
  const [title, setTitle] = useState('456')
  const [shape, setShape] = useState('Round')

  useEffect(() => {}, [])
  const setConfigData = (params: IParams): void => {
    switch (params.type) {
      case 'devices_id': {
        setDevicesId(params.value)
        break
      }
      case 'shape': {
        setShape(params.value)
        break
      }
      case 'title': {
        setTitle(params.value)
        break
      }
      default:
        throw new Error('error')
    }
  }
  const data = {
    devicesId,
    title,
    shape,
    setConfigData
  }
  return <ConfigContext.Provider value={data}>{children}</ConfigContext.Provider>
}
export const useConfig = (): IConfig => {
  return useContext(ConfigContext)
}

export default ConfigProvider
