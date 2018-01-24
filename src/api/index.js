import ServiceAsync from './ServiceAsync'

export default {
    // 获取省统计报表
    GetProvinceReport: (data) => ServiceAsync('GET', 'ADEContest/v3/Web/GetProvinceReport', data),
    // 获取市统计报表
    GetCityReport: (data) => ServiceAsync('GET', 'ADEContest/v3/Web/GetCityReport', data),
    // 获取县统计报表
    GetTownReport: (data) => ServiceAsync('GET', 'ADEContest/v3/Web/GetTownReport', data),
}
