import Promise from 'bluebird'
import fs from 'fs'
import path from 'path'

export default{
    init() {
        let self = this;
        return new Promise((resolve, reject)=> {
            try{
                self.config = JSON.parse(fs.readFileSync(path.resolve(process.cwd(),'config.json'),'utf-8'));
                resolve(self.config);
            }
            catch (ex){
                reject(ex);
            }
        })
    }
}