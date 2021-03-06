import {useEffect, useState} from 'react';
import {compile} from '../../utils/api/compile';
import {ToastContainer, toast} from 'react-toastify';
import {Loader} from '../elements';
import styled from 'styled-components';


const Wrapper = styled.div`
  margin-left: 2em;
  margin-right: 2em;

`
function DisplayResults({data}: {data: Data}) {
  const [results, setResults] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    compile(data)
      .then(response => {
        if (typeof response === 'string') {
          toast.error(response)
          return
        }

        setResults(response.output)
      })
      .finally(() => setLoading(false))
  }, [data])

  return (
    <Wrapper>
      {loading && <Loader />}
      <ToastContainer />
      <p style={{height: '89vh'}} dangerouslySetInnerHTML={{__html: results}}></p>
    </Wrapper>
  )
}

interface Data {
  code: string
  language: string
}

export default DisplayResults
