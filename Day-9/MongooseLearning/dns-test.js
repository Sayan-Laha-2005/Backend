import dns from 'node:dns';
import { promises as dnsPromises } from 'node:dns';

dns.setServers(['192.168.0.1']);

try {
    const records = await dnsPromises.resolveSrv(
        '_mongodb._tcp.cluster0.irxjk7z.mongodb.net'
    );

    console.log("MongoDB DNS records:", records);

} catch (error) {
    console.log("DNS Error:", error);
}