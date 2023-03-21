import { useState } from 'react'
import Axios from 'axios'

const usePost = (url) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const post = async (data) => {
    setLoading(true)
    await Axios.post(url, data)
      .then((res) => {
        console.log(res)
        data = res
        setData(data)
        setStatus(res.status)
      })
      .catch((error) => {
        console.log(error)
        setError(error)
      })

    setLoading(false)
  }

  return [data, post, loading, error, status]
}

export default usePost
