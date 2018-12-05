const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "$"
client.on('ready', () => {
  console.log('---------------');
  console.log(' Bot Is Online')
  console.log('---------------')
});



client.on('guildBanAdd', function(guild) {
            const rebellog = client.channels.find("name", "log"),
            Onumber = 3,
  Otime = 10000
guild.fetchAuditLogs({
    type: 22
}).then(audit => {
    let banner = audit.entries.map(banner => banner.executor.id)
    let bans = guilds[guild.id + banner].bans || 0
    guilds[guild.id + banner] = {
        bans: 0
    }
      bans[guilds.id].bans += 1;
if(guilds[guild.id + banner].bans >= Onumber) {
try {
let roles = guild.members.get(banner).roles.array();
guild.members.get(banner).removeRoles(roles);
  guild.guild.member(banner).kick();

} catch (error) {
console.log(error)
try {
guild.members.get(banner).ban();
  rebellog.send(`<@!${banner.id}>
حآول العبث بالسيرفر @everyone`);
guild.owner.send(`<@!${banner.id}>
حآول العبث بالسيرفر ${guild.name}`)
    setTimeout(() => {
 guilds[guild.id].bans = 0;
  },Otime)
} catch (error) {
console.log(error)
}
}
}
})
});
 let channelc = {};


  client.on('channelCreate', async (channel) => {
  const rebellog = client.channels.find("name", "log"),
  Oguild = channel.guild,
  Onumber = 3,
  Otime = 10000;
  const audit = await channel.guild.fetchAuditLogs({limit: 1});
  const channelcreate = audit.entries.first().executor;
  console.log(` A ${channel.type} Channel called ${channel.name} was Created By ${channelcreate.tag}`);
   if(!channelc[channelcreate.id]) {
    channelc[channelcreate.id] = {
    created : 0
     }
 }
 channelc[channelcreate.id].created += 1;
 if(channelc[channelcreate.id].created >= Onumber ) {
    Oguild.members.get(channelcreate.id).kick();
rebellog.send(`<@!${channelcreate.id}>
حآول العبث بالسيرفر @everyone`);
channel.guild.owner.send(`<@!${channelcreate.id}>
حآول العبث بالسيرفر ${channel.guild.name}`)
}
  setTimeout(() => {
 channelc[channelcreate.id].created = 0;
  },Otime)
  });

let channelr = {};
  client.on('channelDelete', async (channel) => {
  const rebellog = client.channels.find("name", "log"),
  Oguild = channel.guild,
  Onumber = 3,
  Otime = 10000;
  const audit = await channel.guild.fetchAuditLogs({limit: 1});
  const channelremover = audit.entries.first().executor;
  console.log(` A ${channel.type} Channel called ${channel.name} was deleted By ${channelremover.tag}`);
   if(!channelr[channelremover.id]) {
    channelr[channelremover.id] = {
    deleted : 0
     }
 }
 channelr[channelremover.id].deleted += 1;
 if(channelr[channelremover.id].deleted >= Onumber ) {
  Oguild.guild.member(channelremover).kick();
rebellog.send(`<@!${channelremover.id}>
حآول العبث بالسيرفر @everyone`);
channel.guild.owner.send(`<@!${channelremover.id}>
حآول العبث بالسيرفر ${channel.guild.name}`)
}
  setTimeout(() => {
 channelr[channelremover.id].deleted = 0;
  },Otime)
  });










client.on("ready", () => {
    console.log("I'm ready to do work!");//// BY MAL , CODES

});

const slowmode_mentions = new Map();
const slowmode_links = new Map();
const slowmode_attachments = new Map(); //// BY MAL , CODES

const ratelimit = 7500; // within 7.5 seconds
const logChannel = "517414659712614411"; // logs channel id

client.on("message", message => { //// BY MAL , CODES


    if (message.content.startsWith("!ping")) {
        let startTime = Date.now();
        message.channel.send("Ping...").then(newMessage => {
            let endTime = Date.now();
            newMessage.edit("Pong! Took `" + Math.round(endTime - startTime) + "ms`!");
        });
    }

    function log(logmessage) {//// BY MAL , CODES
        if (message.guild.channels.has(logChannel)) {
            message.guild.channels.get(logChannel).send({ embed: logmessage}).then().catch(err => console.log(err));
        }
    }


    let banLevel = { //// BY MAL , CODES

        "mentions": 10,
        "links": 10,
        "attachments": 10
    };


    if (message.author.bot || !message.guild || !message.member || !message.guild.member(client.user).hasPermission("BAN_MEMBERS") || message.member.hasPermission("MANAGE_MESSAGES")) return;


    if (message.mentions.users.size == 1 && message.mentions.users.first().bot) return;


    let entry_mentions = slowmode_mentions.get(message.author.id);
    let entry_links = slowmode_links.get(message.author.id);
    let entry_attachments = slowmode_attachments.get(message.author.id);

    if (!entry_mentions) {
        entry_mentions = 0;
        slowmode_mentions.set(message.author.id, entry_mentions);
    }
    if (!entry_links) { //// BY MAL , CODES

        entry_links = 0;
        slowmode_links.set(message.author.id, entry_links);
    }
    if (!entry_attachments) {
        entry_attachments = 0;
        slowmode_attachments.set(message.author.id, entry_attachments);
    }


    entry_mentions += message.mentions.users.size + message.mentions.roles.size;
    entry_links += message.embeds.length;
    entry_attachments += message.attachments.size;

    slowmode_mentions.set(message.author.id, entry_mentions);
    slowmode_links.set(message.author.id, entry_links);
    slowmode_attachments.set(message.author.id, entry_attachments);


    if (entry_links > banLevel.links) {
        message.member.ban(1).then(member => {
            message.channel.send(`:ok_hand: banned \`${message.author.tag}\` for \`link spam\``);
            log(new Discord.RichEmbed().setTitle(':hammer: Banned').setColor(0xFF0000).setTimestamp().addField('User', `${message.author.tag} (${message.author.id})`).addField('Reason', `Posting too many links (${entry_links}x)`));
            slowmode_links.delete(message.author.id);
        })
        .catch(e => {
            log(new Discord.RichEmbed().setTitle(':x: ERROR').setColor(0x000001).setTimestamp().addField('User', `${message.author.tag} (${message.author.id})`).addField('Reason', `Could not ban because they have a higher role`));
        });
    } else {
        setTimeout(()=> {
            entry_links -= message.embeds.length;
            if(entry_links <= 0) slowmode_links.delete(message.author.id);
        }, ratelimit);
    }

    if (entry_mentions > banLevel.mentions) {
        message.member.ban(1).then(member => {
            message.channel.send(`:ok_hand: banned \`${message.author.tag}\` for \`mention spam\``);
            log(new Discord.RichEmbed().setTitle(':hammer: Banned').setColor(0xFF0000).setTimestamp().addField('User', `${message.author.tag} (${message.author.id})`).addField('Reason', `Mentioning too many users (${entry_mentions}x)`));
            slowmode_mentions.delete(message.author.id);
        })
        .catch(e => {
            log(new Discord.RichEmbed().setTitle(':x: ERROR').setColor(0x000001).setTimestamp().addField('User', `${message.author.tag} (${message.author.id})`).addField('Reason', `Could not ban because they have a higher role`));
        });
    } else {
        setTimeout(()=> {
            entry_mentions -= message.mentions.users.size + message.mentions.roles.size;
            if(entry_mentions <= 0) slowmode_mentions.delete(message.author.id);
        }, ratelimit);
    }

    if (entry_attachments > banLevel.attachments) {
        message.member.ban(1).then(member => {
            message.channel.send(`:ok_hand: banned \`${message.author.tag}\` for \`image spam\``);
            log(new Discord.RichEmbed().setTitle(':hammer: Banned').setColor(0xFF0000).setTimestamp().addField('User', `${message.author.tag} (${message.author.id})`).addField('Reason', `Posting too many images (${entry_attachments}x)`));
            slowmode_attachments.delete(message.author.id);
        })
        .catch(e => {
            log(new Discord.RichEmbed().setTitle(':x: ERROR').setColor(0x000001).setTimestamp().addField('User', `${message.author.tag} (${message.author.id})`).addField('Reason', `Could not ban because they have a higher role`));
        });
    } else {
        setTimeout(()=> {
            entry_attachments -= message.attachments.size;
            if(entry_attachments <= 0) slowmode_attachments.delete(message.author.id);
        }, ratelimit);
    }

});

































