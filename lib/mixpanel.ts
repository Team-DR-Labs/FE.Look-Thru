import mixpanel, { Config } from 'mixpanel-browser';

const mixpanelEnabled = true;

const mixpanelConfig: Partial<Config> = {
  track_pageview: true,
  persistence: 'localStorage',
};

if (mixpanelEnabled) {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '', mixpanelConfig);
}

export const Mixpanel = {
  identify: (id: string) => {
    if (mixpanelEnabled) {
      mixpanel.identify(id);
    }
  },
  alias: (id: string) => {
    if (mixpanelEnabled) {
      mixpanel.alias(id);
    }
  },
  track: (name: string, props?: object) => {
    console.log("mixpanelEnabled", mixpanelEnabled);
    if (mixpanelEnabled) {
      console.log("track", name, props);
      mixpanel.track(name, props);
    }
  },
  people: {
    set: (props: object) => {
      if (mixpanelEnabled) {
        mixpanel.people.set(props);
      }
    },
  },
};
