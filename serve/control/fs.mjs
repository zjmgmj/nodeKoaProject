import { rejects } from 'assert'
import fs from 'fs'

class Fs {
  stat(path) {
    return new Promise((resolve) => {
      fs.stat(path, (err, data) => {
        if(err) {
          resolve(null)
        } else {
          const isFile = data.isFile()
          const isDirectory = data.isDirectory()
          resolve({
            data,
            isFile,
            isDirectory
          }) 
        }
      })
    })
  }
  mkdir(path) {
    return new Promise((resolve) => {
      fs.mkdir(path, {recursive: true}, (err) => {
        resolve(err)
      })
    })
  }
  /**
   * 
   * @param file 
   * @param data 
   * @param options 默认值 encoding: utf-8 mode: 0o666 flag: w 
   */
  writeFile(file, data, options) {
    fs.writeFile(file, data, options, err => {
      console.log(err)
      if(err) throw err
    })
  }
}
export default Fs