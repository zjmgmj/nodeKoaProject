import db from '../database/db.mjs'

// import Test from './Test.mjs'
import Juejin from './Juejin.mjs'

class Init {
  modelList = [Juejin]
  constructor() {}
  async init() {
    try {
      await db.authenticate()
      console.log('success')
      this.modelList.map(dbModel => {
        // this.createModel(model)
        const model = new dbModel(db)
        model.init()
      })
      await db.sync({force: true})
    } catch (error) {
      console.log('error', error)
    }
  }
}

export default Init