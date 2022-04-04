const Discord = require('discord.js')

module.exports = async (client, interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId == "open-ticket") {
    if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)) {
      return interaction.reply({
        content: 'Você já possui um ticket aberto!',
        ephemeral: true
      });
    };

    interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
      parent: '960362479857307689',
      topic: interaction.user.id,
      permissionOverwrites: [{
          id: interaction.user.id,
          allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
        },
        {
          id: '960362619951263794',
          allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
        },
        {
          id: interaction.guild.roles.everyone,
          deny: ['VIEW_CHANNEL'],
        },
      ],
      type: 'text',
    }).then(async c => {
      interaction.reply({
        content: `Ticket criado!\n<#${c.id}>`,
        ephemeral: true
      });

      const embed = new Discord.MessageEmbed()
        .setColor('6d6ee8')
        .setDescription('Selecione uma categoria para seu ticket')
        .setTimestamp();

      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageSelectMenu()
          .setCustomId('category')
          .setPlaceholder('Selecione uma categoria para seu ticket')
          .addOptions([{
              label: 'Falar com o Financeiro',
              value: 'financeiro',
              emoji: '🪙',
            },
            {
              label: 'Falar com o Suporte',
              value: 'suporte',
              emoji: '🔧',
            },
            {
              label: 'Falar com a Coordenação',
              value: 'coordenação',
              emoji: '📔',
            },
          ]),
        );

      msg = await c.send({
        content: `<@!${interaction.user.id}>`,
        embeds: [embed],
        components: [row]
      });

      const collector = msg.createMessageComponentCollector({
        componentType: 'SELECT_MENU',
        time: 20000
      });

      collector.on('collect', i => {
        if (i.user.id === interaction.user.id) {
          if (msg.deletable) {
            msg.delete().then(async () => {
              const embed = new Discord.MessageEmbed()
                .setColor('6d6ee8')
                .setDescription(`<@!${interaction.user.id}> criou um ticket para falar com **${i.values[0]}**`)
                .setTimestamp();

              const row = new Discord.MessageActionRow()
                .addComponents(
                  new Discord.MessageButton()
                  .setCustomId('close-ticket')
                  .setLabel('Fechar ticket')
                  .setEmoji('899745362137477181')
                  .setStyle('DANGER'),
                );

              await c.send({
                embeds: [embed],
                components: [row]
              });
            });
          };
        };
      });

      collector.on('end', collected => {
        if (collected.size < 1) {
          c.send(`Você demorou muito para escolher a categoria...`).then(() => {
            setTimeout(() => {
              if (c.deletable) {
                c.delete();
              };
            }, 5000);
          });
        };
      });
    });
  };

  if (interaction.customId == "close-ticket") {
    const guild = client.guilds.cache.get(interaction.guildId);
    const chan = guild.channels.cache.get(interaction.channelId);

    const row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
        .setCustomId('confirm-close')
        .setLabel('Sim')
        .setStyle('DANGER'),
        new Discord.MessageButton()
        .setCustomId('no')
        .setLabel('Não')
        .setStyle('SECONDARY'),
      );

    const verif = await interaction.reply({
      content: 'Tem certeza que deseja fechar o ticket?',
      components: [row]
    });

    const collector = interaction.channel.createMessageComponentCollector({
      componentType: 'BUTTON',
      time: 10000
    });

    collector.on('collect', i => {
      if (i.customId == 'confirm-close') {
        interaction.editReply({
          content: `Ticket fechado por <@!${interaction.user.id}>`,
          components: []
        });

        chan.edit({
          name: `closed-${chan.name}`,
          topic: `closed-${chan.name}`,
          permissionOverwrites: [{
              id: client.users.cache.get(chan.topic),
              deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
            {
              id: '960362619951263794',
              allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
            {
              id: interaction.guild.roles.everyone,
              deny: ['VIEW_CHANNEL'],
            },
          ],
        }).then(async () => {
          const embed = new Discord.MessageEmbed()
            .setColor('6d6ee8')
            .setDescription('Deletar ticket?')
            .setTimestamp();

          const row = new Discord.MessageActionRow()
            .addComponents(
              new Discord.MessageButton()
              .setCustomId('delete-ticket')
              .setLabel('Deletar')
              .setEmoji('🗑️')
              .setStyle('DANGER'),
            );

          chan.send({
            embeds: [embed],
            components: [row]
          });
        });

        collector.stop();
      };
      if (i.customId == 'no') {
        interaction.editReply({
          content: 'Você cancelou o fechamento do ticket',
          components: []
        });
        collector.stop();
      };
    });

    collector.on('end', (i) => {
      if (i.size < 1) {
        interaction.editReply({
          content: 'Você demorou muito para confirmar',
          components: []
        });
      };
    });
  };
  if (interaction.customId == "delete-ticket") {
    const guild = client.guilds.cache.get(interaction.guildId);
    const ticketChannel = guild.channels.cache.get(interaction.channelId);

    interaction.reply({
      content: 'Deletando ticket...'
    });

    setTimeout(() => {
      ticketChannel.delete();
    }, 5000);
  };
}