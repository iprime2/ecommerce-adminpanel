import { useState } from 'react'
import Axios from 'axios'
import { useEffect } from 'react'

const useDelete = (url) => {
  const [id, setId] = useState(null)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    deleteItem(id)

    return () => {}
  }, [id])
  const deleteItem = async (id) => {
    setLoading(true)
    await Axios.delete(url + id, {})
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })

    setLoading(false)
  }

  return [data, deleteItem, loading, error, setId]
}

export default useDelete