client.on('message', msg => {
var prefix = "#";
  if(!msg.guild) return;
    if (msg.content.startsWith(prefix +'crtc')) {
     let args = msg.content.split(" ").slice(1);
    if(!msg.channel.guild) return msg.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
let ra3d = new Discord.RichEmbed()
.setThumbnail(msg.author.avatarURL)
.setDescription(`اذا كنت تريد انشاء المسند اضغط على الرياكشن📝`)
.setFooter('لديك دقيقه للاختيار')
msg.channel.send(ra3d).then(message => {


 message.react('📝').then(r=>{


 let Category = (reaction, user) => reaction.emoji.name === '📝' && user.id === msg.author.id;

 let cy  = message.createReactionCollector(Category, { time: 60000 });

cy.on("collect", r => {
msg.guild.createChannel(args.join(' '), 'category');
    msg.channel.send(`☑ تم انشاء المستند بنجاح : \`${args}\``)
    msg.delete();
})
})
})
}
});




client.on('message', message => {

if (message.content.startsWith(prefix + 'perm')) {
         if(!message.channel.guild) return;
         var perms = JSON.stringify(message.channel.permissionsFor(message.author).serialize(), null, 4);
         var zPeRms = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setTitle(':tools: Permissions')
         .addField('Your Permissions:',perms)
                  message.channel.send({embed:zPeRms});

    }
});


client.on('message', message => {
    if (message.content.startsWith(prefix + "رابط")) {
     if(!message.channel.guild) return;
if (message.author.bot) return;
        message.channel.createInvite({
        thing: true,
        maxUses: 2,
        maxAge: 86400
    }).then(invite =>
      message.author.sendMessage(invite.url)
    )
    const Embed11 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription("تم ارسالك في الخاص")
         .setFooter("Thieves ",'https://cdn.discordapp.com/attachments/511235124940242944/511583794105548812/22.png')
                   .setTimestamp()
				message.channel.send('**تم الارسال في الخاص**');


      message.channel.sendEmbed(Embed11).then(message => {message.delete(3000)})
      message.author.sendEmbed(Embed11)
    }
});





client.on("message", message => {
 if (message.content === "$مساعده") {
        message.react("😘")
           message.react("😵")
  const embed = new Discord.RichEmbed()
      .setColor("#ffff00")
      .setThumbnail(message.author.avatarURL)
      .setDescription(`
-🚀 سرعه اتصال ممتازه
-😎 سهل الاستخدام
-⚠ صيانه كل يوم
-💵 مجاني بل كامل
-📚 البوت عربي و سيتم اضافه اللغه النكليزية

● ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ●

💎『اوامر عامة』💎

💎^^server 『معلومات عن السيرفر』

💎^^servers 『علشان تشوف البوت بكم سيرفر اون لاين 』

💎^^bot 『لمعرف البوت بكم سيرفر』

💎^^date 『لمعرفه التاريخ』

💎^^ping 『لمعرفه سرعه البوت』

💎^^members 『معلومات عن الاعضاء』

💎^^embed 『خاصيه غرد لكن بغير طريقه』

💎^^say 『لي يكرر الكلام الذي تقوله』

💎^^animal  『كود لي اضهار صور  للحيوانات』

● ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ●

👑『اوامر ادارية』👑

👑^^rooms 『لمعرفه عدد رومات السيرفر』

👑^^ban 『لتعطي شخص باند』

👑^^kick 『لتعطي شخص كيك』

👑^^clear 『لمسح الشات برقم』

👑^^edit  『لتعديل رساله 』

👑^^ct  مـلاحظه: الاسم انت تختاره『لي انشاء روم كتابي』

👑^^cv  مـلاحظه: الاسم انت تختاره『لي انشاء روم صوتي』

👑^^delet  『كـود يحذف الـروم سواء صوتي او كتابي』

● ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ●

🎲『القرعة』🎲

🎲^^roll 1   『القرعة من 1 الى 25』

🎲^^roll 2   『القرعة من 1 الى 50』

🎲^^roll 3   『القرعة من 1 الى 75』

🎲^^roll 4   『القرعة من 1 الى 100』

● ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ●

🎮『العاب』🎮

🎮^^كت تويت

🎮^^مريم

🎮^^خواطر

● ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ●

🎴『اوامر الصور』🎴

🎴^^avatar 『لي عرض صورتك او صوره اي شخص』

🎴^^image 『لي عرض صوره السيرفر』

🎴قريبا

● ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ●

🎎『انواع الترحيب』🎎

🎎 ترحيب 1 / ترحيب 2

🎎 ترحيب 3 / ترحيب 4

🎎 ترحيب 5 / ترحيب 6

🎎 ترحيب 7 / ترحيب 8

🎎 ترحيب 9 / ترحيب 10

● ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ●

💎『الدعم الفني والمساعدة』💎

^^invite | القسم الاول لي اضافه البوت

^^support| القسم الثاني  الدعم الفني و المساعدة

Bot Premium Bay Tiger

● ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ●




`)


message.author.sendEmbed(embed)

}
});


client.on('message', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    if (message.content.startsWith(prefix + 'edit')) {
        message.channel.sendMessage('Edit me').then(msg=>{msg.edit('Done edit')});
    }
});




client.on('message' , async message => {
            if(message.content.startsWith(prefix + "ads")) {
     await message.channel.send("`ارسال الرساله .`").then(e => {
    let filter = m => m.author.id === message.author.id
    let tests = '';
    let time = '';
    let channel = '';
    let chaTests = message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
    .then(collected => {
      tests = collected.first().content
      collected.first().delete()
e.edit("`تكرار الرساله كل ....... دقائق`")
let chaTime = message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
.then(co => {
if(isNaN(co.first().content)) return message.reply("`الوقت بالدقائق ! ارقام فقطٍ`");
if(co.first().content > 1500 || co.first().content < 1) return message.channel.send("`لا اقل من دقيقه ولا اكثر من يوم`")
  time = co.first().content
co.first().delete()
  e.edit("`ادخل اسم الروم`")
  let chaChannel = message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
.then(col => {
  channel = col.first().content
col.first().delete()
  e.edit("`جاري اعداد المعلومات الرجاء الانتظاار...`").then(b => {
              setTimeout(() => {
    b.edit(`** تم اعداد المعلومات بنجاح .**`)
        },2000);
  })
  var room = message.guild.channels.find('name' , channel)
  if(!room) return;
  if (room) {
setInterval(() => {
room.send(tests);
}, time*60000)
  }
})
})
})

})
}
});




