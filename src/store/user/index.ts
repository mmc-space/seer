import { makeAutoObservable, observable, runInAction } from 'mobx'

import request from '@/utils/request'

export class UserStore {
  public user?: IUserStore.IUser

  constructor() {
    makeAutoObservable(this, { user: observable.ref })
  }

  /** 获取用户详情 */
  public getUserDetail = async () => {
    try {
      const { data } = await request.get('user')
      runInAction(() => {
        this.user = data.user
      })
    }
    catch {
      console.log('error')
    }
  }

  createUser = async (user: IUserStore.IUser) => {
    await request.post('user/create', user)
  }

  modifyUser = async (user: IUserStore.IUser) => {
    const { id, ...rest } = user
    await request.put(`user/${id}`, rest)
    this.getUserDetail()
  }

  deleteUser = async (id: string) => {
    await request.delete(`user/${id}`)
    this.getUserDetail()
  }
}

export default new UserStore()
