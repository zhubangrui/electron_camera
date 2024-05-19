import { BrowserWindow, IpcMainEvent, ipcMain } from 'electron'

export const getCurrentWin = (event: IpcMainEvent): BrowserWindow =>
  BrowserWindow.fromWebContents(event.sender)!

let w, h, x, y //定义摄像头窗口在切换为配置页前的宽高和位置

//根据窗口形状设置不同的宽度和缩放比例
ipcMain.on('shape', (event, shape) => {
  const win = getCurrentWin(event)
  let width, height, minWidth, minHeight, aspect, maxWidth, maxHeight
  if (shape === 'Round') {
    width = 300
    height = 300
    minHeight = 200
    minWidth = 200
    maxWidth = 450
    maxHeight = 450
    aspect = 1
    win.setAspectRatio(1)
  } else {
    width = 500
    height = 280
    minHeight = 170
    minWidth = 300
    maxWidth = 750
    maxHeight = 422
    aspect = 16 / 9
  }
  win.setMinimumSize(minWidth, minHeight)
  win.setMaximumSize(maxWidth, maxHeight)
  win.setAspectRatio(aspect)
  win.setBounds({ width, height })
})

ipcMain.on('set_page', (enent, page) => {
  const win = getCurrentWin(enent)
  let resizable = true

  if (page === 'config') {
    //切换到配置页面之前，临时保存上一次窗口的大小，当窗口切换回摄像头时，要将窗口大小设为之前的大小
    const [w1, h1] = win.getSize()
    const [x1, y1] = win.getPosition()
    w = w1
    h = h1
    x = x1
    y = y1
    // const { width, height } = screen.getPrimaryDisplay().workAreaSize

    let nX, nY
    if (w > 300) {
      nX = x + w / 2 - 150
      nY = y + h / 2 - 100
    } else {
      nX = x
      nY = y + 50
    }
    win.setBounds({ width: 300, height: 200, x: Math.floor(nX), y: Math.floor(nY) })

    //切换到配置页面时，不能改变窗口大小
    resizable = false
  } else {
    //当从配置页面切换到摄像头页面时，重新设置为原窗口大小和位置
    if (w && h) {
      win.setBounds({ width: w, height: h, x, y })
    }
  }
  win.resizable = resizable
})
