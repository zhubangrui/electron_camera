import { useEffect, useState } from 'react'
import Camera from './components/camera/camera'
import SettingBar from './components/settting_bar/setting_bar'
import styles from './assets/app.module.scss'
import Settings from './components/settings/settings'
import { useConfig } from './common/context/config_provider'

function App(): JSX.Element {
  const [isConfig, setIsConfig] = useState(false)
  const [page, setPage] = useState('camera')

  const { shape, setConfigData } = useConfig()
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const mouseEnter = (): void => {
    setIsConfig(true)
  }
  const mouseLeave = (): void => {
    setIsConfig(false)
  }
  const settingHandle = (val: { deviceId: string }): void => {
    setConfigData({ type: 'devices_id', value: val.deviceId })
    setPage('camera')
  }
  const shapeHandle = (): void => {
    const type = 'shape'
    if (shape === 'Square') {
      setConfigData({ type, value: 'Round' })
    } else if (shape === 'Round') {
      setConfigData({ type, value: 'Square' })
    }
  }
  const setPageHandle = (): void => {
    setPage('config')
  }
  //摄像头和配置页面切换时，发送到主进程，判断是否能改变窗口
  useEffect(() => {
    window.electron.ipcRenderer.send('set_page', page)
  }, [page])
  return (
    <>
      {page === 'config' ? (
        <Settings settings={settingHandle} />
      ) : (
        <div
          className={`relative w-screen h-screen overflow-hidden ${shape === 'Round' && ' rounded-full'}`}
        >
          <Camera />
          <div className={styles.app_top_container}></div>
          <div
            className=" absolute bottom-0 h-[25px] w-full z-20"
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
          >
            {isConfig && (
              <SettingBar setPage={setPageHandle} shape={shape} shapeHandle={shapeHandle} />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default App