client.on('message',async message => {
         var room;
         var title;
         var duration;
         var gMembers;
         var filter = m => m.author.id === message.author.id;
         if(message.content.startsWith(prefix + "قيف")) {
           if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send(':heavy_multiplication_x:| **يجب أن يكون لديك خاصية التعديل على السيرفر**');
           message.channel.send(`:eight_pointed_black_star:| **من فضلك اكتب اسم الروم**`).then(msgg => {
             message.channel.awaitMessages(filter, {
               max: 1,
               time: 20000,
               errors: ['time']
             }).then(collected => {
               let room = message.guild.channels.find('name', collected.first().content);
               if(!room) return message.channel.send(':heavy_multiplication_x:| **لم اقدر على ايجاد الروم المطلوب**');
               room = collected.first().content;
               collected.first().delete();
               msgg.edit(':eight_pointed_black_star:| **اكتب مدة القيف اواي بالدقائق , مثال : 60**').then(msg => {
                 message.channel.awaitMessages(filter, {
                   max: 1,
                   time: 20000,
                   errors: ['time']
                 }).then(collected => {
                   if(isNaN(collected.first().content)) return message.channel.send(':heavy_multiplication_x:| **يجب عليك ان تحدد وقت زمني صحيح.. ``يجب عليك اعادة كتابة الامر``**');
                   duration = collected.first().content * 60000;
                   collected.first().delete();
                   msgg.edit(':eight_pointed_black_star:| **واخيرا اكتب على ماذا تريد القيف اواي**').then(msg => {
                     message.channel.awaitMessages(filter, {
                       max: 1,
                       time: 20000,
                       errors: ['time']
                     }).then(collected => {
                       title = collected.first().content;
                       collected.first().delete();
                       try {
                         let giveEmbed = new Discord.RichEmbed()
                         .setAuthor(message.guild.name, message.guild.iconURL)
                         .setTitle(title)
                         .setDescription(`المدة : ${duration / 60000} دقائق`)
                         .setFooter(message.author.username, message.author.avatarURL);
                         message.guild.channels.find('name', room).send(giveEmbed).then(m => {
                            let re = m.react('🎉');
                            setTimeout(() => {
                              let users = m.reactions.get("🎉").users;
                              let list = users.array().filter(u => u.id !== m.author.id);
                              let gFilter = list[Math.floor(Math.random() * list.length) + 0];
                                if(users.size === 1) gFilter = '**لم يتم التحديد**';
                              let endEmbed = new Discord.RichEmbed()
                              .setAuthor(message.author.username, message.author.avatarURL)
                              .setTitle(title)
                              .addField('انتهى القيف اواي !',`الفائز هو : ${gFilter}`)
                              .setFooter(message.guild.name, message.guild.iconURL);
                              m.edit(endEmbed);
                            },duration);
                          });
                         msgg.edit(`:heavy_check_mark:| **تم اعداد القيف اواي**`);
                       } catch(e) {
                         msgg.edit(`:heavy_multiplication_x:| **لم اقدر على اعداد القيف اواي بسبب نقص الخصائص**`);
                         console.log(e);
                       }
                     });
                   });
                 });
               });
             });
           });
         }
       });



       client.on("message", message => {
         var prefix = "$";
         var args = message.content.split(' ').slice(1);
         var msg = message.content.toLowerCase();
         if( !message.guild ) return;
         if( !msg.startsWith( prefix + 'role' ) ) return;
         if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(' **__ليس لديك صلاحيات__**');
         if( msg.toLowerCase().startsWith( prefix + 'roleremove' ) ){
           if( !args[0] ) return message.reply( '**:x: يرجى وضع الشخص المراد سحب منه الرتبة**' );
           if( !args[1] ) return message.reply( '**:x: يرجى وضع الرتبة المراد سحبها من الشخص**' );
           var role = msg.split(' ').slice(2).join(" ").toLowerCase();
           var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first();
           if( !role1 ) return message.reply( '**:x: يرجى وضع الرتبة المراد سحبها من الشخص**' );if( message.mentions.members.first() ){
             message.mentions.members.first().removeRole( role1 );
             return message.reply('**:white_check_mark: [ '+role1.name+' ] رتبة [ '+args[0]+' ] تم سحب من **');
           }
           if( args[0].toLowerCase() == "all" ){
             message.guild.members.forEach(m=>m.removeRole( role1 ))
             return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من الكل رتبة**');
           } else if( args[0].toLowerCase() == "bots" ){
             message.guild.members.filter(m=>m.user.bot).forEach(m=>m.removeRole(role1))
             return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من البوتات رتبة**');
           } else if( args[0].toLowerCase() == "humans" ){
             message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.removeRole(role1))
             return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من البشريين رتبة**');
           }
         } else {
           if( !args[0] ) return message.reply( '**:x: يرجى وضع الشخص المراد اعطائها الرتبة**' );
           if( !args[1] ) return message.reply( '**:x: يرجى وضع الرتبة المراد اعطائها للشخص**' );
           var role = msg.split(' ').slice(2).join(" ").toLowerCase();
           var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first();
           if( !role1 ) return message.reply( '**:x: يرجى وضع الرتبة المراد اعطائها للشخص**' );if( message.mentions.members.first() ){
             message.mentions.members.first().addRole( role1 );
             return message.reply('**:white_check_mark: [ '+role1.name+' ] رتبة [ '+args[0]+' ] تم اعطاء **');
           }
           if( args[0].toLowerCase() == "all" ){
             message.guild.members.forEach(m=>m.addRole( role1 ))
             return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء الكل رتبة**');
           } else if( args[0].toLowerCase() == "bots" ){
             message.guild.members.filter(m=>m.user.bot).forEach(m=>m.addRole(role1))
             return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء البوتات رتبة**');
           } else if( args[0].toLowerCase() == "humans" ){
             message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.addRole(role1))
             return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم إعطاء الشخص رتبة**');
           }
         }
       });




       client.on('message', message => {
          if(!message.channel.guild) return;
       if(message.content.startsWith(prefix + 'مسح')) {
       if(!message.channel.guild) return message.channel.send('**This Command is Just For Servers**').then(m => m.delete(5000));
       if(!message.member.hasPermission('MANAGE_MESSAGES')) return      message.channel.send('**You Do not have permission** `MANAGE_MESSAGES`' );
       let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
       let request = `Requested By ${message.author.username}`;
       message.channel.send(`**Are You sure you want to clear the chat?**`).then(msg => {
       msg.react('✅')
       .then(() => msg.react('❌'))
       .then(() =>msg.react('✅'))

       let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
       let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

       let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
       let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
       reaction1.on("collect", r => {
       message.channel.send(`Chat will delete`).then(m => m.delete(5000));
       var msg;
               msg = parseInt();

             message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
             message.channel.sendMessage("", {embed: {
               title: "`` Chat Deleted ``",
               color: 0x06DF00,
               footer: {

               }
             }}).then(msg => {msg.delete(3000)});

       })
       reaction2.on("collect", r => {
       message.channel.send(`**Chat deletion cancelled**`).then(m => m.delete(5000));
       msg.delete();
       })
       })
       }
       });


       client.on('message', message => {
           if (message.content.startsWith(prefix + 'emojilist')) {

               const List = message.guild.emojis.map(e => e.toString()).join(" ");

               const EmojiList = new Discord.RichEmbed()
                   .setTitle('➠ Emojis')
                   .setAuthor(message.guild.name, message.guild.iconURL)
                   .setColor('RANDOM')
                   .setDescription(List)
                   .setFooter(message.guild.name)
               message.channel.send(EmojiList)
           }
       });


       client.on('message', message => {
       var prefix = "$";
             if(message.content === prefix + "اقفل") {
             if(!message.channel.guild) return;
             if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You Dont Have Perms :x:');
                    message.channel.overwritePermissions(message.guild.id, {
                    READ_MESSAGES: false
        })
                     message.channel.send('Channel Hided Successfully ! :white_check_mark:  ')
        }
       });


       client.on('message', message => {
       var prefix = "$";
             if(message.content === prefix + "افتح") {
             if(!message.channel.guild) return;
             if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(':x:');
                    message.channel.overwritePermissions(message.guild.id, {
                    READ_MESSAGES: true
        })
                     message.channel.send('Done  ')
        }
       });




       client.on("message", function(message) {
       	var prefix = "$";
          if(message.content.startsWith(prefix + "rps")) {
           let messageArgs = message.content.split(" ").slice(1).join(" ");
           let messageRPS = message.content.split(" ").slice(2).join(" ");
           let arrayRPS = ['**# - Rock**','**# - Paper**','**# - Scissors**'];
           let result = `${arrayRPS[Math.floor(Math.random() * arrayRPS.length)]}`;
           var RpsEmbed = new Discord.RichEmbed()
           .setAuthor(message.author.username)
           .setThumbnail(message.author.avatarURL)
           .addField("Rock","🇷",true)
           .addField("Paper","🇵",true)
           .addField("Scissors","🇸",true)
           message.channel.send(RpsEmbed).then(msg => {
               msg.react(' 🇷')
               msg.react("🇸")
               msg.react("🇵")
       .then(() => msg.react('🇷'))
       .then(() =>msg.react('🇸'))
       .then(() => msg.react('🇵'))
       let reaction1Filter = (reaction, user) => reaction.emoji.name === '🇷' && user.id === message.author.id;
       let reaction2Filter = (reaction, user) => reaction.emoji.name === '🇸' && user.id === message.author.id;
       let reaction3Filter = (reaction, user) => reaction.emoji.name === '🇵' && user.id === message.author.id;
       let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });

       let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
       let reaction3 = msg.createReactionCollector(reaction3Filter, { time: 12000 });
       reaction1.on("collect", r => {
               message.channel.send(result)
       })
       reaction2.on("collect", r => {
               message.channel.send(result)
       })
       reaction3.on("collect", r => {
               message.channel.send(result)
       })

           })
       }
       });




       client.on('message',function(message) {
         if(!message.channel.guild) return;

       const prefix = "$";
           if (message.content === prefix + "discrim") {
       let messageArray = message.content.split(" ");
       let args = messageArray.slice(1);

       if (message.author.bot) return;

       var discri = args[0]
       let discrim
       if(discri){
       discrim = discri;
       }else{
       discrim = message.author.discriminator;
       }
       if(discrim.length == 1){
       discrim = "000"+discrim
       }
       if(discrim.length == 2){
       discrim = "00"+discrim
       }
       if(discrim.length == 3){
       discrim = "0"+discrim
       }

       const users = client.users.filter(user => user.discriminator === discrim).map(user => user.username);
       return message.channel.send(`
       **Found ${users.length} users with the discriminator #${discrim}**
       ${users.join('\n')}
       `);
       }
       });



       client.on("message", (message) => {
       if (message.content.startsWith("$t1")) {
                   if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
               let args = message.content.split(" ").slice(1);
           message.guild.createChannel(args.join(' '), 'voice');
           message.channel.sendMessage('تـم إنـشاء روم صـوتي')

       }
       });

       client.on("message", (message) => {
       if (message.content.startsWith("$t2")) {
                   if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
               let args = message.content.split(" ").slice(1);
           message.guild.createChannel(args.join(' '), 'text');
       message.channel.sendMessage('تـم إنـشاء روم كـتابـي')

       }
       });

       client.on("message", (message) => {
         if (message.content.startsWith('$delet')) {
             if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");

             let args = message.content.split(' ').slice(1);
             let channel = message.client.channels.find('name', args.join(' '));
             if (!channel) return message.reply('**There is no room like this name -_-**').catch(console.error);
             channel.delete()
         }
     });


     client.on('message', message => {
         var prefix = "$"
       if (message.author.x5bz) return;
       if (!message.content.startsWith(prefix)) return;

       let command = message.content.split(" ")[0];
       command = command.slice(prefix.length);

       let args = message.content.split(" ").slice(1);

       if (command == "كيك") {
                    if(!message.channel.guild) return message.reply('** This command only for servers**');

       if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
       if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
       let user = message.mentions.users.first();
       let reason = message.content.split(" ").slice(2).join(" ");
       if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
       if(!reason) return message.reply ("**اكتب سبب الطرد**");
       if (!message.guild.member(user)
       .kickable) return message.reply("**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**");

       message.guild.member(user).kick();

       const kickembed = new Discord.RichEmbed()
       .setAuthor(`KICKED!`, user.displayAvatarURL)
       .setColor("RANDOM")
       .setTimestamp()
       .addField("**User:**",  '**[ ' + `${user.tag}` + ' ]**')
       .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
       .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
       message.channel.send({
         embed : kickembed
       })
     }
     });




     client.on('message', message => {
       if (message.author.x5bz) return;
       if (!message.content.startsWith(prefix)) return;

       let command = message.content.split(" ")[0];
       command = command.slice(prefix.length);

       let args = message.content.split(" ").slice(1);

       if (command == "بان") {
                    if(!message.channel.guild) return message.reply('** This command only for servers**');

       if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**You Don't Have ` BAN_MEMBERS ` Permission**");
       if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
       let user = message.mentions.users.first();
       let reason = message.content.split(" ").slice(2).join(" ");
       /*let b5bzlog = client.channels.find("name", "5bz-log");
       if(!b5bzlog) return message.reply("I've detected that this server doesn't have a 5bz-log text channel.");*/
       if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
       if(!reason) return message.reply ("**اكتب سبب الطرد**");
       if (!message.guild.member(user)
       .bannable) return message.reply("**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**");

       message.guild.member(user).ban(7, user);

       const banembed = new Discord.RichEmbed()
       .setAuthor(`BANNED!`, user.displayAvatarURL)
       .setColor("RANDOM")
       .setTimestamp()
       .addField("**User:**",  '**[ ' + `${user.tag}` + ' ]**')
       .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
       .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
       message.channel.send({
         embed : banembed
       })
     }
     });




     client.on('message', message => {
         if(message.content.startsWith(prefix + 'all.move')) {
          if (!message.member.hasPermission("MOVE_MEMBERS")) return message.channel.send('**لايوجد لديك صلاحية سحب الأعضاء**');
            if(!message.guild.member(client.user).hasPermission("MOVE_MEMBERS")) return message.reply("**لايوجد لدي صلاحية السحب**");
         if (message.member.voiceChannel == null) return message.channel.send(`**الرجاء الدخول لروم صوتي**`)
          var author = message.member.voiceChannelID;
          var m = message.guild.members.filter(m=>m.voiceChannel)
          message.guild.members.filter(m=>m.voiceChannel).forEach(m => {
          m.setVoiceChannel(author)
          })
          message.channel.send(`**تم سحب جميع الأعضاء الي الروم الصوتي حقك.**`)


          }
            });

            client.on('message', message => {
              if(!message.channel.guild) return;
              if(message.content.startsWith(prefix + 'one.move')) {
               if (message.member.hasPermission("MOVE_MEMBERS")) {
               if (message.mentions.users.size === 0) {
               return message.channel.send("``لاستخدام الأمر اكتب هذه الأمر : " +prefix+ "move [USER]``")
              }
              if (message.member.voiceChannel != null) {
               if (message.mentions.members.first().voiceChannel != null) {
               var authorchannel = message.member.voiceChannelID;
               var usermentioned = message.mentions.members.first().id;
              var embed = new Discord.RichEmbed()
               .setTitle("Succes!")
               .setColor("#000000")
               .setDescription(`لقد قمت بسحب <@${usermentioned}> الى الروم الصوتي الخاص بك? `)
              var embed = new Discord.RichEmbed()
              .setTitle(`You are Moved in ${message.guild.name}`)
               .setColor("RANDOM")
              .setDescription(`**<@${message.author.id}> Moved You To His Channel!\nServer --> ${message.guild.name}**`)
               message.guild.members.get(usermentioned).setVoiceChannel(authorchannel).then(m => message.channel.send(embed))
              message.guild.members.get(usermentioned).send(embed)
              } else {
              message.channel.send("``لا تستطيع سحب "+ message.mentions.members.first() +" `يجب ان يكون هذه العضو في روم صوتي`")
              }
              } else {
               message.channel.send("**``يجب ان تكون في روم صوتي لكي تقوم بسحب العضو أليك``**")
              }
              } else {
              message.react("?")
               }}});



               client.on('message', async ReBeLL => {
              if(ReBeLL.author.bot) return;
              if (ReBeLL.channel.guild) {
              if (ReBeLL.content.startsWith(prefix + `8ball`)) {
                  let argsReBeL = ReBeLL.content.split(' ').slice(1).join(' ');
                  let authorReBeL = ReBeLL.author.username;

                  // https://en.wikipedia.org/wiki/Magic_8-Ball
                  let ReBeL = [
                      //إجآبآت إجآبيه
              "هذا مؤكد.",
                      "إنه بالتأكيد كذلك" ,
                      "بدون أدنى شك.",
                      "نعم بالتأكيد.",
                      "يمكنك الاعتماد عليه.",
                      "كما أرى أنه نعم.",
                      "على الأرجح.",
                      "توقعات جيدة.",
                      "نعم فعلا.",
                      "وتشير الدلائل إلى نعم.",

                      // إجابات غير ملتزمة
                      "الرد المحاولة مرة أخرى ضبابية.",
                      "اسأل مرة اخرى لاحقا.",
                      "الأفضل أن لا أقول لكم الآن.",
                      "لا يمكن التنبؤ الآن.",
                      "التركيز والمحاولة مرة أخرى." ,

                      // إجابات سلبية
                      "لا تعتمد على." ,
                      "ردي هو لا.",
                      "وتقول مصادري لا.",
                      "أوتلوك ليس جيد بما فيه الكفاية.",
                      "مشكوك فيه جدا."
                  ]
                  let randomReBeL = Math.floor(Math.random() * ReBeL.length);

                  if (!argsReBeL) return ReBeLL.reply("ask him something.");
                  ReBeLL.channel.send(`\:8ball\: | ${ReBeL[randomReBeL]} **${authorReBeL}**`);
              }}});



              client.on('message', message => {
                           if(!message.channel.guild) return;
                 if(message.content.startsWith(prefix + 'bc')) {
                 if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
               if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
                 let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
                 let copy = "Prince Bot™ Bot";
                 let request = `Requested By ${message.author.username}`;
                 if (!args) return message.reply('**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**');message.channel.send(`**هل أنت متأكد من إرسالك البرودكاست؟ \nمحتوى البرودكاست:** \` ${args}\``).then(msg => {
                 msg.react('✅')
                 .then(() => msg.react('❌'))
                 .then(() =>msg.react('✅'))

                 let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                 let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

                 let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
                 let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
              reaction1.on("collect", r => {
                 message.channel.send(`**☑ | Done ... The Broadcast Message Has Been Sent For __${message.guild.members.size}__ Members**`).then(m => m.delete(5000));
                 message.guild.members.forEach(m => {

               var bc = new
                    Discord.RichEmbed()
                    .setColor('RANDOM')
                    .setTitle('Broadcast')
                    .addField('سيرفر', message.guild.name)
                    .addField('المرسل', message.author.username)
                    .addField('الرسالة', args)
                    .setThumbnail(message.author.avatarURL)
                    .setFooter(copy, client.user.avatarURL);
                 m.send({ embed: bc })
                 msg.delete();
                 })
                 })
                 reaction2.on("collect", r => {
                 message.channel.send(`**Broadcast Canceled.**`).then(m => m.delete(5000));
                 msg.delete();
                 })
                 })
                 }
                 });


                 client.on('message', function(message) {
                     if(message.content.startsWith(prefix + "report")) {
                         let messageArgs = message.content.split(" ").slice(1).join(" ");
                         let messageReason = message.content.split(" ").slice(2).join(" ");
                         if(!messageReason) return message.reply("**# Specify a reason!**");
                     let mUser = message.mentions.users.first();
                     if(!mUser) return message.channel.send("Couldn't find user.");
                     let Rembed = new Discord.RichEmbed()
                     .setTitle("`New Report!`")
                     .setThumbnail(message.author.avatarURL)
                     .addField("**# - Reported User:**",mUser,true)
                     .addField("**# - Reported User ID:**",mUser.id,true)
                     .addField("**# - Reason:**",messageReason,true)
                     .addField("**# - Channel:**",message.channel,true)
                     .addField("**# - Time:**",message.createdAt,true)
                     .setFooter("لو ان الابلاغ فيه مزح راح يتعرض صاحب الابلاغ لقوبات")
                 message.channel.send(Rembed)
                 message.channel.send("__Are you sure you want to send this to the Server owner??__").then(msg => {
                     msg.react("✅")
                     msg.react("❌")
                 .then(() => msg.react('❌'))
                 .then(() =>msg.react('✅'))
                 let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                 let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

                 let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
                 let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
                 reaction1.on("collect", r => {
                     message.guild.owner.send(Rembed)
                     message.reply("**# - Done! 🎇**");
                 })
                 reaction2.on("collect", r => {
                     message.reply("**# - Canceled!**");
                 })
                 })
                 }
                 });







       client.on('message' , message => {
  var prefix = "$";
  if(message.author.bot) return;

  if(message.content.startsWith(prefix + "xo")) {
 let array_of_mentions = message.mentions.users.array();
  let symbols = [':o:', ':heavy_multiplication_x:']
  var grid_message;

  if (array_of_mentions.length == 1 || array_of_mentions.length == 2) {
    let random1 = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
    let random2 = Math.abs(random1 - 1);
    if (array_of_mentions.length == 1) {
      random1 = 0;
      random2 = 0;
    }
    var player1_id = message.author.id
    let player2_id = array_of_mentions[random2].id;
    var turn_id = player1_id;
    var symbol = symbols[0];
    let initial_message = `Game match between <@${player1_id}> and <@${player2_id}>!`;
    if (player1_id == player2_id) {
      initial_message += '\n_( ألعب مع نفسك)_'
    }
    message.channel.send(`Xo ${initial_message}`)
    .then(console.log("Successful tictactoe introduction"))
    .catch(console.error);
    message.channel.send(':one::two::three:' + '\n' +
                         ':four::five::six:' + '\n' +
                         ':seven::eight::nine:')
    .then((new_message) => {
      grid_message = new_message;
    })
    .then(console.log("Successful tictactoe game initialization"))
    .catch(console.error);
    message.channel.send('يجب الانتضار حيث ما يتم الموافقه')
    .then(async (new_message) => {
      await new_message.react('1⃣');
      await new_message.react('2⃣');
      await new_message.react('3⃣');
      await new_message.react('4⃣');
      await new_message.react('5⃣');
      await new_message.react('6⃣');
      await new_message.react('7⃣');
      await new_message.react('8⃣');
      await new_message.react('9⃣');
      await new_message.react('🆗');
      await new_message.edit(`It\'s <@${turn_id}>\'s turn! Your symbol is ${symbol}`)
      .then((new_new_message) => {
        require('./xo.js')(client, message, new_new_message, player1_id, player2_id, turn_id, symbol, symbols, grid_message);
      })
      .then(console.log("Successful tictactoe listener initialization"))
      .catch(console.error);
    })
    .then(console.log("Successful tictactoe react initialization"))
    .catch(console.error);
  }
  else {
    message.reply(`منشن مع من تريد ألعب`)
    .then(console.log("Successful error reply"))
    .catch(console.error);
  }
}
 });




