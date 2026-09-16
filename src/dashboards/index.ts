import { DashboardsInfo } from '@gdacm/core'
import gauge from './gauge'
import barCharts from './barCharts'
    
export default new DashboardsInfo(gauge, barCharts)