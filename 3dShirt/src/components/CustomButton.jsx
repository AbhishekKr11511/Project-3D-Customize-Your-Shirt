
import state from '../store'
import { useSnapshot } from 'valtio'
import { getContrastingColor } from '../config/helpers'

const CustomButton = ({type, customStyles, title, handleClick}) => {

  const snap = useSnapshot(state)

  const generateStyle = (type) => {
    if(type === "filled"){
      return {
        backgroundColor : snap.color,
        color : getContrastingColor(snap.color),
        margin : '4px'
      }
    }
    else if(type === 'outline'){
      return {
        borderWidth: '2px',
        borderColor: snap.color,
        color: getContrastingColor(snap.color),
        margin : '4px'
      }
    }
  }
  
  return (
    <button className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`} onClick={handleClick} style={generateStyle(type)}>
      {title}
    </button>
  )
}
export default CustomButton