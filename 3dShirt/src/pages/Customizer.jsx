import { useState, useEffect} from 'react'
import {motion, AnimatePresence} from "framer-motion"
import { useSnapshot } from 'valtio'

import config  from '../config/config'
import state from '../store'
import {downloadCanvasToImage, reader} from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'

import {ColorPicker, AiPicker, Tab, FilePicker, CustomButton } from '../components'


const Customizer = () => {

  const snap = useSnapshot(state)

  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState(''); // For the AI prompt
  const [generatingImg, setGeneratingImg] = useState(false)

  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt : false,
  })


  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }
  }

  // after setting the state , activefiltertab is update

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state [decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]){
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  // This Function lets us read files
  const readFile = (type) => {
    reader(file)
    .then((result)=>{
      handleDecals(type, result);
      setActiveEditorTab('');
    })
  }


  // This is for the ai image genrator
  const handleSubmit = async(type) => {
    if(!prompt) return alert('Please Enter a Prompt')

    try {
      // call our backend to generate an ai image
      setGeneratingImg(true);

      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error)
    } finally{
      setGeneratingImg(false)
      setActiveEditorTab(false)
    }
  }

  //show tab content depending on the active tab
  const generateTabContent = () => {
    switch (activeEditorTab){
      case 'colorpicker':
        return <ColorPicker/>
      case 'filepicker':
        return <FilePicker file={file} setFile={setFile} readFile={readFile}/>
      case 'aipicker':
        return <AiPicker prompt={prompt} setPrompt={setPrompt} generatingImg={generatingImg} handleSubmit={()=>{handleSubmit}}/>
      default:
        return null
    }
  }


  
  return (
    <AnimatePresence>
      {!snap.intro &&

      <section>

      {/* The Filter Buttons on the left of the Customiser Page */}
      <motion.div 
      key='custom'
      className='absolute top-0 left-0 z-10'
      {...slideAnimation('left')}
      >
        <div className='flex items-center min-h-screen'>
          <div className='editortabs-container tabs'>
            {EditorTabs.map(tab=>{
              return <Tab key={tab.name} tab={tab} handleClick={()=>setActiveEditorTab(tab.name)}/>
            })}
            {generateTabContent()}
          </div>
        </div>

      </motion.div>

      {/* The filter Buttons at the bottom of the screen */}
      <motion.div
      className='filtertabs-container'
      {...slideAnimation('up')}
      >
        {FilterTabs.map(tab=>{
              return <Tab key={tab.name} isFilterTab isActiveTab="" tab={tab} handleClick={()=>{handleActiveFilterTab}}/>
            })}
      </motion.div>

      {/* Go back Button */}
      <motion.div
      className='absolute z-10 top-5 right-5'
      {...fadeAnimation}
      >
        <CustomButton
        type={'filled'}
        title={'Go back'}
        handleClick={()=>state.intro = true}
        customStyles={'w-fit px-4 py-2.5 font-bold text-sm'}
        /><br/>
        <CustomButton
        type={'filled'}
        title={'Logo Toggle'}
        handleClick={()=>state.intro = true}
        customStyles={'w-fit px-4 py-2.5 font-bold text-sm'}
        />
      </motion.div>

      
      </section>
      }
    </AnimatePresence>
  )
}
export default Customizer