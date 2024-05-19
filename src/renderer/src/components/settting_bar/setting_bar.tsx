import { FC, ReactNode } from 'react'
import Setting from '../../assets/images/seting.png'
import Square from '../../assets/images/square.png'
import Round from '../../assets/images/round.png'

interface IProps {
  setPage: () => void
  shapeHandle: () => void
  shape: string
}
const SettingBar: FC<IProps> = ({ setPage, shape, shapeHandle }): ReactNode => {
  // const imgStyle = {
  //   height:
  // }
  return (
    <div className=" bg-slate-500 h-full text-white flex justify-center items-center opacity-90">
      <img
        src={shape === 'Square' ? Round : Square}
        className=" h-[18px] mr-1"
        alt=""
        onClick={shapeHandle}
      />
      <img src={Setting} className=" h-[15px] ml-1" alt="" onClick={setPage} />
    </div>
  )
}

export default SettingBar
