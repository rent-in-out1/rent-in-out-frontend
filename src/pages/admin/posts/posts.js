import React from 'react'
import { Wrapper } from '../../../components/style/wrappers/table'

const Posts = () => {
  return (
    <Wrapper>
      <h1>Post management</h1>
      <div className="flex justify-center">
        <table>
          <thead>
            <tr>
              <th>hi</th>
              <th>hi</th>
              <th>hi</th>
              <th>hi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>hello</td>
              <td>hello</td>
              <td>hello</td>
              <td>hello</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Wrapper>
  )
}

export default Posts