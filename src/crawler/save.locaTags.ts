import mongoose from 'mongoose'

let locaCounts;
let isLocation = false;

const saveLocationToDB = (uri: string, schema: any, location: string) => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            schema
                .find()
                .sort({ _id: -1 })
                .limit(10)
                .then((res: any[]) => {
                    console.log('check-res----', res)
                    res.forEach(element => {
                        element.location == location ? isLocation = true : ''
                    })
                    if (isLocation == false) {
                        locaCounts = new schema({
                            location: location
                        });
                        locaCounts.save((err: any) => { });
                    }
                })
        })
        .catch(e => console.error("error", e));
}

export default saveLocationToDB