client.on('message', message => {
         if (message.content === prefix + "td") {
         if (!message.channel.guild) return message.reply('** This command only for servers **');
         var currentTime = new Date(),
            hours = currentTime.getHours() + 4 ,
            hours2 = currentTime.getHours() + 3 ,
            hours3 = currentTime.getHours() + 2 ,
            hours4 = currentTime.getHours() + 3 ,
            minutes = currentTime.getMinutes(),
            seconds = currentTime.getSeconds(),
            Year = currentTime.getFullYear(),
            Month = currentTime.getMonth() + 1,
            Day = currentTime.getDate();
             var h = hours
  if(hours > 12) {
               hours -= 12;
            } else if(hours == 0) {
                hours = "12";
            }
             if(hours2 > 12) {
               hours2 -= 12;
            } else if(hours2 == 0) {
                hours2 = "12";

            }
                         if(hours3 > 12) {
               hours3 -= 12;
            } else if(hours3 == 0) {
                hours3 = "12";
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            var suffix = 'صباحاَ';
            if (hours >= 12) {
                suffix = 'مساء';
                hours = hours - 12;
            }
            if (hours == 0) {
                hours = 12;
            }


                var Date15= new Discord.RichEmbed()
                .setThumbnail("https://i.imgur.com/ib3n4Hq.png")
                .setTitle( "Time & Date.")
                .setColor('RANDOM')
                .setFooter(message.author.username, message.author.avatarURL)
                 .addField('- KSA. :flag_sa: ',
                ""+ hours2 + ":" + minutes +":"+ seconds  + "")
                .addField('- EGY. :flag_eg: ',
                ""+ hours3 + ":" + minutes +":"+ seconds  + "")

                .addField('- Date.',
                ""+ Day + "-" + Month + "-" + Year +  "")

                 message.channel.sendEmbed(Date15);
        }
    });


client.on('message', function(message) {
    if(!message.channel.guild) return;
    if(message.content === 'الالوان') {
    if(message.member.hasPermission('MANAGE_ROLES')) {
    setInterval(function(){})
    message.channel.send('Colors were created successfully | ▶️')
    }else{
    message.channel.send('ما معاك البرمشن المطلوب |❌🚫')
    }
    }
    });

    client.on('message', message=>{
    if (message.content === 'الالوان'){
    if(!message.channel.guild) return;
    if (message.member.hasPermission('MANAGE_ROLES')){
    setInterval(function(){})
    let count = 0;
    let ecount = 0;
    for(let x = 1; x < 200; x++){
    message.guild.createRole({name:x,
    color: 'RANDOM'})
    }
    }
    }
    });





    client.on('guildMemberAdd', (member) => {
    member.addRole(member.guild.roles.find('name', 'not active'));
    });


client.on('message', message => {
    if(!message.channel.guild) return;
       if(message.content.startsWith(prefix + 'active')) {
        let modlog = client.channels.find('name', 'الـــــــــشات_العام');
       if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
       message.channel.sendMessage(`اضغط على الصح عشان تتفعل`).then(msg => {


        msg.react('✅')
       .then(() => msg.react('✅'))



       let activeFilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;

       let active = msg.createReactionCollector(activeFilter, { time: 15000 });


                               active.on("collect", r => {
                                   message.member.addRole(message.guild.roles.find("name", "active"));
                                   message.member.removeRole(message.guild.roles.find("name", "not active"));
                                   msg.delete();
                                   message.channel.send(`**تم تفعيلك استمتع.**`).then(m => m.delete(1000));

                                   })
                                   })
                                   }
                                   });


//

    client.on('guildMemberAdd', (member) => {
    member.addRole(member.guild.roles.find('name', 'not active'));
    });


client.on('message', message => {
    if(!message.channel.guild) return;
       if(message.content.startsWith(prefix + 'active-Disco')) {
        let modlog = client.channels.find('name', 'الـــــــــشات_العام');
       if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
       message.channel.sendMessage(`اضغط على الصح عشان تتفعل`).then(msg => {


        msg.react('✅')
       .then(() => msg.react('✅'))



       let activeFilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;

       let active = msg.createReactionCollector(activeFilter, { time: 15000 });


                               active.on("collect", r => {
                                   message.member.addRole(message.guild.roles.find("name", "Disco"));
                                   message.member.removeRole(message.guild.roles.find("name", "not active"));
                                   msg.delete();
                                   message.channel.send(`**تم تفعيلك استمتع.**`).then(m => m.delete(1000));

                                   })
                                   })
                                   }
                                   });


//
      client.on('message', message => {
        if(message.content === "info") {
            const embed = new Discord.RichEmbed()
            .setColor("#00FFFF")
      .addField('**الذاكرة المستخدمة 💾**', `${(process.memoryUsage().rss / 1000000).toFixed()}MB`, true)
             .addField('**سرعة الاتصال📡**' , `${Date.now() - message.createdTimestamp}` + ' ms')
            .addField('**استخدام المعالج💿**', `${(process.cpuUsage().rss / 10000).toFixed()}%`, true)
            .addField('**:globe_with_meridians: عدد السيرفرات**' , `${client.guilds.size}`, true)
            .addField('**عدد المستخدمين 👥 **' , `${client.users.size}`, true)
                   message.channel.sendEmbed(embed);
               }
    });



          client.on('message', Sal => { // By Salto7#4595
            if(Sal.content === '#bot') { //هنا تغير البرفيكس
            var embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setThumbnail(client.user.avatarURL)
            .addField('Bot Prince Bot™ ', client.user.username, true)
            .setFooter(client.user.tag, client.user.avatarURL, true)
            .addField('Bot Tag', client.user.discriminator, true)
            .addField('Bot id', client.user.id, true)
            .addField('Create Bot At', client.user.createdAt, true)
            Sal.channel.sendEmbed(embed);
          }
          });




         client.on('message', message=>{
              if (message.content ==='#add-colors'){
                  if (message.channel.guild){
                      if (message.member.hasPermission('MANAGE_ROLES')){
                          setInterval(function(){})
                            let count = 0;
                            let ecount = 0;
                  for(let x = 0; x < 250; x++){
                      message.guild.createRole({name:x,
                      color: 'RANDOM'})
                }
                      }else{
                          message.channel.sendMessage(':warning: You do not have permission to write this command')
                      }
                  }else{
                      message.channel.sendMessage(':warning:  This command only in servers')
                  }
              }
              if (message.content === '#de-colors'){
                          if (message.channel.guild){
                      if (message.member.hasPermission('MANAGE_ROLES')){
                          setInterval(function(){})
                            let count = 0;
                            let ecount = 0;
                  for(let x = 0; x < 250; x++){
                      message.guild.roles.find('name', x)
                }
                      }else{
                          message.channel.sendMessage(':warning: You do not have permission to write this command')
                      }
                  }else{
                      message.channel.sendMessage(':warning:  This command only in servers')
                  }
              }

          })


client.on('message',async msg => {
  if(msg.content.startsWith(prefix + "user")) {
     time.overwritePermissions(msg.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
  setInterval(() => {
      var currentTime = new Date(),
Year = currentTime.getFullYear(),
Month = currentTime.getMonth() + 1,
Dat = currentTime.getDate()
  },1000);
  }

});


var cats = [

"https://cdn.discordapp.com/attachments/489544608028688426/489712329915760651/ghlsa.com_34.png",
"https://cdn.discordapp.com/attachments/489544608028688426/489713120353452042/111.png",
"https://cdn.discordapp.com/attachments/489544608028688426/489902467295739904/-.png",
"https://cdn.discordapp.com/attachments/489544608028688426/489902642256936960/JUUU.png",
"https://cdn.discordapp.com/attachments/489544608028688426/489902761534816257/a8e80c125617227f.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489903074471837709/TTTTT.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489903286208430082/TTREEE.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489903416345100299/NNNN.png",
"https://cdn.discordapp.com/attachments/489544608028688426/489903600483696640/000000.png",
"https://cdn.discordapp.com/attachments/489544608028688426/489903702455353373/YUUUUU00.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489903848488697857/MMMM.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489903884291014663/1460-2.png",
"https://cdn.discordapp.com/attachments/489544608028688426/489904255965331456/CCCC.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489904335359049728/e207af4d35971a13.png",
"https://cdn.discordapp.com/attachments/489544608028688426/489904614750158869/c8458dcb83ef3f51eb67871656460acda8008de1_hq.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489905138614534146/NNMM77.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489905421952483348/LLLLLL.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489906840570953749/iiiiiii.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489907070213292032/13768694832.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489907202597978144/---.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489907550406311938/fffff.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489907705713262593/c256f15f37cd98e1.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489907882892984378/oooo.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489908366567669781/PIC-724-1452961611-1.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489908505411715114/f34eb06b9893cd6ac476a7039be24dcd.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489908504396693518/IIIIIIPPPPPP.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489908753672568839/large.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489909095009091594/screen-16.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489909343354093569/elmstba.com_1457723619_669.png",
"https://cdn.discordapp.com/attachments/489544608028688426/489909376140967936/22.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489909523654639617/-.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489909552968630293/36666.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489909870104018956/5550446_normal.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489910030867628038/II.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489910181442879488/777777777777777777777777777777777777777.jpeg",
"https://cdn.discordapp.com/attachments/489544608028688426/489910380840222723/1235.png",
"https://cdn.discordapp.com/attachments/489544608028688426/489910540035031040/---.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489910402109669400/NNNNNNNNNNNNNNNNNNNNNNNNNN.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489910737884413952/687.jpg",
"https://cdn.discordapp.com/attachments/489544608028688426/489910934907912192/MMMMMMM.jpg"
]
    client.on('message', message => {
        var args = message.content.split(" ").slice(1);
        if(message.content.startsWith(prefix+ 'N')) {
         var cat = new Discord.RichEmbed()
.setImage(cats[Math.floor(Math.random() * cats.length)])
message.channel.sendEmbed(cat);
    }
});

  client.on('message', message => {
      if (message.content === "#id") {
      let embed = new Discord.RichEmbed()
     .setColor("RANDOM")
     .setThumbnail(message.author.avatarURL)
     .setTitle(`info about ${message.guild.name}`)
     .addField("Server Owner 👑",`➥ ` + `${message.guild.owner.user.username}`, true)
     .addField('Server ID 🆔',`➥` + message.guild.id, true)
     .addField("Owner Tag",`➥ ` +  `#` + message.guild.owner.user.discriminator, true)
     .addField("Owner ID 🆔",`➥ ` + message.guild.owner.user.id, true)
     .addField("Server Region📡",`➥ ` + message.guild.region, true)
     .addField("Server Member Size🏧",`➥ ` + message.guild.members.size, true)
     .addField("Server Channels Number🏧",`➥ ` + message.guild.channels.size, true)
     .addField("Server Roels Number🏧",`➥ ` + message.guild.roles.size, true)
     .addField("AFK channel💤",`➥ ` + message.guild.afkChannel || 'Null', true)
     .addField("Server Created AT",`➥ ` + message.guild.createdAt, true)
     .addField(`info about ${message.author.username}`, `➥ `)
     .addField("Name",`➥ ` + `${message.author.username}`, true)
     .addField('Tag',`➥ ` + "#" +  message.author.discriminator, true)
     .addField("ID 🆔",`➥ ` + message.author.id, true)
     .addField(" Account Created At",`➥ ` + message.author.createdAt, true)
     .setTimestamp()
     .setFooter(message.author.tag, message.author.avatarURL)


     message.channel.sendEmbed(embed);
       }
   });



   client.on('message', message => {
       var prefix = "#"
       if (message.content === prefix + "date") {
           var currentTime = new Date(),
               السنة = currentTime.getFullYear(),
               الشهر = currentTime.getMonth() + 1,
               اليوم = currentTime.getDate();
           message.channel.sendMessage( "التاريخ : " + اليوم + "-" + الشهر + "-" +السنة)
       }
   });


client.on('message', message => {
         if (message.content === prefix + "td") {
         if (!message.channel.guild) return message.reply('** This command only for servers **');
         var currentTime = new Date(),
            hours = currentTime.getHours() + 4 ,
            hours2 = currentTime.getHours() + 3 ,
            hours3 = currentTime.getHours() + 2 ,
            hours4 = currentTime.getHours() + 3 ,
            minutes = currentTime.getMinutes(),
            seconds = currentTime.getSeconds(),
            Year = currentTime.getFullYear(),
            Month = currentTime.getMonth() + 1,
            Day = currentTime.getDate();
             var h = hours
  if(hours > 12) {
               hours -= 12;
            } else if(hours == 0) {
                hours = "12";
            }
             if(hours2 > 12) {
               hours2 -= 12;
            } else if(hours2 == 0) {
                hours2 = "12";

            }
                         if(hours3 > 12) {
               hours3 -= 12;
            } else if(hours3 == 0) {
                hours3 = "12";
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            var suffix = 'صباحاَ';
            if (hours >= 12) {
                suffix = 'مساء';
                hours = hours - 12;
            }
            if (hours == 0) {
                hours = 12;
            }


                var Date15= new Discord.RichEmbed()
                .setThumbnail("https://i.imgur.com/ib3n4Hq.png")
                .setTitle( "『التاريخ  والوقت』")
                .setColor('RANDOM')
                .setFooter(message.author.username, message.author.avatarURL)
                .addField('الامارات',
                "『"+ hours + ":" + minutes +":"+ seconds + "』")
                 .addField('مكه المكرمه',
                "『"+ hours2 + ":" + minutes +":"+ seconds  + "』")
                .addField('مصر',
                "『"+ hours3 + ":" + minutes +":"+ seconds  + "』")

                .addField('Date',
                "『"+ Day + "-" + Month + "-" + Year +  "』")

                 message.channel.sendEmbed(Date15);
        }
    });

//


 
















//كود الوقت
     client.on('message',async msg => {
          if(msg.channel.type === "dm") return;
               var p = "#";
       if(msg.author.bot) return;
       if(msg.content.startsWith(p + "فويس-ساعه")) {
       if(!msg.guild.member(msg.author).hasPermissions('MANAGE_CHANNELS')) return msg.reply('❌ **لا تملك رتبه لذلك**');
       if(!msg.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS'])) return msg.reply('❌ **البوت لا يمتلك صلاحية**');
       var ggg= msg.guild.createChannel('SERVER STATS', 'category').then(kk => {
                var ccc =msg.guild.createChannel('SERVER STATS', 'voice').then(al => {
                     var aa =msg.guild.createChannel('SERVER STATS', 'voice').then(alp => {
                        var aaa =msg.guild.createChannel('SERVER STATS', 'voice').then(alph => {
            al.setParent(kk);
            alp.setParent(kk);
            alph.setParent(kk);

          al.overwritePermissions(msg.guild.id, {
           CONNECT: false,
           SPEAK: false
         });
          alp.overwritePermissions(msg.guild.id, {
           CONNECT: false,
           SPEAK: false
         });
          alph.overwritePermissions(msg.guild.id, {
           CONNECT: false,
           SPEAK: false
         });
       setInterval(() => {
           var currentTime = new Date(),
     hours = currentTime.getHours() + 0 ,
     minutes = currentTime.getMinutes(),
     Seconds = currentTime.getSeconds(),
     Year = currentTime.getFullYear(),
     Month = currentTime.getMonth() + 1,
     Dat = currentTime.getDate()
     if (minutes < 10) {
     minutes = "0" + minutes;
     }
     var suffix = "AM";
     if (hours >= 12) {
     suffix = "PM";
     hours = hours - 12;
     }
     if (hours == 0) {
     hours = 12;
     }
          al.setName(`Voice Online :[ ${msg.guild.members.filter(m => m.voiceChannel).size} ]`);
           alp.setName(`Time :[${hours} : ${minutes} : ${Seconds} ${suffix}]`);
             alph.setName(`[ Date : [${Year} - ${Month} - ${Dat} ]`);
      },1000);
                        })

                     })
                })
       })

       }

     });





client.on('ready', () => {
     client.user.setActivity("Team Marleey STORE",{type: 'WATCHING'})

});



client.on('message', message => {
var prefix = "$";
       if(message.content === prefix + "cl") {
                           if(!message.channel.guild) return message.reply('** This command only for servers**');

   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' **Chats locked**');
              message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false

              }).then(() => {
                  message.reply("**Chats locked:white_check_mark: **")
              });
                }
//FIRE BOT
    if(message.content === prefix + "op") {
                        if(!message.channel.guild) return message.reply('** This command only for servers**');

   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**Chats were opened**');
              message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: true

              }).then(() => {
                  message.reply("**Chats were opened:white_check_mark:**")
              });
    }

});




