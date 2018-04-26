import IPFSService from '../server/services/IPFSService';
import ipfsAPI from 'ipfs-api';

let addrs = ['/ip4/139.196.138.193/tcp/5001', '/ip4/106.14.194.229/tcp/5001'];
IPFSService.upload(JSON.stringify({a: 1}), addrs).then(resp => {
    console.log(resp);
    let ipfs_api = ipfsAPI(addrs[0]);
    let cid = resp;
    ipfs_api.object.patch.appendData(cid, new Buffer('more data'), (err, node) => {
        if (err) {
            throw err;
        } else {
            IPFSService.download(cid, addrs).then(resp => {
                console.log(resp);
            });
        }
    });
});
