const yts = require( 'yt-search' );
const ytdl = require('ytdl-core');
const solenolyrics= require("solenolyrics"); 
 

module.exports = {
    loop: false,
    queue : 0,
    playlist : [],
    async connect(channel,message){
        this.message = message;
        this.connection =  await channel.join();
        this.connection.on('error', err => {Logger.log(err)});
    },
    async searchLyric(input){
        return {
            nama: await solenolyrics.requestTitleFor(input),
            lirik: await solenolyrics.requestLyricsFor(input)
        };
    },
    send(msg){
        this.message.channel.send(msg);
    },
    async carilagu(input, maxresult = 1){
        r = await yts( input );
        result = [];
        for(i = 0; i < maxresult; i++){
            result.push({
                nama: r.videos[i].title,
                url: r.videos[i].url
            });
        }
        return result;
    },
    add(ob){
        this.playlist.push(ob);
    },
    puter(queue = this.queue){ 
        this.dispatcher = this.connection.play(ytdl(this.playlist[queue].url, { filter : 'audioonly',highWaterMark: 1<<25 }));
        
        this.send("Jedug Jedes \`" + this.playlist[queue].nama + "\`");
		
        this.dispatcher.on('finish', () => {
            if (this.loop == "lagu") return this.puter();
            
            if (this.loop == "list"){
                if (!this.playlist[this.queue + 1]) this.queue = 0;     
                else this.queue++;
                this.puter();
            }

            if (this.playlist[this.queue + 1]) {
                this.playlist.shift();
                this.puter();
            }

            else{
                this.exit();
            }
        });

        this.dispatcher.on('error', e => {
            console.log(e);
          });
    },
    stop(){
        this.clear();
        this.dispatcher.destroy();
        this.send('Setop');
    },
    pause(){
        this.dispatcher.pause();
        this.send('Paus');
    },
    resume(){
        this.dispatcher.resume();
        this.send('Lanjot');
    },
    skip(){
        this.queue++;
        this.puter();
        this.send('sekip');
    },
    clear(){
        this.playlist = [];
        this.queue = 0;
        this.loop = false;
    },
    exit(){
        this.clear();
        this.connection.disconnect();
        this.send('Suud');
    },
}