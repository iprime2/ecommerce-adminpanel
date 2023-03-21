import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import './create.scss'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import usePost from '../../hooks/usePost'

const Create = ({ inputs, title, selected, nav }) => {
  const userUrl = `${process.env.REACT_APP_API_URL}auth/register`
  const [data, post, loading, error, status] = usePost(userUrl)
  const [success, setSuccess] = useState(false)
  const [file, setFile] = useState('')
  const [createData, setCreateData] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
  })

  const handleInput = (e) => {
    e.preventDefault()

    const { name, value } = e.target
    setCreateData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    if (success) setSuccess(false)

    e.preventDefault()
    const sendCreateData = {
      name: createData.name,
      email: createData.email,
      password: createData.password,
      role: 'user',
    }
    post(sendCreateData)
  }

  console.log(status)
  function refreshPage() {
    window.location.reload(false)
  }

  useEffect(() => {
    if (status) {
      setSuccess(true)
    }

    return () => {}
  }, [status])

  return (
    <div className='create'>
      {nav ? '' : <Sidebar selected={selected} />}
      <div className='createContainer'>
        {nav ? '' : <Navbar />}
        <div className='top'>{title}</div>
        <div className='bottom'>
          <div className='left'>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : `https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg`
              }
              alt='avatar'
            />
          </div>
          <div className='right'>
            <form>
              <div className='formInput'>
                <label>
                  Image: <DriveFolderUploadOutlinedIcon className='icon' />
                </label>
                <input
                  type='file'
                  id='file'
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>
              {inputs.map((input) => {
                return (
                  <div className='formInputs' key={input.id}>
                    <label>{input.label}</label>
                    <input
                      name={input.name}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleInput}
                      value={input.value}
                    ></input>
                  </div>
                )
              })}
              <button type='reset'>Reset</button>
              <button onClick={handleSubmit}>Send</button>
            </form>
            {success && <p className='Success'>User Created Successfully!</p>}
            {error && <p className='fail'>Something went wrong</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create
