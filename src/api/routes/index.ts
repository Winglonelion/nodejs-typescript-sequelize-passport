import { Application } from "express"
import register from './register'
import { RouterType } from "./types"


export type RoutesType = Record<string, RouterType>


const Routes: RoutesType = {
  register: register
}


export default Routes
