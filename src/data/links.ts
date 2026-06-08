export type SocialLink = {
  name: string;
  url: string;
  icon: string;
};

export const socialLinks: SocialLink[] = [
  { name: 'GitHub',    url: 'https://github.com/QwerTayu',      icon: 'github.svg'    },
  { name: 'X',         url: 'https://x.com/tayu99_qwert',       icon: 'x.png'         },
  { name: 'Instagram', url: 'https://instagram.com/_qwert0916', icon: 'instagram.svg' },
  { name: 'Zenn',      url: 'https://zenn.dev/tayu99_make',      icon: 'zenn.svg'      },
  { name: 'Qiita',     url: 'https://qiita.com/QwerTayu',       icon: 'qiita.png'     },
  { name: 'note',      url: 'https://note.com/tayu99_',         icon: 'note.svg'      },
];