client.on('message', msg => {
 if (msg.content.startsWith('$send')) {
      let args = msg.content.split(' ').slice(1)
      if (!args[0]) return msg.reply(`**منشن الشخص اولا**`)
      if (!args[1]) return msg.reply(`**ما هي الرساله المطلوب ارسالها**`)
      let alpha = msg.mentions.members.first()
      if (!alpha) return msg.reply(`**يجب تحديد الشخص**`)
      let alphaEmbed = new Discord.RichEmbed()
      .setTitle(`**رسالة جديده لك من شخص ما**`)
      .setDescription(args.join(" "))

      client.users.get(`${alpha.id}`).send(alphaEmbed)
      msg.reply(`**تم ارسال الرساله**`)
    }
});


client.on('message', message => {
    var p = "$";
            if (message.content.startsWith(p + "cto")) {
                if(!message.channel.guild) return;
                if (!message.member.hasPermission("MANAGE_CHANNEL"))  return;
      var a= message.content.split(' ').slice(1).join("  ");
      if (!a) return message.reply("اكتب كلام لوضعه في التوبيك!")
      message.channel.setTopic(`${a}`)
      .then(newChannel => message.channel.send(`تم تغيير التوبيك لـ **${a}**`))
      .catch(console.error);
            }
        });




        var antispam = require("anti-spam");//npm i anti-spam

        antispam(client, {
          warnBuffer: 3, //الحد الأقصى المسموح به من الرسائل لإرسالها في الفاصل الزمني قبل الحصول على تحذير.
          maxBuffer: 5, // الحد الأقصى المسموح به من الرسائل لإرسالها في الفاصل الزمني قبل الحصول على ميوت.
          interval: 1000, // مقدار الوقت قبل حصول باند
          warningMessage: "stop spamming.", // رسالة تحذير اذا سوا سبام!
          roleMessage: "Muted!!", // الرسالة الي تجي اذا شخص اخذ ميوت
          roleName: "Muted", // اسم رتبة الميوت
          maxDuplicatesWarning: 7, // عدد الرسايل الي قبل التحذيرات
          maxDuplicatesBan: 10, // عدد الرسايل الي يقدر المستخدم يرسلها قبل الميوت
          time: 10, // عدد الوقت الي يجلس لين تسحب رتبة الميوت من الشخص الحسبة برمجية وليست كتابية
        });




client.on("message", (message) => {
    if(message.content.startsWith(prefix+"Gmail")) {////Mal Team
        message.channel.send(JSON.stringify({
            email: Math.random().toString(36).slice(4).trim()+"@gmail.com",
            password: Math.random().toString(36).slice(4).trim()
        }))
    }
})



client.on('message', msg => {
  if (msg.content === 'السلام عليكم') {
    msg.reply('وعليكم السلام ورحمه الله وبركاته');
  }
});


client.on('message', msg => {
  if (msg.content === 'باك') {
    msg.reply('ولكم منور يا عسل');
  }
});


client.on('message', msg => {
  if (msg.content === 'هلا') {
    msg.reply('اهلا بك منور يا عسل ');
  }
});


client.on('message', msg => {
  if (msg.content === 'برب') {
    msg.reply('تيت لاططول عالينا يا عسل');
  }
});























client.login(process.env.TOKEN);// لا تغير فيها شيء
