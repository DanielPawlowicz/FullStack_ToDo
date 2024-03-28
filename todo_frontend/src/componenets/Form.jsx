import React from 'react'

const Form = () => {
  return (
    <>
        <div className="formContainer">
            <div className="formCardContainer">
                <form>
                    <label>Title: <input type="text" /></label>
                    <label>Date: <input type="date" /></label>
                    <label>Time: <input type="time" /></label>
                    <button className='submitBtn'>Submit</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Form