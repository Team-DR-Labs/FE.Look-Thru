import mixpanel, { Config } from 'mixpanel-browser';

const MIXPANEL_TOKEN = "8af43fb57d0d8e964d35e102e928a5cc";
// 시발 이거 맞음?

const mixpanelConfig: Partial<Config> = {
  track_pageview: true,
  persistence: 'localStorage',
};

if (MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN, mixpanelConfig);
}

export const Mixpanel = {
  identify: (id: string) => {
    if (MIXPANEL_TOKEN) {
      console.log('Mixpanel identify:', id);
      mixpanel.identify(id);
    }
  },
  alias: (id: string) => {
    if (MIXPANEL_TOKEN) {
      console.log('Mixpanel alias:', id);
      mixpanel.alias(id);
    }
  },
  track: (name: string, props?: object) => {
    if (MIXPANEL_TOKEN) {
      console.log('Mixpanel track:', name, props);
      mixpanel.track(name, props);
    }
  },
  people: {
    set: (props: object) => {
      if (MIXPANEL_TOKEN) {
        console.log('Mixpanel people set:', props);
        mixpanel.people.set(props);
      }
    },
  },
};
