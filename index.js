const {Client, MessageEmbed} = require('discord.js'),
tcpp = require('tcp-ping');
client = new Client();

const config = require("./config.json");
client.config = config;

client.login(config.token);

client.on('ready', () => {
    console.log('ready')

    let addr = config.vps1,
    port = config.portvps1;
    let addr2 = config.vps2,
    port2 = config.portvps2;
    let addr3 = config.web1,
    port3 = config.portweb1;
    let addr4 = config.vitrine,
    port4 = config.portvitrine;
    let addr5 = config.client,
    port5 = config.portclient;
    let ping = new MessageEmbed()
    .setTitle(`Titre message`)
    .setColor(`ORANGE`)
    .addField(`Récupération des différents pings serveurs...`, `- Récupération de VPS01` + `\n - Récupération de VPS02` + `\n - Récupération de WEB01` + `\n - Récupération de Site Vitrine` +  `\n - Récupération de l'Espace Client`)
    .setThumbnail('')
    .setFooter(`Dernière actualisation le ${new Date().toLocaleString("fr-FR", {timeZone: "Europe/Paris"}).split(',')[0]}`)
    client.channels.resolve(config.channel).send(ping)
    .then(msg => {
        setInterval(() => {
            tcpp.probe(addr, port, function(err, available) {
                tcpp.probe(addr2, port2, function(err, available) {
                    tcpp.probe(addr3, port3, function(err, available) {
                        tcpp.probe(addr4, port4, function(err, available) {
                            tcpp.probe(addr5, port5, function(err, available) {
                    tcpp.ping({ address: addr, port: port }, function(err, data) {
                        tcpp.ping({ address: addr2, port: port2 }, function(err, data2) {
                            tcpp.ping({ address: addr3, port: port3 }, function(err, data3) {
                                tcpp.ping({ address: addr4, port: port4 }, function(err, data4) {
                                    tcpp.ping({ address: addr5, port: port5 }, function(err, data5) {
                        console.log(data);
                        console.log(data2);
                        console.log(data3);
                        console.log(data4);
                        console.log(data5);
                        let ping = new MessageEmbed()
                        .setTitle("Titre message down")
                        .setColor(`RED`)
                        .addField(`:globe_with_meridians: Site Web: `, `Site Vitrine : ` + Math.floor(data4.avg) + `ms` + `\n Espace Client : ` + Math.floor(data5.avg) + `ms`)
                        .addField(`:video_game:  VPS : `, `VPS01 : ` + Math.floor(data.avg) + `ms (France)` + `\n VPS02 : ` + Math.floor(data2.avg) + `ms (Allemagne)`)
                        .addField(`:cloud:  WEB : `, `WEB01 : ` + Math.floor(data3.avg) + `ms`)
                        .setThumbnail('')
                        .setFooter(`Dernière actualisation le ${new Date().toLocaleString("fr-FR", {timeZone: "Europe/Paris"}).split(',')[0]}`)
                        msg.edit(ping)
                    })
                    })
                    })
                })
                });
            })
            })
        })
        })
        })
        }, 10000)
    })
})
