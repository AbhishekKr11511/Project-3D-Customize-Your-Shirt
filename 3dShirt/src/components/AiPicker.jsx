import CustomButton from "./CustomButton"

const AiPicker = ({prompt, setPrompt, generateImg, handleSubmit}) => {
  return (
    <div className="aipicker-container">
      <textarea
      className="aipicker-textarea"
      placeholder="Ask AI"
      value={prompt}
      onChange={(e)=>{setPrompt(e.target.value)}}
      />
      <div className="flex flex-wrap gap-3">
        {generateImg? (
          <CustomButton type={'outline'} title={'Asking AI...'} customStyles={"text-xs"}/>
        ):(
          <>
          <CustomButton type={'outline'} title={'AI logo'} handleClick={()=>handleSubmit('logo')} customStyles={'text-xs'}/>

          <CustomButton type={'filled'} title={'AI Full'} handleClick={()=>handleSubmit('full')} customStyles={'text-xs'}/>
          </>
        )}

      </div>

    </div>
  )
}
export default AiPicker