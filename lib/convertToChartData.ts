export const convertToChartData = ( data: {[key: string]: number}, valueName: string) => {
    const chartData: any =Object.keys(data).map((key) => {
        return {
            name: key,
            [valueName] : data[key]
        }
    });;
    return chartData;
}