class puterLagu {
    constructor(channel){
        this.listlagu = [];
        this.channel = channel;
        this.queue = 0;
        this.dispatcher;
    }

    play(lagu = this.listlagu[queue]){
        if(!this.listlagu.length){
            this.listlagu.push(lagu);
            console.log(this.listlagu);
            this.channel.join().then(connection => {
                this.dispatcher = connection.play(ytdl(lagu, { filter: 'audioonly' }));
                this.dispatcher.on('end', () => {
                    if(this.listlagu[queue + 1]){
                        play(this.listlagu[queue++ + 1])
                    }
                    else{
                        this.channel.leave();
                    }
                });
            });
        }
        else{
            this.listlagu.push(lagu);
        }
    }

    resume(){
        this.dispatcher.resume();
    }

    stop(){
        this.dispatcher.destroy();
    }

    pause(){
        this.dispatcher.pause();
    }

    exit(){
        this.channel.leave();
    }

}

// class puterLagu {
//     constructor(channel){
//         this.listlagu = [];
//         this.channel = channel;
//         this.queue = 0;
//         this.dispatcher;
//     }

//     play(lagu = this.listlagu[queue]){
//         this.channel.join().then(connection => {
//             this.dispatcher(connection.play(ytdl(lagu, { filter: 'audioonly' })));
//             this.dispatcher.on('end', () => {
//                 if(this.listlagu[queue + 1]){
//                     play(this.listlagu[queue++ + 1])
//                 }
//                 else{
//                     this.channel.leave();
//                 }
//             });
//         });
//     }

//     resume(){
//         this.dispatcher.resume();
//     }

//     stop(){
//         this.dispatcher.destroy();
//     }

//     pause(){
//         this.dispatcher.pause();
//     }

//     exit(){
//         this.channel.leave();
//     }

//     set dispatcher(dispatcher){
//         return dispatcher;
//     }

// }

// const fs = require('fs');
// const ytdl = require('ytdl-core');
// const lagus = [];
// module.exports = {
//     name: 'play',
//     aliases: ['pause', 'stop','resume','exit'],
//     description: 'lagu nya bang',
// 	async execute(message, args) {
//         const channel = message.member.voice.channel;
//         if(!channel){
//             return message.reply('Pala kau tak puter');
//         }    
//         lagus.append(args[0]);

//         if (message.content == 'play'){
//             channel.join().then(connection => {
//                 for(namaLagu in lagus){
//                     const dispatcher = connection.play(ytdl(namaLagu, { filter: 'audioonly' }));    
//                 }
                
//                 dispatcher.on('end', () => {channel.leave()});
//             });
//         }
//         else if (message.content == 'pause'){
//             dispatcher.pause();
//             message.channel.send('Paus');
//         }
//         else if (message.content == 'stop'){
//             dispatcher.destroy();
//             message.channel.send('Setop')
//         }
//         else if (message.content == 'resume'){
//             dispatcher.resume();
//             message.channel.send('Lanjot')
//         }
//         else if (message.content == 'exit'){
//             connection.leave();
//             message.channel.send('Suud');
//         }
		
// 	},

// };