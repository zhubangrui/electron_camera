import { useState } from 'react'
import Camera from './components/camera/camera'
import SettingBar from './components/settting_bar/setting_bar'
import styles from './assets/app.module.scss'
import Settings from './components/settings/settings'
import { useConfig } from './common/context/config_provider'

function App(): JSX.Element {
  const [isConfig, setIsConfig] = useState(false)
  const [isSet, setIsSet] = useState(false)

  const { shape, setConfigData } = useConfig()
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const mouseEnter = (): void => {
    setIsConfig(true)
  }
  const mouseLeave = (): void => {
    setIsConfig(false)
  }
  const settingHandle = (val: { deviceId: string; title: string }): void => {
    console.log(val)
    setIsSet(false)
  }
  const shapeHandle = (): void => {
    const type = 'shape'
    if (shape === 'Square') {
      setConfigData({ type, value: 'Round' })
    } else if (shape === 'Round') {
      setConfigData({ type, value: 'Square' })
    }
  }
  return (
    <>
      {isSet ? (
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
              <SettingBar setIsSet={() => setIsSet(true)} shape={shape} shapeHandle={shapeHandle} />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default App
