import { Jeju } from '../database/models'
import _ from 'lodash';

async function recLocation(req: any, res: any, rest: any) {
    const locations = await Jeju.find(rest).exec();
    const countLocation = _.countBy(locations, (obj: any) => {
        return obj.location;
    })
    let entries = Object.entries(countLocation);
    let sorted = entries.sort((a, b) => b[1] - a[1]);

    let filteringData: any = {};
    sorted.forEach(function (item: any) {
        filteringData[item[0]] = item[1];
    });

    const jsonRes = [];
    for (let key in filteringData) {
        jsonRes.push({ locaiton: key, locationCount: filteringData[key] })
    }

    return jsonRes
}

export default recLocation