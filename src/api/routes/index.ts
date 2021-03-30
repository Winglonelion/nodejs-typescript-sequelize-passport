import { Application } from "express"

export type RouterType = {
  name: string
  router: Application
}

export type RoutesType = Record<string, RouterType>


const Routes: RoutesType = {}


export default Routes
