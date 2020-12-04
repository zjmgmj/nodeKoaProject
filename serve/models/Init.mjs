import db from '../database/db.mjs'

import Test from './Test.mjs'

class Init {
  modelList = [Test]
  constructor() {}
  async init() {
    try {
      await db.authenticate()
      console.log('连接成功')
      this.modelList.map(model => {
        this.createModel(model)
      })
      await db.sync({force: true})
    } catch (error) {
      console.log('连接失败', error)
    }
  }
  createModel(dbModel) {
    const model = new dbModel(db)
    model.createModel()
  }
}

export default Init